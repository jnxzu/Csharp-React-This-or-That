using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ThisOrThat.Models
{
    public class CardItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("description")]
        public string Description { get; set; }
        [BsonElement("imageUrl")]
        public string ImageUrl { get; set; }
        [BsonElement("rating")]
        public int Rating { get; set; }
        [BsonElement("approved")]
        public bool Approved { get; set; }
        [BsonElement("category")]
        public string Category { get; set; }
    }
}
