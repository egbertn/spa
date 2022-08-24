using SPA.Service.Models;
using SPA.Service.Helpers;
using StackExchange.Redis;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using System.Text.Json.Serialization;

namespace SPA.Service.Services
{
    /// <summary>
	/// deals with serialisation to either redis or memory cache using a key
	/// </summary>
	public class SerializerService 
	{
	
		private readonly IConnectionMultiplexer _cache;
		private int? _defaultDb;
		private readonly DistributedCacheConfig _config;
		private readonly ILogger<SerializerService> _logger;
		private static readonly Lazy<JsonSerializerOptions> Options = new Lazy<JsonSerializerOptions>(() => new JsonSerializerOptions(JsonSerializerDefaults.Web) 
			{ 
				DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull, 
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
			});
		public SerializerService(IConnectionMultiplexer cache,
			IOptions<DistributedCacheConfig> config,
			ILogger<SerializerService> logger)
		{
			_config = config == null ? new DistributedCacheConfig { DataTimeOut = 60 } : config.Value;
			_cache = cache ?? throw new ArgumentNullException(nameof(cache));
			_logger = logger ?? new NullLogger<SerializerService>();
		}
		private IDatabase GetDatabase()
		{
			return _cache.GetDatabase(_defaultDb ?? -1);
		}
		public void SetDefaultDatabase(int db)
		{
			_defaultDb = db;
		}
		public async Task<T> Derialize<T>(string key)
		{
			var data = await GetDatabase().StringGetAsync(key);
			_logger.LogInformation("trying cache with key {0}", key);
			if (data.IsNullOrEmpty)
			{
				_logger.LogInformation("key {0} was not cached", key);
				return default;
			}
			try
			{
				var result = JsonSerializer.Deserialize<T>(data, Options.Value);
				return result;
			}
			catch(Exception ex)
			{
				_logger.LogError("Deserialize failed: {0}", ex.Message);
				return default;
			}
		}
		public async Task<T> GetAndAppend<T>(string key, Func<bool> updateIf, Func<Task<object>> func, int? expireSeconds) where T :class
		{
			//after the key:timecreated=unixtimeinseconds
			//    key will make the data stale
			var data = await GetDatabase().StringGetAsync(key);

			bool stale = false;

			_logger.LogInformation("getting from cache key {0}", key);
			DeepCopyHelper.IsCollection(typeof(T), out Type inner);
			T old;
			if (!data.IsNullOrEmpty)
			{
				var created = JsonSerializer.Deserialize<CreatedKey<T>>(data, Options.Value);
				old = created.Data;
				stale = created.Stale;
			}
			else
			{
				old = Array.CreateInstance(inner, 0) as T;//empty arry
			}
			if (stale) // no appending anymore
			{
				return old;
			}
			var o = await func.Invoke();
			var isCollection = (o.GetType() == typeof(T) || DeepCopyHelper.IsCollectionGenericTypeEqual(o.GetType(), typeof(T)));
			// we can only compare if we have data
			if ( o != null && isCollection) // e.g. StatusCodeResult
			{
				//var listType = typeof(List<>).MakeGenericType(inner);
				var newList = (o as System.Collections.IList);
				var oldList = (old as System.Collections.IList);
				var newArray = Array.CreateInstance(inner, oldList.Count + newList.Count);
				//
				oldList.CopyTo(newArray, 0);
				newList.CopyTo(newArray, oldList.Count);
				//append and serialize
				var createdKey = new CreatedKey<T>
				{
					Created = DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
					Stale = updateIf.Invoke(),
					Data = newArray as T

				};
				await Serialize(key, createdKey, expireSeconds);
				return newArray as T;
			}
			//JUST return the data
			return old;
		}
		public async Task<T> GetAndSet<T>(string key, Func<Task<object>> func, int? expireSeconds)
		{
			var data = await GetDatabase().StringGetAsync(key);
			_logger.LogInformation("getting from cache key {0}", key);
			if (data.IsNullOrEmpty)
			{
				var o = await func.Invoke();
				if (o != null && (o.GetType() == typeof(T) || DeepCopyHelper.IsCollectionGenericTypeEqual(o.GetType(), typeof(T)))) // e.g. StatusCodeResult
				{
					await Serialize(key, o, expireSeconds);
					return (T)o;
				}
				return default;
			}

			var result = JsonSerializer.Deserialize<T>(data, Options.Value);
			return result;
		}
		public  Task Set(string key, object data, int? expireSeconds)
		{
			var ct = 0;
			if (data is System.Collections. IList dt)
				ct = dt.Count;
			if (data is Array ar)
				ct = ar.Length;
			_logger.LogInformation("setting cache key {0} count = ({1})", key, ct);
			if (data != null)
			{
				return Serialize(key, data, expireSeconds);
			}
			return Task.CompletedTask;
		}
		public async Task<T> Get<T>(string key)
		{
			var data = await GetDatabase().StringGetAsync(key);
			_logger.LogInformation("getting from cache key {0}", key);
			if (!data.IsNullOrEmpty)
			{
				var result = await JsonSerializer.DeserializeAsync<T>(new MemoryStream(data), Options.Value);
				return result;
			}
			return default;
		}
		public Task Remove(string key)
		{
			return GetDatabase().KeyDeleteAsync(key);
		}
		public async Task<int> AddIndexItemsToHashSet(string v, IEnumerable< (string index, long id)> p)
		{
			var arr = p.Select(s => new HashEntry(s.index, s.id)).ToArray();
			await GetDatabase().HashSetAsync(v, arr);
			return arr.Length;
		}
	public async Task Set(string setKey, IEnumerable<(string Text, long Id)> data, int? timeoutSeconds = default)
		{

			var db = GetDatabase();
			await db.KeyDeleteAsync(setKey);
			var hashEntries = data.Select(s => new HashEntry(s.Text, s.Id)).ToArray();
			await db.HashSetAsync(setKey, hashEntries, CommandFlags.FireAndForget);

			if (timeoutSeconds != default)
			{
				await db.KeyExpireAsync(setKey, TimeSpan.FromSeconds(timeoutSeconds.Value));
			}

		}		
		public async Task<T> FindById<T>(string setKey, string id) where T : class
		{
			if (string.IsNullOrEmpty(setKey))
			{
				throw new ArgumentNullException(nameof(setKey));
			}
			

			var data = await GetDatabase().HashGetAsync(setKey, id);
			if (!data.IsNullOrEmpty)
			{
				return JsonSerializer.Deserialize<T>((byte[])data, Options.Value);
			}
			return default;
		}
		public async Task<IEnumerable<T>> FindByKeyword<T>(string setKey, string keyword) where T : class
		{
			if (string.IsNullOrEmpty(setKey))
			{
				throw new ArgumentNullException(nameof(setKey));
			}
			if (string.IsNullOrEmpty(keyword))
			{
				throw new ArgumentNullException(nameof(keyword));
			}
		
			var db = GetDatabase();
			var keySize = await db.HashLengthAsync(setKey);
			var keys = db.HashScan(setKey, $"*{keyword.ToLowerInvariant()}*", (int) keySize, 0, 0);
			var elements = setKey.Split('/');
			elements[^1] = "index";
			var dataKey = string.Join('/', elements) ;
			var data = await db.HashGetAsync(dataKey, keys.Select(s => s.Value).ToArray());
			if (data.Length > 0)
			{
				return data.Select(s => JsonSerializer.Deserialize<T>((byte[])s, Options.Value)).ToArray();
			}
			return Array.Empty<T>();
		}
		public async Task AddIndexItemToHashSet(string v, (string index, long id) p)
		{
			var db = GetDatabase();
			
			await db.HashSetAsync(v, p.index, p.id);
		
		}
	

		/// <summary>
		/// caches the given data by key
		/// If Redis or Memory cache fails,
		/// it will ignore the exception and your
		/// operation will continue, without cache
		/// </summary>
		/// <param name="key"></param>
		/// <param name="data"></param>
		/// <param name="expireSeconds"></param>
		public async Task<bool> Serialize(string key, object data, int? expireSeconds = default)
		{
			_logger.LogInformation("setting data with cache key {0}", key);
			var bytes = JsonSerializer.SerializeToUtf8Bytes(data, Options.Value);
			try
			{
				await GetDatabase().StringSetAsync(key, bytes, expiry: TimeSpan.FromSeconds(expireSeconds ?? _config.DataTimeOut));
				return true;
			}
			catch (Exception ex)
			{
				_logger.LogError("Serialize failed: {0}", ex.Message);
				return false;
			}
		}

		public async Task KeepAlive(string key, int? newExpireSeconds = default)
		{
			await GetDatabase().KeyExpireAsync(key, TimeSpan.FromSeconds(newExpireSeconds ?? _config.DataTimeOut));
		}
	}
}