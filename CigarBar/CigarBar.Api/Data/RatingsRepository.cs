using System;
using System.Collections.Generic;
using System.Linq;
using CigarBar.Api.Data.Models;
using CigarBar.Api.Mappers;
using CigarBar.Api.Models.Dto;
using Microsoft.EntityFrameworkCore;

namespace CigarBar.Api.Data
{
    public interface IRatingsRepository
    {
        IEnumerable<RatingDto> FindAll(ApplicationUser user);
        RatingDto Create(RatingDto dto, ApplicationUser user);
        RatingDto Update(int id, RatingDto dto, ApplicationUser user);
        void Delete(int id, ApplicationUser user);
    }

    public class RatingsRepository : IRatingsRepository
    {
        private readonly IContextFactory _contextFactory;
        private readonly RatingMapper _ratingMapper = new RatingMapper();

        public RatingsRepository(IContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public IEnumerable<RatingDto> FindAll(ApplicationUser user)
        {
            using (var context = _contextFactory.Create())
            {
                return context.Ratings
                        .Include(r => r.Cigar)
                        .Where(r => r.CreatedById == user.Id)
                        .ToList()
                        .Select(r => _ratingMapper.Map(r));
            }
        }

        public RatingDto Find(ApplicationUser user, int id)
        {
            using (var context = _contextFactory.Create())
            {
                var entity = context.Ratings
                        .Include(r => r.Cigar)
                        .FirstOrDefault(r => r.CreatedById == user.Id);

                return _ratingMapper.Map(entity);
            }
        }

        public RatingDto Create(RatingDto dto, ApplicationUser user)
        {
            using (var context = _contextFactory.Create())
            {
                var cigar = context.Cigars.First(c => c.Id == dto.Cigar.Id);

                var entity = _ratingMapper.Map(dto, cigar, user);
                entity.LastModifiedAt = DateTime.Now;

                var entry = context.Ratings.Add(entity);

                context.SaveChanges();

                return Find(user, entry.Entity.Id);
            }
        }

        public RatingDto Update(int id, RatingDto dto, ApplicationUser user)
        {
            using (var context = _contextFactory.Create())
            {
                var cigar = context.Cigars.First(c => c.Id == dto.Cigar.Id);

                var rating = context.Ratings.First(r => r.Id == id && r.CreatedById == user.Id);

                rating.Details = dto.Details;
                rating.Value = dto.Value;
                rating.CigarId = dto.Cigar.Id;
                rating.LastModifiedAt = DateTime.Now;
                rating.CreatedById = user.Id;

                context.SaveChanges();

                return Find(user, id);
            }
        }

        public void Delete(int id, ApplicationUser user)
        {
            using (var context = _contextFactory.Create())
            {
                var rating = context.Ratings.First(r => r.Id == id && r.CreatedById == user.Id);
                context.Ratings.Remove(rating);
            }
        }
    }
}
