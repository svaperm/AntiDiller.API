using System.Security.Claims;

namespace AntiDealerApi.Domain.Services
{
    public interface ITokenService
    {
        string GenerateJwtToken(string email);
        string GenerateRefreshToken();
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}