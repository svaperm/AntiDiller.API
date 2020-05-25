using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Services;
using AntiDealerApi.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AntiDealerApi.Extensions;
using Microsoft.IdentityModel.Tokens;

namespace AntiDealerApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private readonly ITokenService _tokenService;

        public UsersController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginResource loginResource)
        {
            AuthResource authTokens = await _userService.Authenticate(loginResource.Email, loginResource.Password);
            if (authTokens == null)
                return new BadRequestObjectResult("Email или пароль неверны.");

            return new OkObjectResult(authTokens);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginResource loginResource)
        {
            AuthResource authTokens = await _userService.Register(loginResource.Email, loginResource.Password);
            if (authTokens == null)
                return new BadRequestObjectResult("Пользователь с таким Email уже зарегистрирован.");

            return new OkObjectResult(authTokens);
        }

        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            var email = HttpContext.GetUserEmail();
            var user = await _userService.GetUser(email);

            return new OkObjectResult(user);
        }

        [HttpPost]
        public async Task<IActionResult> EditCurrentUser([FromBody] LoginResource loginResource)
        {
            var currentEmail = HttpContext.GetUserEmail();
            bool error = await _userService.EditCurrentUser(currentEmail, loginResource.Email, loginResource.Password);
            if (error)
            {
                return new BadRequestObjectResult("Пользователь с таким Email уже зарегистрирован.");
            }

            // re-auth user
            string email =  !String.IsNullOrEmpty(loginResource.Email) ? loginResource.Email : currentEmail;
            string token = _tokenService.GenerateJwtToken(email);

            return new OkObjectResult(token);
        }

        [AllowAnonymous]
        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] AuthResource authResource)
        {
            var principal = _tokenService.GetPrincipalFromExpiredToken(authResource.Token);
            var email = principal.Claims.Single(x => x.Type == ClaimTypes.Email).Value;
            var user = await _userService.GetUser(email);
            var savedRefreshToken = user.RefreshToken;
            if (savedRefreshToken != authResource.RefreshToken)
                throw new SecurityTokenException("Invalid refresh token");

            var newJwtToken = _tokenService.GenerateJwtToken(email);
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            await _userService.UpdateRefreshToken(email, newRefreshToken);

            return new OkObjectResult(new
            {
                token = newJwtToken,
                refreshToken = newRefreshToken
            });
        }
    }
}