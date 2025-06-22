using FindME.Application.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FindME.Application.Repositories
{
    public class CategoryRepository
    {
        private readonly FindmeDbContext _context;

        public CategoryRepository(FindmeDbContext context)
        {
            _context = context;
        }

        // Alle Kategorien abrufen
        public async Task<List<Category>> GetAllCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // Eine Kategorie anhand der ID abrufen
        public async Task<Category?> GetCategoryById(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.CategoryId == id);
        }

        // Eine neue Kategorie hinzufügen
        public async Task AddCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }
        // Nach Namen suchen
        public async Task<Category?> GetCategoryByName(string name)
        {
            return await _context.Categories
                .FirstOrDefaultAsync(c => c.Name.ToLower() == name.ToLower());
        }

        public async Task<bool> DeleteCategoryIfUnusedAsync(string name)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Name == name);
            if (category == null) return false;

            // Alle Items mit dieser Kategorie laden
            var relatedItems = await _context.Items
                .Where(i => i.Category.Name == name)
                .ToListAsync();

            if (relatedItems.Any(i => !i.IsClaimed))
                return false; // aktives Item noch vorhanden

            _context.Items.RemoveRange(relatedItems); // nur claimed Items werden gelöscht
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return true;
        }


    }
}
