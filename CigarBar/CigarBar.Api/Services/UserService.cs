using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Claims;
using CigarBar.Api.Data;
using CigarBar.Api.Data.Models;

namespace CigarBar.Api.Services
{
    public interface IUserService
    {
        ClaimsPrincipal GetUserPrincipal();
        ApplicationUser GetApplicationUser();
    }

    public class UserService : IUserService
    {
        private IHttpContextAccessor _httpContextAccessor;
        private IContextFactory _contextFactory;

        public UserService(IHttpContextAccessor httpContextAccessor, IContextFactory contextFactory)
        {
            _httpContextAccessor = httpContextAccessor;
            _contextFactory = contextFactory;
        }

        public ClaimsPrincipal GetUserPrincipal()
        {
            return _httpContextAccessor.HttpContext.User;
        }

        public ApplicationUser GetApplicationUser()
        {
            var user = GetUserPrincipal();

            using (var context = _contextFactory.Create())
            {
                return context.Users.FirstOrDefault(u => u.UserName == user.Identity.Name);
            }
        }
    }
}
