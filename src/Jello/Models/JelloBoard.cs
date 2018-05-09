using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Jello.Models
{
    public class JelloBoard
    {
        [BsonId]
        public string Id => Creator + Name;
        public string Creator { get; set; }
        public string Name { get; set; }
        public List<string> SharedUsers { get; set; }
    }
}
