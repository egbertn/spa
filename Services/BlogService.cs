namespace SPA.Service.Services;

using SPA.Service.Models;
using System.Text.Json;

public class BlogService
{
    private const string fakedata = @"";
    private readonly ILogger<BlogService> _logger;
    private readonly SerializerService _serializer;
    private readonly string _path;

    public BlogService(ILogger<BlogService> logger, SerializerService serializer, IWebHostEnvironment env)
    {
        _serializer = serializer;
        _path = env.ContentRootPath;
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
        var dataFile = Path.Combine(_path, "sample-data.json");
        _logger.LogInformation("reading {0}", dataFile);
        using var fileData = File.OpenRead(dataFile);
        var data = await JsonSerializer.DeserializeAsync<SampleData>(fileData, new JsonSerializerOptions(JsonSerializerDefaults.Web));
        int id = 0;
        foreach (var d in data.Posts) { d.Id = id++; }
        id = 0;
        foreach (var d in data.Procedures) { d.Id = id++; }
        return data;
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

