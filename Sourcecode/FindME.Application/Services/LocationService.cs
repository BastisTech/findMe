using FindME.Application.Models;
using FindME.Application.Repositories;

namespace FindME.Application.Services;

public class LocationService
{
    private readonly LocationRepository _locationRepository;

    public LocationService(LocationRepository locationRepository)
    {
        _locationRepository = locationRepository;
    }

    public async Task<List<Location>> GetAllLocationsAsync()
    {
        return await _locationRepository.GetAllLocations();
    }

    public async Task<Location> CreateLocationAsync(string name)
    {
        var location = new Location(name);
        await _locationRepository.AddLocation(location);
        return location;
    }

    public async Task<Location?> GetLocationByIdAsync(int id)
    {
        return await _locationRepository.GetLocationById(id);
    }
    public async Task<Location?> GetLocationByNameAsync(string name)
    {
        return await _locationRepository.GetLocationByName(name);
    }

    public async Task<bool> DeleteLocationAsync(string name)
    {
        return await _locationRepository.DeleteLocationIfUnusedAsync(name);
    }

}
