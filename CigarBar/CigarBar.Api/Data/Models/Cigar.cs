using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CigarBar.Api.Data.Models
{
    public class Cigar
    {
        [Key]
        public int Id { get; set; }

        public string Brand { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedById { get; set; }

        public bool Approved { get; set; }

        [ForeignKey(nameof(CreatedById))]
        public ApplicationUser CreatedBy { get; set; }
    }
}
