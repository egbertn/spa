using System.ComponentModel.DataAnnotations;
using System;
using SPA.Service.Helpers;

namespace SPA.Service.Models
{
    public class Contact
    {
        private const int SECONDS = 30;
        public Contact()
        {
            Lf = System.DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            h = $"{Lf}/{SECONDS}".GetStableHashCode();
        }
        [Required]
        public long Lf { get; set; }
        [Required]
        public int h { get; set; }
        public bool IsValid
        {
            get
            {
                if (Lf == 0)
                {
                    return false;
                }
                var ts = System.DateTimeOffset.UtcNow - System.DateTimeOffset.FromUnixTimeMilliseconds(Lf);
                if (ts < TimeSpan.FromSeconds(SECONDS))
                {
                    return false;
                }
                int hash = $"{Lf}/{SECONDS}".GetStableHashCode();
                if (h != hash)
                {
                    return false;
                }
                return true;
            }
        }

        /// <summary>
        /// The user name.
        /// </summary>
        [Required, MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(12)]
        public string Phone { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }


        [Required, MaxLength(100)]
        public string Subject { get; set; }

        [Required, MaxLength(250)]
        public string Body { get; set; }
    }
}