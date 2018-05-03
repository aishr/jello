using Microsoft.AspNetCore.Identity.MongoDB;
using MongoDB.Bson.Serialization.Attributes;

namespace Jello.Models
{
    public class ApplicationUser : IdentityUser
    {
        [BsonId]
        public override string Id { get; set; }
    }
}
