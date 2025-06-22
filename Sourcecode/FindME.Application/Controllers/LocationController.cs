using FindME.Application.Dtos;
using FindME.Application.Models;
using FindME.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FindME.Application.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LocationController : ControllerBase
{
    private readonly LocationService _locationService;

    public LocationController(LocationService locationService)
    {
        _locationService = locationService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LocationDto>>> GetLocations()
    {
        var locations = await _locationService.GetAllLocationsAsync();
        var dtoList = locations.Select(l => new LocationDto(l.Name)).ToList();
        return Ok(dtoList);
    }

    [HttpPost]
    public async Task<ActionResult<LocationDto>> PostLocation([FromBody] LocationDto dto)
    {
        var location = new Location(dto.Name);
        await _locationService.CreateLocationAsync(dto.Name);
        return CreatedAtAction(nameof(GetLocations), new { name = location.Name }, dto);
    }

    [HttpDelete("{name}")]
    public async Task<IActionResult> DeleteLocation(string name)
    {
        var success = await _locationService.DeleteLocationAsync(name);
        if (!success)
            return BadRequest("Raum/Ort wird noch verwendet und kann nicht gelöscht werden.");
        return NoContent();
    }

}
