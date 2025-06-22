using FindME.Application.Dtos;
using FindME.Application.Models;
using FindME.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FindME.Application.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly CategoryService _categoryService;

    public CategoryController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();
        var dtoList = categories.Select(c => new CategoryDto(c.Name)).ToList();
        return Ok(dtoList);
    }

    [HttpPost]
    public async Task<ActionResult<CategoryDto>> PostCategory([FromBody] CategoryDto dto)
    {
        var category = new Category(dto.Name);
        await _categoryService.CreateCategoryAsync(dto.Name);
        return CreatedAtAction(nameof(GetCategories), new { name = category.Name }, dto);
    }

    [HttpDelete("{name}")]
    public async Task<IActionResult> DeleteCategory(string name)
    {
        var success = await _categoryService.DeleteCategoryAsync(name);
        if (!success)
            return BadRequest("Kategorie wird noch verwendet und kann nicht gelöscht werden.");
        return NoContent();
    }

}
