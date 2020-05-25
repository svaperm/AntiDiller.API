using System.Threading.Tasks;
using AntiDealerApi.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AntiDealerApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticService _statisticService;

        public StatisticsController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStatistics()
        {
            var statistics = await _statisticService.GetStatistics();
            return new OkObjectResult(statistics);
        }
    }
}