namespace FindME.Application.Models;

public class UserStore
{
    public List<Account> Users { get; set; } = new();
    public string MasterPasswordHash { get; set; } = string.Empty;
}
