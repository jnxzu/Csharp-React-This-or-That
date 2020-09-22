using ThisOrThat.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;
using MongoDB.Bson;

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

        // get one by id
        public CardItem GetOne(string id) => _cardItems.Find<CardItem>(cardItem => cardItem.Id == id).FirstOrDefault();

        // get all items that have not been approved yet
        public List<CardItem> GetNotApproved() =>
            _cardItems.Find(cardItem => !cardItem.Approved).ToList();

        // get random item
        public CardItem GetRandom()
        {
            Random rng = new Random();
            var items = _cardItems.Find<CardItem>(_ => true).ToList();
            return items[rng.Next(items.Count)];
        }

        // get a similarily rated item from same category
        public CardItem GetCompeting(CardItem other)
        {
            Random rng = new Random();
            var items = _cardItems.Find<CardItem>(cardItem =>
            cardItem.Approved
            && cardItem.Category == other.Category
            && cardItem.Id != other.Id
            && cardItem.Rating > other.Rating - other.Rating / 10
            && cardItem.Rating < other.Rating + other.Rating / 10)
            .ToList();
            return items[rng.Next(items.Count)];
        }

        // create new item
        public CardItem Create(CardItem cardItem)
        {
            _cardItems.InsertOne(cardItem);
            return cardItem;
        }

        // update item
        public void Update(string id, CardItem cardItemIn) =>
            _cardItems.ReplaceOne(cardItem => cardItem.Id == id, cardItemIn);

        // reject item
        public void Delete(string id) =>
            _cardItems.DeleteOne(cardItem => cardItem.Id == id);

        // get categories
        public List<String> GetCategories() => _cardItems.Distinct<string>("category", new BsonDocument()).ToList();
    }
}