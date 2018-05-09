using Microsoft.AspNetCore.Identity.MongoDB;
using System.Collections.Generic;

namespace Jello.Models
{
    public class JelloUser : IdentityUser
    {
        public JelloUser()
        {
            UserCreatedBoards = new List<string>();
            SharedBoards = new List<string>();
        }
        public List<string> UserCreatedBoards { get; set; }
        public List<string> SharedBoards { get; set; }
    }
}
