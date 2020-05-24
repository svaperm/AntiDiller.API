using Newtonsoft.Json;

namespace AntiDealerApi.Domain.Models
{
    public class Report
    {
        public int Id { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        public ReportStatus ReportStatus { get; set; }
        public string Description { get; set; }
        public string ReportType { get; set; }
        public ReportPhoto ReportPhoto { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string RegionName { get; set; }
    }
}