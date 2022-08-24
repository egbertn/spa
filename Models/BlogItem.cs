using System.Collections.Generic;
namespace SPA.Service.Models 
{
    public class BlogItem
    {
        public long Id {get;set;}
        public string Body {get;set;}
        public string Excerpt {get;set;}
        public Meta Meta {get;set;}
        public IEnumerable<Comment> Comments {get;set;}
    }
}