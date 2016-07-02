using CigarBar.Api.Data.Models;
using Dto = CigarBar.Api.Models.Dto.CigarDto;

namespace CigarBar.Api.Mappers
{
    public class CigarMapper
    {
        public Dto Map(Cigar cigar)
        {
            return new Dto
            {
                Id = cigar.Id,
                Name = cigar.Name,
                Brand = cigar.Brand
            };
        }

        public Cigar Map(Dto cigar, ApplicationUser currentUser = null)
        {
            return new Cigar
            {
                Id = cigar.Id,
                Name = cigar.Name,
                Brand = cigar.Brand,
                CreatedBy = currentUser,
                CreatedById = currentUser?.Id
            };
        }
    }
}
