using System.Collections.Generic;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;
using AntiDealerApi.Resources;

namespace AntiDealerApi.Domain.Repositories
{
    public interface IReportRepository
    {
        Task<Report> GetReport(int id);
        Task AddReport(Report report, ReportPhoto photo);
        Task<List<Report>> GetUserReports(User user);
        Task<ReportStatus> GetReportStatus(int id);
        Task<List<StatisticResource>> GetStatistics();
    }
}