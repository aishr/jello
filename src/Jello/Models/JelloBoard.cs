using MongoDB.Bson.Serialization.Attributes;

namespace Jello.Models
{
    public class JelloBoard
    {
        [BsonId]
        public string Id => Creator + Name;
        public string Creator { get; set; }
        public string Name { get; set; }
    }
}
