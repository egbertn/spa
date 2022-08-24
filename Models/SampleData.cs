using System.Collections.Generic;

namespace SPA.Service.Models
{
    public class SampleData 
    {
        public IEnumerable<BlogItem> Posts {get;set;}
        public IEnumerable<Comment> Comments {get;set;}
        public IEnumerable<BlogItem> Procedures {get;set;}
        public IEnumerable<Testimonial> Testimonials {get;set;}
    }
}