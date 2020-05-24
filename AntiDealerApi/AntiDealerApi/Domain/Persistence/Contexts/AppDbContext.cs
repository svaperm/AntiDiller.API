using AntiDealerApi.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AntiDealerApi.Domain.Persistence.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<ReportStatus> ReportStatuses { get; set; }
        public DbSet<ReportPhoto> ReportPhotos { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReportStatus>().HasData(
                new ReportStatus {Id = 1, Name = "В обработке"},
                new ReportStatus {Id = 2, Name = "Выполнено"},
                new ReportStatus {Id = 3, Name = "Отказано"});
        }
    }
}