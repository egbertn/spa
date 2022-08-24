using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
//using Serilog;
using StackExchange.Redis;

using SPA.Service.Models;
using SPA.Service.Services;
namespace Minyada
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var webOptions = new WebOptions();
			Configuration.GetSection("WebOptions").Bind(webOptions);
			services.AddCors(options =>
			{
				options.AddDefaultPolicy(
								  builder =>
								  {
									  builder.WithOrigins(
												
												"http://localhost:5000",
												"http://localhost:3000",
												"http://localhost:44335",
												"http://localhost",
												"https://localhost").
												AllowAnyHeader().
												AllowAnyMethod().
												AllowCredentials();
								  });
			});
			services.AddOptions();
			services.AddSingleton(webOptions);
            services.AddScoped<SerializerService>();
            services.AddScoped<BlogService>();
			services.AddScoped<MailService>();
            services.AddControllers();

            services.AddSingleton<IConnectionMultiplexer>((e) =>
			{				
				return ConnectionMultiplexer.Connect(Configuration.GetConnectionString("redis"));
			});

			var logPath = Configuration.GetValue<string>("Logging:UseFileLogging");
			if (!string.IsNullOrEmpty(logPath))
			{
				// var serilogLogger = new LoggerConfiguration()
				//  .WriteTo.File($"{logPath}/{this.GetType().Assembly.GetName().Name}.log")
				//  .CreateLogger();
				// services.AddLogging(builder =>
				// {
				// 	builder.SetMinimumLevel(LogLevel.Information);
				// 	builder.AddSerilog(logger: serilogLogger, dispose: true);
				// });
			}

			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});
            ConfigureRedisCache(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
			app.UseSpaStaticFiles(new StaticFileOptions {
				OnPrepareResponse = ctx =>
				{
					ctx.Context.Response.Headers.Add(
						 "Cache-Control", $"private, max-age={TimeSpan.FromMinutes(5).TotalSeconds}");
				}
			});
            app.UseRouting();
			app.UseCors();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //app.UseRootRewrite();
			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});
        }

		private void ConfigureRedisCache(IServiceCollection services)
		{
			var distributedCacheConfig = new DistributedCacheConfig();
			Configuration.GetSection("RedisOptions").Bind(distributedCacheConfig);
			if (distributedCacheConfig.UseInMemory)
			{
				services.AddDistributedMemoryCache();
				return;
			}

			services.AddStackExchangeRedisCache(opt => {

				var password = distributedCacheConfig.Password;
				if (password == "nil" || password == "")
				{
					password = null;
				}
				if (string.IsNullOrEmpty(password) && distributedCacheConfig.Ssl)
				{
					throw new Exception("Missing distributedcache password in configuration.");
				}
				var options = new ConfigurationOptions
				{
					Ssl = distributedCacheConfig.Ssl,
					ConnectRetry = distributedCacheConfig.ConnectRetry,
					SslProtocols = System.Security.Authentication.SslProtocols.None,
					ConnectTimeout = distributedCacheConfig.ConnectTimeout,
					DefaultDatabase = distributedCacheConfig.DefaultDatabase,
					Password = password,
					AbortOnConnectFail = true,
					EndPoints ={ {distributedCacheConfig.Endpoint, distributedCacheConfig.EndpointPort} }
				};

				opt.ConfigurationOptions = options;
			});
		}
    }
}
