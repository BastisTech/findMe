using FindME.Application.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace FindME.Application.Services;

public class UserService
{
    private readonly string _filePath = "AppLaunch.json";
    private readonly PasswordHasher<Account> _hasher = new();
    private readonly IConfiguration _configuration;

    private readonly UserStore _userStore;

    public UserService(IConfiguration configuration)
    {
        _configuration = configuration;
        _userStore = LoadUsers();
    }

    private UserStore LoadUsers()
    {
        if (!File.Exists(_filePath))
            throw new FileNotFoundException("User file not found", _filePath);

        var json = File.ReadAllText(_filePath);
        return JsonConvert.DeserializeObject<UserStore>(json)!;
    }

    public Account? ValidateUser(string username, string password)
    {
        var user = _userStore.Users.FirstOrDefault(u => u.Username == username);
        if (user == null) return null;

        var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, password);
        return result == PasswordVerificationResult.Success ? user : null;
    }

    public Account? GetUser(string username)
    {
        return _userStore.Users.FirstOrDefault(u => u.Username == username);
    }
}
