using System.Text.Json.Serialization;

namespace AntiDealerApi.Domain.Models
{
    public class Report
    {
        public int Id { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public string Description { get; set; }
        public ReportPhoto ReportPhoto { get; set; }
        public string Status { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}