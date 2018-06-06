using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Jello.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Jello.Controllers
{
    public class BoardController : Controller
    {
        private MongoClient DbClient;
        private IMongoDatabase Database;
        private IMongoCollection<JelloBoard> Collection;
        private readonly UserManager<JelloUser> _userManager;

        public BoardController(UserManager<JelloUser> userManager)
        {
            _userManager = userManager;
            if (DbClient == null)
            {
                DbClient = new MongoClient("mongodb://localhost:27017/");
                Database = DbClient.GetDatabase("jello");
                Collection = Database.GetCollection<JelloBoard>("boards");
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetBoardInfo(BoardData requestData)
        {
            var filter = Builders<JelloBoard>.Filter.Eq("Id", requestData.Id);
            var result = await Collection.Find(filter).FirstAsync();

            return Ok(result);
        }
    }
}