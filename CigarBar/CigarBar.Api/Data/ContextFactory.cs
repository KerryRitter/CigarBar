using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CigarBar.Api.Data
{
    public interface IContextFactory
    {
        ApplicationDbContext Create();
    }

    public class ContextFactory : IContextFactory
    {
        private readonly IConfigurationRoot _config;

        public ContextFactory(IConfigurationRoot config)
        {
            _config = config;
        }

        public ApplicationDbContext Create()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            var cxn = _config["Data:DefaultConnection"];
            optionsBuilder.UseSqlServer(cxn);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
