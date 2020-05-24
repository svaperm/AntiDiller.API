namespace AntiDealerApi.Resources
{
    public class ReportResource
    {
        public string ReportType { get; set; }
        public string ReportStatus { get; set; }
        public string Description { get; set; }
        public string ReportPhoto { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}