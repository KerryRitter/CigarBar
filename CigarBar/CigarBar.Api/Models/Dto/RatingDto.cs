using System;

namespace CigarBar.Api.Models.Dto
{
    public class RatingDto
    {
        public int Id { get; set; }
        public int Value { get; set; }
        public string Details { get; set; }
        public DateTime LastModifiedAt { get; set; }

        public CigarDto Cigar { get; set; }
    }
}
