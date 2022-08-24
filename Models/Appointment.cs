using System;
using System.ComponentModel.DataAnnotations;
namespace SPA.Service.Models
{
	public class Appointment
	{
        private const int SECONDS = 30;
        public Appointment()
		{
			Lf = System.DateTimeOffset.UtcNow.ToFileTime();
			h = $"{Lf}/{SECONDS}".GetHashCode();
		}
		[Required]
		public long Lf { get; set; }
		public int h { get; set; }
        public bool IsValid
        {
            get
            {
                if (Lf == 0)
                {
                    return false;
                }
                var ts = System.DateTimeOffset.UtcNow - System.DateTimeOffset.FromFileTime(Lf);
                if (ts < TimeSpan.FromSeconds(SECONDS))
                {
                    return false;
                }
                int hash = $"{Lf}/{SECONDS}".GetHashCode();
                if (h != hash)
                {
                    return false;
                }
                return true;
            }


        }
        [Required, MaxLength(70)]
        public string Name { get; set; }
        [Required, MaxLength(12)]
		public string Phone { get; set; }
        [MaxLength(250)]
		public string Remarks { get; set; }
        [MaxLength(20), Required]
		public string Service { get; set; }
        [Required]
		public string Date { get; set; }

		public string Email { get; set; }

	}
}
