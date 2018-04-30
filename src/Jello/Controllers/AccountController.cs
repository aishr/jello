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
    public class AccountController : Controller
    {
        private readonly string DBConnectionString = "mongodb://localhost:27017";
        private IMongoCollection<Users> UsersCollection;

        public AccountController()
        {
            var client = new MongoClient(DBConnectionString);
            var database = client.GetDatabase("jello");
            UsersCollection = database.GetCollection<Users>("users");
        }

        [HttpPost]
        public ActionResult Register(Users requestData)
        {
            var filter = Builders<Users>.Filter.Eq("Email", requestData.Email);
            var results = UsersCollection.Find(filter).FirstOrDefault();

            if (results == null)
            {
                UsersCollection.InsertOne(requestData);

                return Ok();
            }

            return StatusCode(409);
        }

        [HttpPost]
        public ActionResult Login([FromBody]Users requestData)
        {
            var filter = Builders<Users>.Filter.Eq("Email", requestData.Email);
            var results = UsersCollection.Find(filter).FirstOrDefault();

            if (results == null || requestData.Password != results.Password)
            {
                return Unauthorized();
            }
            return Ok();
        }
    }
}