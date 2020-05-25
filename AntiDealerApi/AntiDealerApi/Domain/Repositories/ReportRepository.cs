using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;
using AntiDealerApi.Domain.Persistence.Contexts;
using AntiDealerApi.Resources;
using Microsoft.EntityFrameworkCore;

namespace AntiDealerApi.Domain.Repositories
{
    public class ReportRepository : BaseRepository, IReportRepository
    {
        public ReportRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Report> GetReport(int id)
        {
            Report report = await _context.Reports.Include(r => r.ReportPhoto).Include(r=>r.ReportStatus).SingleAsync(x => x.Id == id);
            return report;
        }

        public async Task AddReport(Report report, ReportPhoto photo)
        {
            await _context.ReportPhotos.AddAsync(photo);
            report.ReportPhoto = photo;
            await _context.Reports.AddAsync(report);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Report>> GetUserReports(User user)
        {
            List<Report> userReports = await _context.Reports.Include(x => x.ReportStatus)
                .Where(rep => rep.User == user).ToListAsync();
            return userReports;
        }

        public async Task<ReportStatus> GetReportStatus(int id)
        {
            var status = await _context.ReportStatuses.SingleAsync(x => x.Id == id);
            return status;
        }

        public async Task<List<StatisticResource>> GetStatistics()
        {
            List<StatisticResource> statistics = await _context.Reports.GroupBy(x => x.RegionName).Select(x=> new StatisticResource
            {
                RegionName = x.Key,
                ReportCount = x.Count()
            }).ToListAsync();

            return statistics.OrderByDescending(x=>x.ReportCount).ToList();
        }
    }
}