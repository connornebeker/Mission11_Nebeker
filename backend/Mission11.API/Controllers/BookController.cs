using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers;

[Route("[controller]")]
[ApiController]

public class BookController : ControllerBase
{
    private BookDbContext _context;

    public BookController(BookDbContext temp)
    {
        _context = temp;
    }

    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? Categories = null)
    {
        var query = _context.Books.AsQueryable();

        // Apply sorting based on sortOrder
        if (sortOrder.ToLower() == "asc")
        {
            query = query.OrderBy(b => b.Title);
        }
        else
        {
            query = query.OrderByDescending(b => b.Title);
        }

        if (Categories != null && Categories.Any())
        {
            query = query.Where(c => Categories.Contains(c.Category));
        }
        
        var books = query
            .Skip(pageSize * (pageNum - 1))
            .Take(pageSize)
            .ToList();
        
        var total = _context.Books.Count();

        var result = new { Books = books, Total = total };
        
        return Ok(result);
    }

    [HttpGet("GetBookCategories")]
    public IActionResult GetBookCategories()
    {
        var categories = _context.Books
            .Select(c => c.Category)
            .Distinct()
            .ToList();
        
        return Ok(categories);
    }

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _context.Books.Add(newBook);
        _context.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{bookID}")]
    public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
    {
        var existingBook = _context.Books.Find(bookID);
        
        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;
        
        _context.Books.Update(existingBook);
        _context.SaveChanges();
        return Ok(updatedBook);
    }

    [HttpDelete("DeleteBook/{bookID}")]
    public IActionResult DeleteBook(int bookID)
    {
        var book = _context.Books.Find(bookID);

        if (book == null)
        {
            return NotFound(new { message = "Book not found" });
        }
        
        _context.Books.Remove(book);
        _context.SaveChanges();
        return NoContent();
    }
}