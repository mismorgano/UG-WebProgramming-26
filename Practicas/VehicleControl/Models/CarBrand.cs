using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VehicleControl.Models
{
    public class CarBrand
    {
        public int Id { get; set; }

        [Required]
        public string Brand { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<Vehicle> Vehicles {get; set;} = new List<Vehicle>();
    }
}
