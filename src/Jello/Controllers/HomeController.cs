using Jello.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Jello.Controllers
{
    using Microsoft.AspNetCore.Identity.MongoDB;
    using System;

    public class HomeController : Controller
    {
        private MongoClient DbClient;
        private IMongoDatabase Database;
        private readonly UserManager<IdentityUser> _userManager;

        public HomeController(UserManager<IdentityUser> userManager)
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
            var collection = Database.GetCollection<JelloBoard>("boards");
            var user = await _userManager.GetUserAsync(HttpContext.User);
            var filter = Builders<JelloBoard>.Filter.Eq("_id", user.UserName);
            var boards = await collection.Find(filter).FirstAsync();

            return Ok(boards);
        }

        [HttpPost]
        public async Task<ActionResult> AddUserToSharedBoard([FromBody]string requestData)
        {

        }

        [HttpPost]
        public async Task<ActionResult> AddUserBoard([FromBody] JelloUser requestData)
        {
            try
            {
                var collection = Database.GetCollection<JelloUser>("boards");
                var user = await _userManager.GetUserAsync(HttpContext.User);

                var filter = Builders<JelloUser>.Filter.Eq("_id", user.UserName);
                var boards = await collection.Find(filter).FirstAsync();
                if (boards == null)
                {
                    requestData.Email = user.UserName;
                    await collection.InsertOneAsync(requestData);
                } 
                else
                {
                    if (requestData.SharedBoards != null)
                    {
                        foreach (var boardName in requestData.SharedBoards)
                        {
                            boards.SharedBoards.Add(boardName);
                        }
                    }
                    if (requestData.UserCreatedBoards != null)
                    {
                        foreach (var boardName in requestData.UserCreatedBoards)
                        {
                            boards.UserCreatedBoards.Add(boardName);
                        }
                    }
                    await collection.FindOneAndReplaceAsync(filter, boards);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
