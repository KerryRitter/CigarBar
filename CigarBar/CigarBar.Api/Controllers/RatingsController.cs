using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CigarBar.Api.Data;
using CigarBar.Api.Services;
using Microsoft.AspNetCore.Authorization;
using CigarBar.Api.Models.Dto;

namespace CigarBar.Api.Controllers
{
    [Route("api/me/ratings")]
    [Authorize]
    public class RatingsController : Controller
    {
        private readonly IRatingsRepository _ratingsRepository;
        private readonly IUserService _userService;

        public RatingsController(IRatingsRepository ratingsRepository, IUserService userService)
        {
            _ratingsRepository = ratingsRepository;
            _userService = userService;
        }

        [HttpGet]
        public IEnumerable<RatingDto> Get()
        {
            var currentUser = _userService.GetApplicationUser();
            return _ratingsRepository.FindAll(currentUser);
        }

        [HttpPost]
        public RatingDto Post([FromBody]RatingDto dto)
        {
            var currentUser = _userService.GetApplicationUser();
            return _ratingsRepository.Create(dto, currentUser);
        }

        [HttpPut("{id}")]
        public RatingDto Put(int id, [FromBody]RatingDto dto)
        {
            var currentUser = _userService.GetApplicationUser();
            return _ratingsRepository.Update(id, dto, currentUser);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var currentUser = _userService.GetApplicationUser();
            _ratingsRepository.Delete(id, currentUser);
        }
    }
}
