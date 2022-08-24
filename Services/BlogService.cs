using System.Collections.Generic;
using System;
using System.Linq;
using System.IO;
using SPA.Service.Models;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace SPA.Service.Services
{
    public class BlogService 
    {
        private const string fakedata  = @"";
        private readonly ILogger<BlogService> _logger;
        private readonly SerializerService _serializer;
        public BlogService(ILogger<BlogService>  logger, SerializerService serializer)
        {
            _serializer = serializer;
            _logger = logger;
        }
        public async Task<IEnumerable<Comment>> Comments(int postId)
        {
            var data = await TestData();
            return data.Comments.Where(w => w.PostId == postId);
        }
        public async Task<IEnumerable<BlogItem>> Procedures()
        {
 			//await base.RemoveHashSet($"blog:/{blog.Name}/{fullName}/index");

           var data = await TestData();

            return data.Procedures;
        
        }
        public async Task<IEnumerable<Testimonial>> Testimonials()
        {
            var data = await TestData();
            return data.Testimonials;
        }
        public async Task<BlogItem> Procedure(int id)
        {
           var data = await TestData();

            return data.Procedures.FirstOrDefault(f => f.Id == id);
        
        }
        private async Task<SampleData> TestData()
        {
             var dataFile =  Path.Combine( AppDomain.CurrentDomain.BaseDirectory, "sample-data.json");
            _logger.LogInformation("reading {0}", dataFile);
            using var fileData =File.OpenRead(dataFile);
            var data = await JsonSerializer.DeserializeAsync<SampleData>(fileData, new JsonSerializerOptions(JsonSerializerDefaults.Web));
            int id = 0;
            foreach(var d in data.Posts) {d.Id = id++;}
            id = 0;
            foreach(var d in data.Procedures) {d.Id = id++;}
            return data;
        }
        public async Task<bool> CopyFromQueue(string queueName)
        {
            _serializer.SetDefaultDatabase(0);
            //var keys= _serializer.
            return true;
        }
        public async Task<IEnumerable<BlogItem>> Posts(int page)
        {
           var data = await TestData();
            _logger.LogInformation("Nodes in json found {0}", data.Posts.Count());
            return data.Posts;
        }
         public async Task<BlogItem> Post(int id)
        {
           var data = await TestData();
           var post = data.Posts.FirstOrDefault(i => i.Id == id);
           post.Comments = data.Comments.Where(w => w.PostId == id);
            
            return post;
        }
        
       
    }
    
}