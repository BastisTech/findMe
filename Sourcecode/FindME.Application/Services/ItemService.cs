using FindME.Application.Models;
using FindME.Application.Repositories;

namespace FindME.Application.Services;

public class ItemService
{
    private readonly ItemRepository _itemRepository;
    private readonly CategoryRepository _categoryRepository;
    private readonly LocationRepository _locationRepository;

    public ItemService(ItemRepository itemRepository, CategoryRepository categoryRepository, LocationRepository locationRepository)
    {
        _itemRepository = itemRepository;
        _categoryRepository = categoryRepository;
        _locationRepository = locationRepository;
    }

    public async Task<List<Item>> GetAllItemsAsync()
    {
        return await _itemRepository.GetAllItems();
    }

    public async Task<Item?> GetItemWithDetailsAsync(int id)
    {
        return await _itemRepository.GetItemWithDetailsById(id);
    }

    public async Task<Item?> CreateItemAsync(string name, string categoryName, string locationName, DateTime foundDate, string imagePath, string description)
    {
        var category = await _categoryRepository.GetCategoryByName(categoryName);
        var location = await _locationRepository.GetLocationByName(locationName);

        if (category == null || location == null)
            return null;

        var item = new Item(
            0,
            name,
            category,
            location,
            foundDate,
            false,
            null,
            imagePath,
            description
        );

        await _itemRepository.AddItem(item);
        return item;
    }


    public async Task<bool> ClaimItemAsync(int id)
    {
        return await _itemRepository.ClaimItem(id);
    }

    //public async Task DeleteItemAsync(int itemId)
    //{
    //     await _itemRepository.DeleteItem(itemId);
    // }
}
