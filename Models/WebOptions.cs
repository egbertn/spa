namespace SPA.Service.Models
{
    public class WebOptions
	{
		public string PortalApiUrl { get; set; }
		public string BeaconId { get; set; }
		public string PortalUser { get; set; }
		public string PortalPassword { get; set; }

		public string MailTo { get; set; }
		public string From { get; init; } = null;

		public int SmtpPort { get; set; } = 587;
		public string SmtpServer { get; set; }
		public string SmtpPassword { get; set; }
		public string SmtpUser { get; set; }
	}
}