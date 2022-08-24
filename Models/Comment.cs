namespace SPA.Service.Models
{

    public class Comment 
    {
        public int Id {get;set;}
        public string Message{get; set;}
        public int PostId {get;set;}
        public string Username {get;set;}
    }
}