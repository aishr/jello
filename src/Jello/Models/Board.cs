using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Jello.Models
{
    public class Board
    {
        public List<string> UserCreatedBoards { get; set; }
        public List<string> SharedBoards { get; set; }
        [BsonId]
        public string Username { get; set; }
    }
}
