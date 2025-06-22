using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using FindME.Application.Models;
using FindME.Application.Repositories;
using FindME.Application.Dtos;
using FindME.Application.Services;

namespace FindME.Application.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ItemController : ControllerBase
{
    private readonly ItemService _itemService;
    private readonly LocationService _locationService;
    private readonly CategoryService _categoryService;

    public ItemController(ItemService itemservice, LocationService locationservice, CategoryService categoryservice)
    {
        _itemService = itemservice;
        _locationService = locationservice;
        _categoryService = categoryservice;

    }
    // GET: Item nach ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Item>> GetItem(int id)
    {
        var item = await _itemService.GetItemWithDetailsAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    // GET: Item mit Details (DTO)
    [HttpGet("mapped")]
    public async Task<ActionResult<IEnumerable<ItemDto>>> GetMappedItems()
    {
        var items = await _itemService.GetAllItemsAsync();

        var itemDtos = items.Select(item => new ItemDto(
            item.ItemId,
            item.Name,
            item.Category!.Name,  // Null nicht erlaubt
            item.FoundLocation!.Name,
            item.FoundDate,
            item.IsClaimed,
            item.ImagePath,
            item.Description
        )).ToList();

        return Ok(itemDtos);
    }

    // GET: Einzelnes Item mit DTO
    [HttpGet("mapped/{id}")]
    public async Task<ActionResult<ItemDto>> GetMappedItemById(int id)
    {
        var item = await _itemService.GetItemWithDetailsAsync(id);
        if (item == null || item.Category == null || item.FoundLocation == null)
            return NotFound();

        var itemDto = new ItemDto(
            item.ItemId,
            item.Name,
            item.Category.Name,
            item.FoundLocation.Name,
            item.FoundDate,
            item.IsClaimed,
            item.ImagePath,
            item.Description
        );

        return Ok(itemDto);
    }

    // POST: Neues Item mit DTO erstellen
    [HttpPost("mapped")]
    public async Task<ActionResult<ItemDto>> CreateMappedItem([FromBody] CreateItemDto dto)
    {
        var item = await _itemService.CreateItemAsync(
            dto.Name,
            dto.CategoryName,
            dto.LocationName,
            dto.FoundDate,
            dto.ImagePath,
            dto.Description
        );

        if (item == null) return BadRequest("Ungültige Kategorie oder Standort.");

        var result = new ItemDto(
            item.ItemId,
            item.Name,
            item.Category.Name,
            item.FoundLocation.Name,
            item.FoundDate,
            item.IsClaimed,
            item.ImagePath,
            item.Description
        );

        return CreatedAtAction(nameof(GetMappedItemById), new { id = item.ItemId }, result);
    }
    //Calimed methode
    [HttpPut("claim/{id}")]
    public async Task<IActionResult> ClaimItem(int id)
    {
        var success = await _itemService.ClaimItemAsync(id);
        if (!success)
            return NotFound("Item nicht gefunden oder bereits beansprucht.");

        return NoContent();
    }

    //Upload von Bildern
    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Kein Bild hochgeladen.");

        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "img");
        if (!Directory.Exists(folderPath))
            Directory.CreateDirectory(folderPath);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(folderPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var url = $"{Request.Scheme}://{Request.Host}/img/{fileName}";
        return Ok(new { imagePath = url });
    }


}
