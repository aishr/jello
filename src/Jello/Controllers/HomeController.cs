using Jello.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Jello.Controllers
{
    public class HomeController : Controller
    {
        private readonly MongoClient _dbClient;
        private readonly IMongoCollection<JelloBoard> _collection;
        private readonly UserManager<JelloUser> _userManager;

        public HomeController(UserManager<JelloUser> userManager)
        {
            _userManager = userManager;
            if (_dbClient == null)
            {
                _dbClient = new MongoClient("mongodb://localhost:27017/");
                var database = _dbClient.GetDatabase("jello");
                _collection = database.GetCollection<JelloBoard>("boards");
                _userManager = userManager;
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
                user.UserBoards.Add(requestData.ToBoardData());
                await _userManager.UpdateAsync(user);

                await _collection.InsertOneAsync(requestData);

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
                var filter = Builders<JelloBoard>.Filter.Eq("Name", requestData.Name);
                var board = await _collection.Find(filter).FirstAsync();
                foreach(var user in requestData.SharedUsers)
                {
                    board.SharedUsers.Add(user);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteBoard([FromBody] BoardData requestData)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            user.UserBoards.RemoveAll(v => v.Id == requestData.Id);
            await _userManager.UpdateAsync(user);

            var filter = Builders<JelloBoard>.Filter.Eq("Id", requestData.Id);
            var result = await _collection.DeleteOneAsync(filter);
            if (result.DeletedCount == 1)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}
