using Microsoft.AspNetCore.Identity.MongoDB;
using System.Collections.Generic;

namespace Jello.Models
{
    public class JelloUser : IdentityUser
    {
        public JelloUser()
        {
            UserBoards = new List<BoardData>();
            SharedBoards = new List<BoardData>();
        }
        public List<BoardData> UserBoards { get; set; }
        public List<BoardData> SharedBoards { get; set; }
    }
}
