using Microsoft.AspNetCore.Mvc;
using SzellnerAPI.Models.Entities;
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
        public IActionResult Get()
        {
            return Ok(bookService.GetAll());
        }

        // GET api/Books/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return Ok(bookService.Get(new Book()
            {
                Id = id
            }));
        }

        // POST api/Books
        [HttpPost]
        public IActionResult Post(Book book_json)
        {

            var newBook = bookService.Add(book_json);
            if(newBook != null)
            {
                return Ok(newBook);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/Books/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody]Book book_json)
        {
            var newBook = bookService.Put(book_json);
            if (newBook != null)
            {
                return Ok(newBook);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/Books/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            return Ok(bookService.Delete(new Book()
            {
                Id = id
            }));
        }
    }
}
