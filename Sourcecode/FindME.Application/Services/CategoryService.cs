using FindME.Application.Models;
using FindME.Application.Repositories;

namespace FindME.Application.Services;

public class CategoryService
{
    private readonly CategoryRepository _categoryRepository;

    public CategoryService(CategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<List<Category>> GetAllCategoriesAsync()
    {
        return await _categoryRepository.GetAllCategories();
    }

    public async Task<Category> CreateCategoryAsync(string name)
    {
        var category = new Category(name);
        await _categoryRepository.AddCategory(category);
        return category;
    }

    public async Task<Category?> GetCategoryByIdAsync(int id)
    {
        return await _categoryRepository.GetCategoryById(id);
    }

    public async Task<Category?> GetCategoryByNameAsync(string name)
    {
        return await _categoryRepository.GetCategoryByName(name);
    }

    public async Task<bool> DeleteCategoryAsync(string name)
    {
        return await _categoryRepository.DeleteCategoryIfUnusedAsync(name);
    }

}
