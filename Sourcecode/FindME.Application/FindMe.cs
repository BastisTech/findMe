using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using FindME.Application.Models;

namespace FindME.Application
{// dotnet ef database drop --force --project FindME.Application ------------- Neue DB
    [Collection("Sequential")]
    public class FindMe
    {
        private FindmeDbContext GetEmptyDbContext()
        {
            var options = new DbContextOptionsBuilder<FindmeDbContext>()
                .UseSqlite(@"Data Source=findme.db")
                .Options;

            var db = new FindmeDbContext(options);
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();
            return db;
        }

        [Fact]
        public void CreateDatabaseTest()
        {
            using var db = GetEmptyDbContext();
        }

        [Fact]
        public void InitializeDatabaseTest()
        {
            using var db = GetEmptyDbContext();

            var categories = new List<Category>
                {
                    new Category("Elektronik"),
                    new Category("Kleidung"),
                    new Category("Smartphone"),
                    new Category("Accessoires")
                };

            db.Categories.AddRange(categories);
            db.SaveChanges();
            db.ChangeTracker.Clear();


            var locations = new List<Location>
                {
                    new Location("C2.14"),
                    new Location("C3.08")
                };

            db.Locations.AddRange(locations);

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fehler beim Speichern: {ex.Message}");
            }

            db.ChangeTracker.Clear();

            // Neue DB-Instanz zur Überprüfung nutzen
            using var dbCheck = new FindmeDbContext(new DbContextOptionsBuilder<FindmeDbContext>()
                .UseSqlite(@"Data Source=findme.db")
                .Options);

            Assert.Equal(categories.Count, dbCheck.Categories.Count());
            Assert.Equal(locations.Count, dbCheck.Locations.Count());
            Assert.Empty(dbCheck.Items);
        }

    }

}
