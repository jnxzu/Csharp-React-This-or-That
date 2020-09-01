using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ThisOrThat.Models
{
    public class CardItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int Rating { get; set; }
        public bool Approved { get; set; }
    }
}
