using Microsoft.EntityFrameworkCore;
using FindME.Application;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using FindME.Application.Repositories;
using FindME.Application.Models;
using FindME.Application.Services;
using FindME.Application.Tools;


namespace FindME.Application;

public class Program
{
    public static void Main(string[] args)
    {
        // GANZ OBEN in Program.cs:
        Console.WriteLine("Hash-Tool starten? (y/n): ");
        var input = Console.ReadLine();
        if (input?.ToLower() == "y")
        {
            Console.WriteLine("1 = Benutzer Hash generieren");
            Console.WriteLine("2 = Master Password generieren");
            var option = Console.ReadLine();

            if (option == "1")
                HasherTool.Start();
            else if (option == "2")
                HasherTool.GenerateMasterPassword();

            return; // Danach Programm beenden
        }


        var builder = WebApplication.CreateBuilder(args);

        // 1. Add DbContext with SQLite connection string
        builder.Services.AddDbContext<FindmeDbContext>(options =>
            options.UseSqlite(@"Data Source=findme.db"));

        // 2. Repositories registrieren
        builder.Services.AddScoped<CategoryRepository>();
        builder.Services.AddScoped<LocationRepository>();
        builder.Services.AddScoped<ItemRepository>();
        //    Service Klassen reg.
        builder.Services.AddScoped<CategoryService>();
        builder.Services.AddScoped<LocationService>();
        builder.Services.AddScoped<ItemService>();
        builder.Services.AddSingleton<UserService>();


        // 3. Controller + Swagger
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "FindME API",
                Version = "v1"
            });
        });

        // 4. CORS KONFIGURATION
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        // 5. Middleware
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors("AllowFrontend");
        app.UseAuthorization();
        app.MapControllers();

        // 6. Datenbank automatisch seeden
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<FindmeDbContext>();

            // Optional: Migrationen automatisch anwenden
            context.Database.Migrate();

            SeedDatabase(context);
        }

        app.Run();
    }

    // Hilfsmethode zum Seeden der Datenbank
    private static void SeedDatabase(FindmeDbContext context)
    {
        if (!context.Categories.Any())
        {
            context.Categories.AddRange(
                new Category("Laptop"),
                new Category("Smartphone"),
                new Category("Tablet"),
                new Category("Kopfhörer"),
                new Category("Ladegerät"),
                new Category("USB-Stick"),
                new Category("Externe Festplatte"),
                new Category("Computerzubehör"), 
                new Category("Smartwatch"),
                new Category("Taschenrechner"),
                new Category("Elektronik"),
                new Category("Laborausrüstung"),
                new Category("Werkzeug"),
                new Category("Schulbuch"),
                new Category("Hefte/Notizblöcke"),
                new Category("Zettel/Dokumente"),
                new Category("Ausweis/ID"),
                new Category("Kleidung"),
                new Category("Brille"),
                new Category("Sport"),
                new Category("Wasserflasche/Brotdose"),
                new Category("Geldbörse"),
                new Category("Schlüssel"),
                new Category("Schmuck/Uhr"),
                new Category("Anderes")
            );
        }

        if (!context.Locations.Any())
        {
            context.Locations.AddRange(
                new Location("A1.03"),
                new Location("A1.05"),
                new Location("A1.06"),
                new Location("A1.14"),
                new Location("A1.15"),
                new Location("A1.16"),
                new Location("A1.17"),
                new Location("A1.23"),
                new Location("A2.04"),
                new Location("A2.05"),
                new Location("A2.06"),
                new Location("A2.13"),
                new Location("A2.14"),
                new Location("A2.20"),
                new Location("A3.04"),
                new Location("A3.05"),
                new Location("A3.12"),
                new Location("A3.13"),
                new Location("A3.14"),
                new Location("A3.19"),
                new Location("AH.21"),
                new Location("AH.26"),
                new Location("AH.32"),
                new Location("AL"),
                new Location("AU.04"),
                new Location("AV_A1.07"),
                new Location("AV_A3.11"),
                new Location("AV_B4.09"),
                new Location("AV_C1.06a"),
                new Location("AV_C1.06b"),
                new Location("B1.06W"),
                new Location("B1.07HW"),
                new Location("B1.07W"),
                new Location("B1.07ab"),
                new Location("B1.08L"),
                new Location("B1.13W"),
                new Location("B1.14W"),
                new Location("B1.15HW"),
                new Location("B2"),
                new Location("B2.06L"),
                new Location("B2.07aL"),
                new Location("B2.07bW"),
                new Location("B2.07bWx"),
                new Location("B2.09HW"),
                new Location("B2.10HW"),
                new Location("B2.11HW"),
                new Location("B3"),
                new Location("B3.06MF"),
                new Location("B3.07MF"),
                new Location("B3.07MM"),
                new Location("B3.08MF"),
                new Location("B3.10MF"),
                new Location("B3.11NW"),
                new Location("B3.12NW"),
                new Location("B4"),
                new Location("B4.07"),
                new Location("B4.12MF"),
                new Location("B4.12MM"),
                new Location("B4.14MF"),
                new Location("B4.15MF"),
                new Location("B4.16MF"),
                new Location("B4.17MF"),
                new Location("B5.06"),
                new Location("B5.07"),
                new Location("B5.08"),
                new Location("B5.09"),
                new Location("B5.10"),
                new Location("B5.11"),
                new Location("B5.12"),
                new Location("B5.13"),
                new Location("BESP"),
                new Location("BH.08W"),
                new Location("BH.09aW"),
                new Location("BH.09bW"),
                new Location("BH.09cW"),
                new Location("BH.09dW"),
                new Location("BH.10"),
                new Location("BH.10aW"),
                new Location("BH.11W"),
                new Location("BLA"),
                new Location("C1"),
                new Location("C1.07"),
                new Location("C1.10"),
                new Location("C1.13"),
                new Location("C1.14"),
                new Location("C1.17"),
                new Location("C2"),
                new Location("C2.06"),
                new Location("C2.07"),
                new Location("C2.08"),
                new Location("C2.09"),
                new Location("C2.10"),
                new Location("C2.11"),
                new Location("C2.14"),
                new Location("C3"),
                new Location("C3.06"),
                new Location("C3.07"),
                new Location("C3.08"),
                new Location("C3.09"),
                new Location("C3.10"),
                new Location("C3.11"),
                new Location("C3.14"),
                new Location("C4.06"),
                new Location("C4.07"),
                new Location("C4.08"),
                new Location("C4.09"),
                new Location("C4.10"),
                new Location("C4.11"),
                new Location("C4.14"),
                new Location("C5.06"),
                new Location("C5.07"),
                new Location("C5.08"),
                new Location("C5.09"),
                new Location("C5.10"),
                new Location("CH.09L"),
                new Location("CH.10aL"),
                new Location("CH.11L"),
                new Location("CH.12L"),
                new Location("CH.13"),
                new Location("CH.14a"),
                new Location("CU.27"),
                new Location("CU.28"),
                new Location("DE.03"),
                new Location("DE.04L"),
                new Location("DE.05L"),
                new Location("DE.09L"),
                new Location("DE.10W"),
                new Location("DE.11W"),
                new Location("DE.12aW"),
                new Location("DE.13aW"),
                new Location("DE.15L"),
                new Location("DE.19L"),
                new Location("DE.20"),
                new Location("DE.20L"),
                new Location("DE.21L"),
                new Location("DE.22"),
                new Location("DE.22L"),
                new Location("DISTL"),
                new Location("HOF"),
                new Location("HOF1"),
                new Location("LZ_A1.13"),
                new Location("LZ_A2.12"),
                new Location("LZ_A2.15"),
                new Location("LZ_A3.11"),
                new Location("LZ_AH.21"),
                new Location("LZ_AH.25"),
                new Location("LZ_B1.12"),
                new Location("LZ_B1.13"),
                new Location("LZ_B1.16A"),
                new Location("LZ_B2.12A"),
                new Location("LZ_B3.12"),
                new Location("LZ_B3.15"),
                new Location("LZ_B4.06B"),
                new Location("LZ_B4.08"),
                new Location("LZ_B4.10"),
                new Location("LZ_B4.11"),
                new Location("LZ_B4.18A"),
                new Location("LZ_B5.14"),
                new Location("LZ_B5.14/B6.02"),
                new Location("LZ_B5.15a"),
                new Location("LZ_B5.15A"),
                new Location("LZ_B5.15B"),
                new Location("LZ_B5.15C"),
                new Location("LZ_B5.18A"),
                new Location("LZ_B5.18B"),
                new Location("LZ_B5.18C"),
                new Location("LZ_B5.19"),
                new Location("LZ_B6.02"),
                new Location("LZ_BH.08C"),
                new Location("LZ_BH.10B"),
                new Location("LZ_C1.16a"),
                new Location("LZ_C2.12"),
                new Location("LZ_C3.12"),
                new Location("LZ_C4.12"),
                new Location("LZ_C5.11"),
                new Location("LZ_CH.06"),
                new Location("LZ_CU.08"),
                new Location("LZ_CU.14"),
                new Location("LZ_CU.20"),
                new Location("LZ_DE.13"),
                new Location("LZ_DE.15"),
                new Location("LZ_DE.16"),
                new Location("VAS"),
                new Location("WAKL"),
                new Location("Schulhof")
            );
        }

        context.SaveChanges();
    }
}
