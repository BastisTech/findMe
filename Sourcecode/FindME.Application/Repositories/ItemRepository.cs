using FindME.Application.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindME.Application.Repositories
{
    public class ItemRepository
    {
        private readonly FindmeDbContext _context;

        public ItemRepository(FindmeDbContext context)
        {
            _context = context;
        }

        // Item hinzufügen
        public async Task AddItem(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
        }

        // Item anhand des Namens abrufen
        public async Task<List<Item>> GetItemsByName(string name)
        {
            return await _context.Items
                .Where(i => i.Name.ToLower() == name.ToLower())
                .ToListAsync();
        }

        // Alle Items abrufen
        public async Task<List<Item>> GetAllItems()
        {
            return await _context.Items
                .Include(i => i.Category)
                .Include(i => i.FoundLocation)
                .ToListAsync();
        }


        public async Task<Item?> GetItemById(int id)
        {
            return await _context.Items.FirstOrDefaultAsync(i => i.ItemId == id);
        }

        // Alle Items einer bestimmten Kategorie abrufen
        public async Task<List<Item>> GetItemsByCategory(int categoryId)
        {
            return await _context.Items
                .Where(i => i.Category.CategoryId == categoryId)
                .ToListAsync();
        }

        // Alle Items an einem bestimmten Standort abrufen
        public async Task<List<Item>> GetItemsByLocation(int locationId)
        {
            return await _context.Items
                .Where(i => i.FoundLocation.LocationId == locationId)
                .ToListAsync();
        }

        // Alle Items mit Category und Location (DTOs)
        public async Task<List<Item>> GetItemsWithDetails()
        {
            return await _context.Items
                .Include(i => i.Category)
                .Include(i => i.FoundLocation)
                .ToListAsync();
        }


        //Category und Location laden bei DTOs
        public async Task<Item?> GetItemWithDetailsById(int id)
        {
            return await _context.Items
                .Include(i => i.Category)
                .Include(i => i.FoundLocation)
                .FirstOrDefaultAsync(i => i.ItemId == id);
        }

        //Claimed methode
        public async Task<bool> ClaimItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null || item.IsClaimed) return false;

            item.IsClaimed = true;
            item.ClaimedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }


    }
}
