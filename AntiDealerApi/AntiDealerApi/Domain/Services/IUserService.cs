using System.Security.Claims;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;
using AntiDealerApi.Resources;

namespace AntiDealerApi.Domain.Services
{
    public interface IUserService
    {
        Task<AuthResource> Authenticate(string email, string password);
        Task<AuthResource> Register(string email, string password);
        Task<User> GetUser(string email);
        Task<bool> EditCurrentUser(string currentEmail, string email, string password);
        Task UpdateRefreshToken(string email, string refreshToken);
    }
}