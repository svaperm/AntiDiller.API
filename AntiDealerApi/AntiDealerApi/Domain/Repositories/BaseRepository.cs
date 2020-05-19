using AntiDealerApi.Domain.Persistence.Contexts;

namespace AntiDealerApi.Domain.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly AppDbContext _context;

        public BaseRepository(AppDbContext context)
        {
            _context = context;
        }
    }
}