using ThisOrThat.Models;
using ThisOrThat.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ThisOrThat.Controllers
{
    [Route("api/carditems")]
    [ApiController]
    public class CardItemsController : ControllerBase
    {
        private readonly CardItemService _cardItemService;

        public CardItemsController(CardItemService cardItemService)
        {
            _cardItemService = cardItemService;
        }

        [HttpGet]
        public ActionResult<List<CardItem>> Get() =>
            _cardItemService.Get();

        [HttpGet("{id:length(24)}", Name = "GetCardItem")]
        public ActionResult<CardItem> Get(string id)
        {
            var cardItem = _cardItemService.Get(id);

            if (cardItem == null)
            {
                return NotFound();
            }

            return cardItem;
        }

        [HttpPost]
        public ActionResult<CardItem> Create(CardItem cardItem)
        {
            _cardItemService.Create(cardItem);

            return CreatedAtRoute("GetCardItem", new { id = cardItem.Id.ToString() }, cardItem);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, CardItem cardItemIn)
        {
            var cardItem = _cardItemService.Get(id);

            if (cardItem == null)
            {
                return NotFound();
            }

            _cardItemService.Update(id, cardItemIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var cardItem = _cardItemService.Get(id);

            if (cardItem == null)
            {
                return NotFound();
            }

            _cardItemService.Remove(cardItem.Id);

            return NoContent();
        }
    }
}