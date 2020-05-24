using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;
using AntiDealerApi.Domain.Repositories;
using AntiDealerApi.Domain.Services;
using AntiDealerApi.Resources;
using RestSharp;
using Newtonsoft.Json.Linq;

namespace AntiDealerApi.Services
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _reportRepository;

        public ReportService(IReportRepository repository)
        {
            _reportRepository = repository;
        }

        public async Task<ReportResource> GetReport(int id)
        {
            Report report = await _reportRepository.GetReport(id);
            ReportResource reportResource = new ReportResource
            {
                Description = report.Description,
                ReportStatus = report.ReportStatus.Name,
                ReportPhoto = Convert.ToBase64String(report.ReportPhoto.Photo),
                ReportType = report.ReportType,
                Latitude = report.Latitude,
                Longitude = report.Longitude
            };
            return reportResource;
        }

        public async Task<Report> AddReport(ReportResource report, User user)
        {
            var status = await _reportRepository.GetReportStatus(1); // 1 - в обработке
            byte[] photo = Convert.FromBase64String(report.ReportPhoto);
            ReportPhoto newReportPhoto = new ReportPhoto
            {
                Photo = photo
            };
            Report newReport = new Report
            {
                Description = report.Description,
                Latitude = report.Latitude,
                Longitude = report.Longitude,
                RegionName = await GetLocationRegion(report.Latitude, report.Longitude),
                User = user,
                ReportStatus = status
            };

            await _reportRepository.AddReport(newReport, newReportPhoto);
            return newReport;
        }

        public async Task<List<Report>> GetUserReports(User user)
        {
            var reports = await _reportRepository.GetUserReports(user);
            return reports;
        }

        public async Task<string> GetLocationRegion(double latitude, double longitude)
        {
            var client = new RestClient("https://nominatim.openstreetmap.org/reverse");
            var response =
                await client.ExecuteAsync(new RestRequest($"?lat={latitude}&lon={longitude}&format=json&zoom=5",
                    DataFormat.Json));
            JObject jObject = JObject.Parse(response.Content);
            var region = jObject["address"]["state"];
            return region.ToString();
        }
    }
}