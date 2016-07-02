using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Collections.Generic;

namespace CigarBar.Api.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<Cigar> CigarsCreated { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
