using Jello.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Jello.Controllers
{
    public class HomeController : Controller
    {
        private MongoClient DbClient;
        private IMongoDatabase Database;
        public HomeController()
        {
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
        public ActionResult GetUserBoards()
        {

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> AddUserBoard([FromBody] Board requestData)
        {
            var collection = Database.GetCollection<Board>("boards");
            await collection.
            return Ok();
        }
    }
}
