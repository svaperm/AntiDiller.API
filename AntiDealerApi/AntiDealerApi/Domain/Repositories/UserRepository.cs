using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;
using AntiDealerApi.Domain.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace AntiDealerApi.Domain.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<User> GetUser(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(user => user.Email == email);
        }

        public async Task<User> AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}