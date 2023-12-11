namespace Minyada;

using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using SPA.Service.Models;
using SPA.Service.Services;
using StackExchange.Redis;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

            var services = builder.Services;
        builder.Host.UseConsoleLifetime();
        var configuration = builder.Configuration;


        var webOptions = configuration.GetSection("WebOptions").Get<WebOptions>();
        services.AddSingleton(webOptions);

        services.AddScoped<SerializerService>();
        services.AddScoped<BlogService>();
        services.AddScoped<MailService>();
        services.AddControllers();
        ConfigureRedisCache(services, configuration);

        var app = builder.Build();
        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseStaticFiles();

        app.UseRouting();
        app.MapControllers();

        app.MapFallbackToFile("index.html");

        app.Run();

    }

    private static void ConfigureRedisCache(IServiceCollection services, IConfiguration configuration)
    {

        var distributedCacheConfig = configuration.GetSection("RedisOptions").Get<DistributedCacheConfig>() ?? new DistributedCacheConfig();
        services.AddSingleton(distributedCacheConfig);
        services.AddSingleton<IConnectionMultiplexer>((e) =>
        {
            return ConnectionMultiplexer.Connect(configuration.GetConnectionString("redis"));
        });

    }
}