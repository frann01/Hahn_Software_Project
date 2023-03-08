using Microsoft.AspNetCore.Mvc;
using SzellnerAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SzellnerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookService bookService;

        public BooksController(BookService _bookService) 
        { 
            this.bookService = _bookService;
        }


        // GET: api/Books
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/Books/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return Ok(bookService.Get(new Book()
            {
                Id = id
            })) ;
        }

        // POST api/Books
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/Books/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/Books/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
