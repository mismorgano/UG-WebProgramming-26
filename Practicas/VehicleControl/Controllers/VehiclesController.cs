
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleControl.Models;

namespace VehicleControl.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehiclesController : ControllerBase
{
    private readonly ApplicationDbContext dbContext;

    public VehiclesController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Vehicle>>> GetVehicles()
    {
        List<Vehicle> vehicles = new List<Vehicle>();
        vehicles = dbContext.Vehicles.Include(v => v.CarBrand).ToList();

        return vehicles;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Vehicle>> GetVehicleFromId([FromRoute] int id)
    {
        Vehicle vehicle = new Vehicle();
        vehicle = dbContext.Vehicles.FirstOrDefault(v => v.Id == id)!;
        return vehicle;
    }
}