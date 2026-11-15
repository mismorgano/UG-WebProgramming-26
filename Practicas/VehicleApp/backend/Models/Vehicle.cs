using System.ComponentModel.DataAnnotations;

namespace VehicleControl.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        [MinLength(4)]
        [MaxLength(4)]
        public string Year { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;

        public int CarBrandId { get; set; }
        public CarBrand? CarBrand { get; set; }
    }
}