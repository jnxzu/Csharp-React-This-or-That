using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ThisOrThat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CardItemsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<CardItem> Get()
        {
            return null;
        }
    }
}
