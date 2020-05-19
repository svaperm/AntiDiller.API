using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace AntiDealerApi.Extensions
{
    public static class HttpContextExtensions
    {
        public static string GetUserEmail(this HttpContext httpContext)
        {
            if (httpContext.User == null)
                return string.Empty;

            return httpContext.User.Claims.Single(x => x.Type == ClaimTypes.Email).Value;
        }
    }
}