using System.Collections.Generic;

namespace Jello.Models
{
    public class JelloUser
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsPersistent { get; set; }
        public List<string> UserCreatedBoards { get; set; }
        public List<string> SharedBoards { get; set; }
    }
}
