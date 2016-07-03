using CigarBar.Api.Data.Models;
using Microsoft.EntityFrameworkCore;
using OpenIddict;

namespace CigarBar.Api.Data
{
    public class ApplicationDbContext : OpenIddictDbContext<ApplicationUser>
    {
        public DbSet<Cigar> Cigars { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
