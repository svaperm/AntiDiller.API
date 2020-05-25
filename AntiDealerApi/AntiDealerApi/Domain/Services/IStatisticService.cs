using System.Collections.Generic;
using System.Threading.Tasks;
using AntiDealerApi.Resources;

namespace AntiDealerApi.Domain.Services
{
    public interface IStatisticService
    {
        Task<List<StatisticResource>> GetStatistics();
    }
}