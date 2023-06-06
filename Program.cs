namespace Minyada;

using System;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using System.Linq;
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
        services.AddCors(c => c.AddDefaultPolicy(c => c.AllowAnyOrigin()));
        services.AddScoped<BlogService>();
        services.AddScoped<MailService>();
        services.AddControllers();
        ConfigureRedisCache(services, configuration);

        var useUrls = configuration.GetValue("ASPNETCORE_URLS", $"{Uri.UriSchemeHttp}://0.0.0.0:80")!;
        var pem = configuration.GetValue<string>("HTTPS_CERTIFICATE_PEM");
        var pk = configuration.GetValue<string>("HTTPS_CERTIFICATE_PK");
        IReadOnlyCollection<Uri> urisGiven = useUrls.Split(';').Select(s => new Uri(s)).ToArray();
        if (File.Exists(pem))
        {
            using var certificate = X509Certificate2.CreateFromPemFile(pem, pk);
            builder.WebHost.ConfigureKestrel(kestrelOptions =>
            {
                //find ssl
                var splittedUrls = urisGiven.Where(s => s.Scheme == Uri.UriSchemeHttps) ?? throw new InvalidOperationException($"If certificate arn is given, a https uri must be configured {useUrls}");
                if (certificate != null)
                {
                    foreach (var uri in splittedUrls)
                    {
                        kestrelOptions.ListenAnyIP(uri.Port, opt =>
                        {
                            opt.Protocols = HttpProtocols.Http1AndHttp2;
                        });
                    }
                }

                splittedUrls = urisGiven.Where(f => f.Scheme == Uri.UriSchemeHttp);

                if (splittedUrls != null)
                {
                    foreach (var uri in splittedUrls)
                    {
                        kestrelOptions.ListenAnyIP(uri.Port);
                    }

                }
            });

        }
        else
        {
            Console.WriteLine($"No PEM found");
            builder.WebHost.UseUrls(urisGiven.Where(w => w.Scheme == Uri.UriSchemeHttp).Select(s => s.AbsoluteUri).ToArray());
        }
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
        app.UseCors();
        app.MapControllers();

        app.MapFallbackToFile("index.html");

        app.Run();

    }

    private static void ConfigureRedisCache(IServiceCollection services, IConfiguration configuration)
    {

        var distributedCacheConfig = configuration.GetSection("RedisOptions").Get<DistributedCacheConfig>();
        services.AddSingleton(distributedCacheConfig);
        services.AddSingleton<IConnectionMultiplexer>((e) =>
        {
            return ConnectionMultiplexer.Connect(configuration.GetConnectionString("redis"));
        });

    }
}