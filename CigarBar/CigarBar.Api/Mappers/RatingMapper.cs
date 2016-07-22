using CigarBar.Api.Data.Models;
using System;
using Dto = CigarBar.Api.Models.Dto.RatingDto;

namespace CigarBar.Api.Mappers
{
    public class RatingMapper
    {
        private readonly CigarMapper _cigarMapper = new CigarMapper();

        public Dto Map(Rating rating)
        {
            return new Dto
            {
                Value = rating.Value,
                Details = rating.Details,
                Cigar = _cigarMapper.Map(rating.Cigar),
                LastModifiedAt = rating.LastModifiedAt
            };
        }

        public Rating Map(Dto dto, Cigar cigar, ApplicationUser currentUser)
        {
            return new Rating
            {
                Value = dto.Value,
                Details = dto.Details,
                LastModifiedAt = dto.LastModifiedAt,
                CigarId = dto.Cigar.Id,
                CreatedById = currentUser.Id
            };
        }
    }
}
