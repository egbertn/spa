namespace SPA.Service.Models.MessageStore
{
    public class BlogMessage
	{
		///<summary>
		/// Message may contain html tags
		///</summary>
		public string Message { get; set; }
		public string Title { get; set; }
		public System.DateTimeOffset Created { get; set; }
		///<summary>
		/// base64 inline
		///</summary>
		public string ImageUrl { get; set; }
		public string ThumbUrl { get; set; }
		public uint MessageId {get;set;}

	}
}