using Jello.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Jello.Controllers
{
    public class HomeController : Controller
    {
        private MongoClient DbClient;
        private IMongoDatabase Database;
        private readonly UserManager<JelloUser> _userManager;

        public HomeController(UserManager<JelloUser> userManager)
        {
            _userManager = userManager;
            if (DbClient == null)
            {
                DbClient = new MongoClient("mongodb://localhost:27017/");
                Database = DbClient.GetDatabase("jello");
            }
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        [HttpGet]
        public async Task<ActionResult> GetUserBoards()
        {
            try
            {
                return Ok(await _userManager.GetUserAsync(HttpContext.User));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPost]
        public async Task<ActionResult> AddUserBoard([FromBody]JelloBoard requestData)
        {
            try
            {
                var user = await _userManager.GetUserAsync(HttpContext.User);
                requestData.Creator = user.UserName;
                user.UserCreatedBoards.Add(requestData.Id);
                await _userManager.UpdateAsync(user);

                var collection = Database.GetCollection<JelloBoard>("boards");
                await collection.InsertOneAsync(requestData);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddUserToSharedBoard([FromBody]JelloBoard requestData)
        {
            try
            {
                var collection = Database.GetCollection<JelloBoard>("boards");
                var filter = Builders<JelloBoard>.Filter.Eq("Name", requestData.Name);
                var board = await collection.Find(filter).FirstAsync();
                foreach(var user in requestData.SharedUsers)
                {
                    board.SharedUsers
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}
