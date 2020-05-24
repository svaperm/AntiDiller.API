using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;
using AntiDealerApi.Domain.Services;
using AntiDealerApi.Extensions;
using AntiDealerApi.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AntiDealerApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;
        private readonly IUserService _userService;

        public ReportsController(IReportService reportService, IUserService userService)
        {
            _reportService = reportService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetReport(int id)
        {
            var report = await _reportService.GetReport(id);
            return new OkObjectResult(report);
        }

        [HttpPost]
        public async Task<IActionResult> AddReport([FromBody] ReportResource reportResource)
        {
            var currentEmail = HttpContext.GetUserEmail();
            User user = await _userService.GetUser(currentEmail);
            return new OkObjectResult(await _reportService.AddReport(reportResource, user));
        }

        [HttpGet("getReports")]
        public async Task<IActionResult> GetUserReports()
        {
            var currentEmail = HttpContext.GetUserEmail();
            User user = await _userService.GetUser(currentEmail);
            var userReports = await _reportService.GetUserReports(user);

            return new OkObjectResult(userReports);
        }
    }
}