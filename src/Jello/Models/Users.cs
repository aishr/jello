using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Jello.Models
{
    public class Users
    {
        [BsonId]
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
    }
}
