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
            if (DbClient == null)
            {
                DbClient = new MongoClient("mongodb://localhost:27017/");
                Database = DbClient.GetDatabase("jello");
            }
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
                await collection.InsertOneAsync(firstBoard);

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
    }
}