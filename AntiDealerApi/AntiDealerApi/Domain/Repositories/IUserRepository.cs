using System.Collections.Generic;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;

namespace AntiDealerApi.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUser(string email);
        Task<User> AddUser(User user);
        Task UpdateUserRefreshToken(string email, string refreshToken);
        Task SaveChanges();
    }
}