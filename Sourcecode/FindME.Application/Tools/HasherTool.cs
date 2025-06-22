using FindME.Application.Models;
using Microsoft.AspNetCore.Identity;

namespace FindME.Application.Tools;

public static class HasherTool
{
    public static void Start()
    {
        var hasher = new PasswordHasher<Account>();

        Console.Write("Benutzername: ");
        var username = Console.ReadLine();

        Console.Write("Passwort: ");
        var password = Console.ReadLine();

        Console.Write("Rolle (Admin/Verwalter): ");
        var role = Console.ReadLine();

        var account = new Account
        {
            Username = username ?? "",
            Role = role ?? ""
        };

        var hashedPassword = hasher.HashPassword(account, password ?? "");

        Console.WriteLine();
        Console.WriteLine("Kopiere folgenden Eintrag in deine AppLaunch.json:");
        Console.WriteLine("{");
        Console.WriteLine($"  \"Username\": \"{username}\",");
        Console.WriteLine($"  \"PasswordHash\": \"{hashedPassword}\",");
        Console.WriteLine($"  \"Role\": \"{role}\"");
        Console.WriteLine("}");
    }

    public static void GenerateMasterPassword()
    {
        var hasher = new PasswordHasher<Account>();

        Console.Write("Master-Passwort: ");
        var password = Console.ReadLine();

        var masterAccount = new Account
        {
            Username = "master",
            Role = "Master"
        };

        var hashedPassword = hasher.HashPassword(masterAccount, password ?? "");

        Console.WriteLine();
        Console.WriteLine("MasterPasswordHash für AppLaunch.json:");
        Console.WriteLine($"\"MasterPasswordHash\": \"{hashedPassword}\"");
    }

}
