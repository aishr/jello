using Jello.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace Jello.Controllers
{
    using Microsoft.AspNetCore.Identity.MongoDB;
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost]
        public ActionResult Register([FromBody]User requestData)
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
            var user = new ApplicationUser()
            {
                Id = requestData.Email,
            };
            var result = _signInManager.CanSignInAsync(user);

            return result.Result ? Ok() : StatusCode(401);
        }
    }
}