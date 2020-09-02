using ThisOrThat.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;

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
            var items = _cardItems.Find<CardItem>(cardItem => cardItem.Category == other.Category && cardItem.Id != other.Id).ToList();
            return items.OrderBy(i => Math.Abs(i.Rating - other.Rating)).FirstOrDefault();
        }

        public CardItem Create(CardItem cardItem)
        {
            _cardItems.InsertOne(cardItem);
            return cardItem;
        }

        public void Update(string id, CardItem cardItemIn) =>
            _cardItems.ReplaceOne(cardItem => cardItem.Id == id, cardItemIn);

        public void Remove(string id) =>
            _cardItems.DeleteOne(cardItem => cardItem.Id == id);
    }
}