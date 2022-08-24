using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CommandLine;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Minyada
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }
		private interface IOptions
		{
			[Option(longName: "certificate", shortName: 'c',
			   HelpText = "Input certificate to be used for ssl. Use full path",
			   Required = false)]
			string Certificate { get; set; }

			[Option(longName: "password", shortName: 'p',
			   HelpText = "certificate password",
			   Required = false)]
			string Password { get; set; }
			[Option(longName: "httponport", shortName: 'h',
				Required = false, HelpText = "Specifies port to listen on for http (normally port 80)")]
			int? HttpPort { get; set; }
			[Option(longName: "sslonport", shortName: 's',
				Required = false, HelpText = "Specifies port to listen on for SSL")]
			int? SslOnPort { get; set; }

		}
		private class CertificateOptions : IOptions
		{
			public string Certificate { get; set; }
			public string Password { get; set; }
			public int? SslOnPort { get; set; }
			public int? HttpPort { get; set; }

		}
		public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)

                .ConfigureWebHostDefaults(webBuilder =>
                {

                    webBuilder.UseStartup<Startup>();
                }).ConfigureWebHost(host =>
				{
					host.ConfigureKestrel(options =>
					{
						var result = Parser.Default.ParseArguments<CertificateOptions>(args);
						options.AddServerHeader = false;
						string cbos_cert = null;
						var defaultSsslPort = 44336;
						var defaultHttpPort = 44335;
						string cbos_pass = null;

						result.WithParsed(a => cbos_cert = a.Certificate);
						if (string.IsNullOrEmpty(cbos_pass))
						{
							result.WithParsed(a => cbos_pass = a.Password);
						}
						result.WithParsed(a => defaultHttpPort = a.HttpPort ?? defaultHttpPort);
						result.WithParsed(a => defaultSsslPort = a.SslOnPort ?? defaultSsslPort);
						try
						{
							options.ListenAnyIP(defaultSsslPort, listenOptions =>
							{
								listenOptions.UseHttps(cbos_cert, cbos_pass);
							});
						}
						catch (Exception ex)
						{
							Serilog.Log.Logger.Error($"Cannot open {cbos_cert} {ex.Message}");
						}
						options.ListenAnyIP(defaultHttpPort); //http
					});
				}).UseConsoleLifetime();
    }
}
