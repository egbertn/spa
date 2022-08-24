using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SPA.Service.Models
{
    public class Meta 
    {
        public IEnumerable<string> Categories {get;set;}
        [JsonConverter(typeof(SPA.Service.Helpers.DateTimeConverterUsingDateTimeParse))]
        public DateTimeOffset Created {get;set;}
        public IEnumerable<string> Tags {get;set;}
    }
}