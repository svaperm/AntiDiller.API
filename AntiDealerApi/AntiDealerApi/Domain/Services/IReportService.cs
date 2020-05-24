using System.Collections.Generic;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;
using AntiDealerApi.Resources;

namespace AntiDealerApi.Domain.Services
{
    public interface IReportService
    {
        Task<ReportResource> GetReport(int id);
        Task<Report> AddReport(ReportResource report, User user);
        Task<List<Report>> GetUserReports(User user);
        Task<string> GetLocationRegion(double latitude, double longitude);
    }
}