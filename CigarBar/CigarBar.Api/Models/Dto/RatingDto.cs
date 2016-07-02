using System;

namespace CigarBar.Api.Models.Dto
{
    public class RatingDto
    {
        public int Value { get; set; }
        public string Details { get; set; }
        public DateTime LastModifiedAt { get; set; }

        public CigarDto Cigar { get; set; }
    }
}
