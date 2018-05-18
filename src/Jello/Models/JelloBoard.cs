using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Jello.Models
{
    public class JelloBoard
    {
        public JelloBoard()
        {
            SharedUsers = new List<string>();
        }
        [BsonId]
        public string Id => Creator + "_" + Name;
        public string Creator { get; set; }
        public string Name { get; set; }
        public List<string> SharedUsers { get; set; }

        public BoardData ToBoardData()
        {
            return new BoardData()
            {
                Id = Id,
                Name = Name
            };
        }
    }
}
