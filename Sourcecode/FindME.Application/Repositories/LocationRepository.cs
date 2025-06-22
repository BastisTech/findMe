using FindME.Application.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FindME.Application.Repositories
{
    public class LocationRepository
    {
        private readonly FindmeDbContext _context;

        public LocationRepository(FindmeDbContext context)
        {
            _context = context;
        }

        // Alle Fundorte abrufen
        public async Task<List<Location>> GetAllLocations()
        {
            return await _context.Locations.ToListAsync();
        }

        // Einen Fundort anhand der ID abrufen
        public async Task<Location?> GetLocationById(int id)
        {
            return await _context.Locations.FirstOrDefaultAsync(l => l.LocationId == id);
        }

        // Einen neuen Fundort hinzufügen (nur für Admins)
        public async Task AddLocation(Location location)
        {
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();
        }
        // Sucht nach name
        public async Task<Location?> GetLocationByName(string name)
        {
            return await _context.Locations
                .FirstOrDefaultAsync(l => l.Name.ToLower() == name.ToLower());
        }

        public async Task<bool> DeleteLocationIfUnusedAsync(string name)
        {
            var location = await _context.Locations.FirstOrDefaultAsync(l => l.Name == name);
            if (location == null) return false;

            var relatedItems = await _context.Items
                .Where(i => i.FoundLocation.Name == name)
                .ToListAsync();

            if (relatedItems.Any(i => !i.IsClaimed))
                return false;

            _context.Items.RemoveRange(relatedItems);
            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return true;
        }


    }
}
