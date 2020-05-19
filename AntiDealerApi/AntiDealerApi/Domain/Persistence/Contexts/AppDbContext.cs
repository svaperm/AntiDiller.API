using AntiDealerApi.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AntiDealerApi.Domain.Persistence.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<ReportPhoto> ReportPhotos { get; set; }
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}