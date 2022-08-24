using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SPA.Service.Helpers
{
    public class DateTimeConverterUsingDateTimeParse : JsonConverter<DateTimeOffset>
    {
        public override DateTimeOffset Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
           // Debug.Assert(typeToConvert == typeof(DateTimeOffset));
           var s = reader.GetString();
           if (DateTimeOffset.TryParseExact(s, "dd MMM, yyyy", System.Globalization.DateTimeFormatInfo.InvariantInfo, System.Globalization.DateTimeStyles.None, out DateTimeOffset dt))
           {
               return dt;
           }
            return DateTimeOffset.Parse(s, System.Globalization.DateTimeFormatInfo.InvariantInfo);
        }

        public override void Write(Utf8JsonWriter writer, DateTimeOffset value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}