using ThisOrThat.Models;
using ThisOrThat.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ThisOrThat.Controllers
{
    [ApiController]
    public class CardItemsController : ControllerBase
    {
        private readonly CardItemService _cardItemService;

        public CardItemsController(CardItemService cardItemService)
        {
            _cardItemService = cardItemService;
        }

        [HttpGet]
        [Route("pair")]
        public ActionResult<List<CardItem>> GetNewPair()
        {
            var resultPair = new List<CardItem>();
            var first = _cardItemService.GetRandom();
            resultPair.Add(first);
            var second = _cardItemService.GetCompeting(first);
            resultPair.Add(second);
            return resultPair;
        }

        [HttpGet]
        [Route("notapproved")]
        public ActionResult<List<CardItem>> GetAllNotApproved() => _cardItemService.GetNotApproved();

        [HttpPost]
        [Route("create")]
        public ActionResult<CardItem> Create(CardItem cardItem)
        {
            _cardItemService.Create(cardItem);

            return NoContent();
        }

        [HttpPut]
        [Route("approve/{id}")]
        public IActionResult Approve(string id)
        {
            var cardItem = _cardItemService.GetOne(id);

            if (cardItem == null)
            {
                return NotFound();
            }

            cardItem.Approved = true;

            var cardItemIn = cardItem;

            _cardItemService.Update(id, cardItemIn);

            return NoContent();
        }

        [HttpPut]
        [Route("choose/{winnerId};{loserId}")]
        public IActionResult Choose(string winnerId, string loserId)
        {
            var winner = _cardItemService.GetOne(winnerId);

            if (winner == null)
            {
                return NotFound();
            }

            var loser = _cardItemService.GetOne(loserId);

            if (loser == null)
            {
                return NotFound();
            }

            winner.Rating++;
            loser.Rating--;

            _cardItemService.Update(winnerId, winner);
            _cardItemService.Update(loserId, loser);

            return NoContent();
        }

        [HttpDelete]
        [Route("reject/{id}")]
        public IActionResult Reject(string id)
        {
            var cardItem = _cardItemService.GetOne(id);

            if (cardItem == null)
            {
                return NotFound();
            }

            _cardItemService.Delete(cardItem.Id);

            return NoContent();
        }

        [HttpGet]
        [Route("categories")]
        public List<string> GetCategories()
        {
            return _cardItemService.GetCategories();
        }
    }
}