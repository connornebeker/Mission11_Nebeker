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
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
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
        
        var books = query
            .Skip(pageSize * (pageNum - 1))
            .Take(pageSize)
            .ToList();
        
        var total = _context.Books.Count();

        var result = new { Books = books, Total = total };
        
        return Ok(result);
    }
}