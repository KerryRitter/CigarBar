using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [ForeignKey(nameof(CigarId))]
        public Cigar Cigar { get; set; }

        [ForeignKey(nameof(CreatedById))]
        public ApplicationUser CreatedBy { get; set; }
    }
}