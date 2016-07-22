using System;
using System.Collections.Generic;
using System.Linq;
using CigarBar.Api.Data.Models;
using CigarBar.Api.Mappers;
using CigarBar.Api.Models.Dto;

namespace CigarBar.Api.Data
{
    public interface ICigarsRepository
    {
        IEnumerable<CigarDto> Find(string search);
        void Create(CigarDto dto, ApplicationUser user);
    }

    public class CigarsRepository: ICigarsRepository
    {
        private readonly IContextFactory _contextFactory;
        private readonly CigarMapper _cigarMapper = new CigarMapper();

        public CigarsRepository(IContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public IEnumerable<CigarDto> Find(string search)
        {
            var searchWords = search.ToUpper().Trim().Split(new [] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

            using (var context = _contextFactory.Create())
            {
                return context.Cigars
                    .Where(c => c.Approved &&
                        (searchWords.Any(s => c.Brand.ToUpper().Contains(s))
                        || searchWords.Any(s => c.Name.ToUpper().Contains(s))))
                    .ToList()
                    .Select(c => _cigarMapper.Map(c));
            }
        }

        public void Create(CigarDto dto, ApplicationUser user)
        {
            if (user == null)
            {
                throw new Exception("User must be specified.");
            }
            if (dto == null)
            {
                throw new Exception("Cigar must be specified.");
            }

            using (var context = _contextFactory.Create())
            {
                var entity = _cigarMapper.Map(dto, user);
                entity.CreatedAt = DateTime.Now;
                entity.Approved = false;

                context.Cigars.Add(entity);

                context.SaveChanges();
            }
        }
    }
}
