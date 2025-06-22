using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindME.Application.Models
{
    public class Item
    {
        public Item(int itemId, string name, Category category, Location foundLocation, DateTime foundDate, bool isClaimed, DateTime? claimedDate, string imagePath, string description)
        {
            ItemId = itemId;
            Name = name;
            Category = category;
            FoundLocation = foundLocation;
            FoundDate = foundDate;
            IsClaimed = isClaimed;
            ClaimedDate = claimedDate;
            ImagePath = imagePath;
            Description = description;
        }

#pragma warning disable CS8618 // Ein Non-Nullable-Feld muss beim Beenden des Konstruktors einen Wert ungleich NULL enthalten. Fügen Sie ggf. den „erforderlichen“ Modifizierer hinzu, oder deklarieren Sie den Modifizierer als NULL-Werte zulassend.
        protected Item() { }
#pragma warning restore CS8618 // Ein Non-Nullable-Feld muss beim Beenden des Konstruktors einen Wert ungleich NULL enthalten. Fügen Sie ggf. den „erforderlichen“ Modifizierer hinzu, oder deklarieren Sie den Modifizierer als NULL-Werte zulassend.



        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ItemId { get; set; }
        public string Name { get; set; }
        public Category Category { get; set; }
        public Location FoundLocation { get; set; }
        public DateTime FoundDate { get; set; }
        public bool IsClaimed { get; set; }
        public DateTime? ClaimedDate { get; set; }
        public string ImagePath { get; set; } // Pfad zum Bild
        public string Description { get; set; }
    }

}
