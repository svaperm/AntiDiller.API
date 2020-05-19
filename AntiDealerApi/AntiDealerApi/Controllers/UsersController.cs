using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Services;
using AntiDealerApi.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AntiDealerApi.Extensions;

namespace AntiDealerApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginResource loginResource)
        {
            string token = await _userService.Authenticate(loginResource.Email, loginResource.Password);
            if (token == null)
                return new BadRequestObjectResult("Email или пароль неверны.");

            return new OkObjectResult(token);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginResource loginResource)
        {
            string token = await _userService.Register(loginResource.Email, loginResource.Password);
            if (token == null)
                return new BadRequestObjectResult("Пользователь с таким Email уже зарегистрирован.");

            return new OkObjectResult(token);
        }

        [HttpGet]
        public IActionResult GetUserInfo()
        {
            var lol = HttpContext.GetUserEmail();
            
            return new OkObjectResult(lol);
        }
    }
}