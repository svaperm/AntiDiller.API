using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;

namespace AntiDealerApi.Domain.Services
{
    public interface IUserService
    {
        Task<string> Authenticate(string email, string password);
        Task<string> Register(string email, string password);
        Task<User> GetCurrentUser(string email);
        Task<bool> EditCurrentUser(string currentEmail, string email, string password);
        string GenerateJwtToken(string email);
    }
}