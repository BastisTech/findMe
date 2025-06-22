using FindME.Application.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindME.Application
{
    public class FindmeDbContext : DbContext
    {
        public DbSet<Item> Items { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Location> Locations { get; set; }

        public FindmeDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Beziehung zwischen Item und Category
            modelBuilder.Entity<Item>()
                .HasOne(i => i.Category)
                .WithMany()
                .HasForeignKey("CategoryId");

            // Beziehung zwischen Item und Location
            modelBuilder.Entity<Item>()
                .HasOne(i => i.FoundLocation)
                .WithMany()
                .HasForeignKey("LocationId");
        }
    }


}
