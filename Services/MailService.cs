using SPA.Service.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace SPA.Service.Services
{
    public class MailService 
	{
		private readonly WebOptions _options;
        private readonly ILogger<MailService> _logger;
		public MailService(WebOptions options, ILogger<MailService> logger)
		{
			_options = options ?? throw new ArgumentNullException(nameof(options));
            _logger = logger;
			ValidateOptions();
		}

		private void ValidateOptions()
		{
			if (string.IsNullOrEmpty(_options.MailTo))
			{
				throw new InvalidOperationException("WebOptions:MailTo not specified");
			}
			if (string.IsNullOrEmpty(_options.SmtpPassword))
			{
				throw new InvalidOperationException($"{nameof(_options.SmtpPassword)} must be specified");
			}
			if (string.IsNullOrEmpty(_options.SmtpUser))
			{
				throw new InvalidOperationException($"{nameof(_options.SmtpUser)} must be specified");
			}
			if (string.IsNullOrEmpty(_options.SmtpServer))
			{
				throw new InvalidOperationException($"{nameof(_options.SmtpServer)} must be specified");
			}
			if (_options.SmtpPort == 0)
			{
				throw new InvalidOperationException($"{nameof(_options.SmtpPort)} must be specified");
			}
			

		}
		public Task SendMail(string from, string subj,string body)
		{
            if (body == null
                || subj == null
            
                || body.Contains("<a")
            
                || subj.Contains("<a"))
            {
                _logger.LogError("illegal content in post");
                return Task.CompletedTask;
            }
			var msg = new MimeMessage
			{
				Subject = subj,
				Body = new TextPart(MimeKit.Text.TextFormat.Plain)
				{
					Text = body
				}
			};
			msg.From.Add(MailboxAddress.Parse(from));
			msg.To.Add(MailboxAddress.Parse(_options.MailTo));
			return SentMsg(msg);
		}
		private async Task SentMsg(MimeMessage msg)
		{
			using var smtp = new SmtpClient
			{
				CheckCertificateRevocation = false //firewall isues at dubai
			};
            _logger.LogInformation("Entering SentMsg");
            try 
            {
                await smtp.ConnectAsync(_options.SmtpServer, _options.SmtpPort, SecureSocketOptions.Auto);
                await smtp.AuthenticateAsync(_options.SmtpUser, _options.SmtpPassword);
                await smtp.SendAsync(msg);
                await smtp.DisconnectAsync(true);
            }
            catch (Exception ex){
                _logger.LogError("Cannot mail because of {0}", ex);
            }
		}
		
	}
}