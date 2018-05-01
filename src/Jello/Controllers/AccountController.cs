using Jello.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Linq;

namespace Jello.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        [HttpPost]
        public ActionResult Register(User requestData)
        {
            var user = new ApplicationUser()
            {
                Id = requestData.Email,
                UserName = requestData.Username
            };
            var result = _userManager.CreateAsync(user, requestData.Password);

            return result.Result.Succeeded ? Ok() : StatusCode(409);
        }

        [HttpPost]
        public ActionResult Login([FromBody]User requestData)
        {
            var filter = Builders<User>.Filter.Eq("Email", requestData.Email);
            var results = UsersCollection.Find(filter).FirstOrDefault();

            if (results == null || requestData.Password != results.Password)
            {
                return Unauthorized();
            }
            return Ok();
        }
    }
}