using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Jello.Controllers
{
    public class BoardController : Controller
    {
        public BoardController()
        {
        }

        [HttpGet]
        public ActionResult GetUserBoards()
        {
            var test = new Dictionary<string, List<string>>()
            {
                {"user", new List<string>()
                    {
                        "a",
                        "b"
                    }
                },
                {"shared" , new List<string>()
                    {
                        "c",
                        "d"
                    }
                }
            };

            return Ok(test);
        }
    }
}