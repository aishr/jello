using Jello.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jello.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<JelloUser> _userManager;
        private readonly SignInManager<JelloUser> _signInManager;
        private MongoClient DbClient;
        private IMongoDatabase Database;

        public AccountController(UserManager<JelloUser> userManager, SignInManager<JelloUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            if (DbClient != null) return;
            DbClient = new MongoClient("mongodb://localhost:27017/");
            Database = DbClient.GetDatabase("jello");
        }
        [HttpPost]
        public async Task<ActionResult> Register([FromBody]UserData requestData)
        {
            var firstBoard = new JelloBoard()
            {
                Creator = requestData.Email,
                Name = "StarterBoard"
            };
            var user = new JelloUser()
            {
                UserName = requestData.Email,
                Email = requestData.Email,
            };
            user.UserBoards.Add(firstBoard.ToBoardData());
            try
            {
                var collection = Database.GetCollection<JelloBoard>("boards");
                var result = await _userManager.CreateAsync(user, requestData.Password);

                if (result.Succeeded)
                {
                    await collection.InsertOneAsync(firstBoard);
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
        public async Task<ActionResult> Login([FromBody]UserData requestData)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(requestData.Email, requestData.Password, requestData.IsPersistent, true);

                if (result.IsNotAllowed || !result.Succeeded)
                {
                    return Unauthorized();
                }
                else if (result.IsLockedOut)
                {
                    return StatusCode(423);
                }
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetCurrentUser()
        {
            var result = await _userManager.GetUserAsync(HttpContext.User);
            if (result != null)
            {
                return Ok();
            }
            return Unauthorized();
        }

        [HttpGet]
        public async Task<ActionResult> GetAccentColour()
        {
            var result = await _userManager.GetUserAsync(HttpContext.User);
            if (result.HasCustomColours)
            {
                return Ok(new ColourData()
                {
                    AccentColour = result.AccentColour,
                    TextColour = result.TextColour
                });
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> SetCustomColours([FromBody]ColourData requestData)
        {
            var result = await _userManager.GetUserAsync(HttpContext.User);
            result.AccentColour = requestData.AccentColour;
            result.TextColour = requestData.TextColour;
            result.HasCustomColours = true;
            await _userManager.UpdateAsync(result);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> ChangePassword([FromBody]PasswordData requestData)
        {
            var result = await _userManager.GetUserAsync(HttpContext.User);
            
            if (requestData.NewPassword != requestData.ConfirmPassword)
            {
                return BadRequest();
            }
            IdentityResult passwordResult = await _userManager.ChangePasswordAsync(result, requestData.OldPassword, requestData.NewPassword);
            if (passwordResult.Succeeded)
            {
                return Ok();
            }

            return StatusCode(500, passwordResult);
        }

        [HttpPost]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }
    }
}