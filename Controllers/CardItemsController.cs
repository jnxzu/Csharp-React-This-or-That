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
        [Route("api/newpair")]
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
        [Route("api/getnotapproved")]
        public ActionResult<List<CardItem>> GetAllNotApproved() => _cardItemService.GetNotApproved();

        [HttpPost]
        [Route("api/create")]
        public ActionResult<CardItem> Create(CardItem cardItem)
        {
            _cardItemService.Create(cardItem);

            return CreatedAtRoute("GetCardItem", new { id = cardItem.Id.ToString() }, cardItem);
        }

        [HttpPut]
        [Route("api/update/{id}")]
        public IActionResult Update(string id, CardItem cardItemIn)
        {
            var cardItem = _cardItemService.GetOne(id);

            if (cardItem == null)
            {
                return NotFound();
            }

            _cardItemService.Update(id, cardItemIn);

            return NoContent();
        }

        [HttpDelete]
        [Route("api/delete/{id}")]
        public IActionResult Delete(string id)
        {
            var cardItem = _cardItemService.GetOne(id);

            if (cardItem == null)
            {
                return NotFound();
            }

            _cardItemService.Remove(cardItem.Id);

            return NoContent();
        }
    }
}