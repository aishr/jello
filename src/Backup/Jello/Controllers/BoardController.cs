using System.Threading.Tasks;
using Jello.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Jello.Controllers
{
    public class BoardController : Controller
    {
        private readonly UserManager<JelloUser> _userManager;
        private readonly MongoClient _dbClient;
        private readonly IMongoCollection<JelloBoard> _collection;

        public BoardController(UserManager<JelloUser> userManager)
        {
            _userManager = userManager;
            if (_dbClient == null)
            {
                _dbClient = new MongoClient("mongodb://localhost:27017/");
                var database = _dbClient.GetDatabase("jello");
                _collection = database.GetCollection<JelloBoard>("boards");
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetBoardInfo(BoardData requestData)
        {
            var filter = Builders<JelloBoard>.Filter.Eq("Id", requestData.Id);
            var result = await _collection.Find(filter).FirstAsync();

            return Ok(result);
        }
    }
}