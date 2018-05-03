using Jello.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace Jello.Controllers
{
    using Microsoft.AspNetCore.Identity.MongoDB;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost]
        public async Task<ActionResult> Register([FromBody]User requestData)
        {
            var user = new IdentityUser()
            {
                Email = requestData.Email,
                UserName = requestData.Username
            };
            try
            {
                var result = await _userManager.CreateAsync(user, requestData.Password);

                if (result.Succeeded)
                {
                    return Ok();
                }

                var error = ((List<IdentityError>)result.Errors)[0];
                    
                return BadRequest(error.Description);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromBody]User requestData)
        {
            var user = new IdentityUser()
            {
                Email = requestData.Email
            };
            
            try
            {
                await _userManager.UpdateSecurityStampAsync(user);
                var result = await _signInManager.PasswordSignInAsync(user, requestData.Password, false, true);

                if (result.IsNotAllowed)
                {
                    return Unauthorized();
                }
                else if (result.IsLockedOut)
                {
                    return StatusCode(423);
                }
                else if (!result.Succeeded)
                {
                    return Unauthorized();
                }
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}