using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CigarBar.Api.Data;
using CigarBar.Api.Services;
using Microsoft.AspNetCore.Authorization;
using CigarBar.Api.Models.Dto;
using System.Net.Http;

namespace CigarBar.Api.Controllers
{
    [Route("api/cigars")]
    [Authorize]
    public class CigarsController : Controller
    {
        private readonly ICigarsRepository _cigarsRepository;
        private readonly IUserService _userService;

        public CigarsController(ICigarsRepository cigarsRepository, IUserService userService)
        {
            _cigarsRepository = cigarsRepository;
            _userService = userService;
        }

        [HttpGet]
        public IEnumerable<CigarDto> Get(string search)
        {
            if (string.IsNullOrWhiteSpace(search))
            {
                throw new HttpRequestException("Search term is required");
            }

            return _cigarsRepository.Find(search);
        }

        [HttpPost]
        public CigarDto Post([FromBody]CigarDto dto)
        {
            var currentUser = _userService.GetApplicationUser();
            
            return _cigarsRepository.Create(dto, currentUser);
        }
    }
}
