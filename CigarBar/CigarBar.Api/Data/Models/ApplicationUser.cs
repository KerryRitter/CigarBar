using OpenIddict;
using System.Collections.Generic;

namespace CigarBar.Api.Data.Models
{
    public class ApplicationUser : OpenIddictUser
    {
        public List<Cigar> CigarsCreated { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
