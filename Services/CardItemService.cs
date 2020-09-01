using ThisOrThat.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace ThisOrThat.Services
{
    public class CardItemService
    {
        private readonly IMongoCollection<CardItem> _cardItems;

        public CardItemService(IDBConfig settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _cardItems = database.GetCollection<CardItem>(settings.CollectionName);
        }

        public List<CardItem> Get() =>
            _cardItems.Find(cardItem => true).ToList();

        public CardItem Get(string id) =>
            _cardItems.Find<CardItem>(cardItem => cardItem.Id == id).FirstOrDefault();

        public CardItem Create(CardItem cardItem)
        {
            _cardItems.InsertOne(cardItem);
            return cardItem;
        }

        public void Update(string id, CardItem cardItemIn) =>
            _cardItems.ReplaceOne(cardItem => cardItem.Id == id, cardItemIn);

        public void Remove(CardItem cardItemIn) =>
            _cardItems.DeleteOne(cardItem => cardItem.Id == cardItemIn.Id);

        public void Remove(string id) =>
            _cardItems.DeleteOne(cardItem => cardItem.Id == id);
    }
}