using System;
using System.ComponentModel.DataAnnotations;

namespace CigarBar.Api.Data.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }

        public int Value { get; set; }
        public string Details { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public int CigarId { get; set; }
        public string CreatedById { get; set; }

        public Cigar Cigar { get; set; }
        public ApplicationUser CreatedBy { get; set; }
    }
}