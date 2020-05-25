using System.Collections.Generic;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Repositories;
using AntiDealerApi.Domain.Services;
using AntiDealerApi.Resources;

namespace AntiDealerApi.Services
{
    public class StatisticService : IStatisticService
    {
        private readonly IReportRepository _reportRepository;

        public StatisticService(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }
        public async Task<List<StatisticResource>> GetStatistics()
        {
            var statistics = await _reportRepository.GetStatistics();
            
            return statistics;
        }
    }
}