using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleControl.Models;
using System.Text.Json;

namespace VehicleControl.Controllers;

[EnableCors("LocalHostOrigin")]
[ApiController]
[Route("api/[controller]")]
public class VehiclesController : ControllerBase
{
    private readonly ApplicationDbContext dbContext;
    private readonly ILogger<VehiclesController> _logger;

    public VehiclesController(ApplicationDbContext dbContext, ILogger<VehiclesController> logger)
    {
        this.dbContext = dbContext;
        _logger = logger;
    }


    [HttpPost]
    public async Task<ActionResult> CreateVehicle([FromBody] Vehicle vehicle)
    {
        _logger.LogInformation("Received vehicle: {Vehicle}", JsonSerializer.Serialize(vehicle));
        await dbContext.Vehicles.AddAsync(vehicle);
        var result = await dbContext.SaveChangesAsync();

        if (result > 0)
        {
            return Ok();
        }
        return BadRequest();
    }

    [HttpGet]
    public async Task<ActionResult<List<Vehicle>>> GetVehicles()
    {
        List<Vehicle> vehicles = new List<Vehicle>();
        vehicles = dbContext.Vehicles.Include(v => v.CarBrand).ToList();

        if (vehicles != null)
        {
            return Ok(vehicles);
        }

        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Vehicle>> GetVehicleFromId([FromRoute] int id)
    {
        Vehicle vehicle = new Vehicle();
        vehicle = dbContext.Vehicles.FirstOrDefault(v => v.Id == id)!;
        return Ok(vehicle);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteVehicle([FromRoute] int id)
    {
        Vehicle vehicle = new Vehicle();
        vehicle = dbContext.Vehicles.FirstOrDefault(v => v.Id == id)!;

        if (vehicle == null)
        {
            return NotFound();
        }

        dbContext.Vehicles.Remove(vehicle);
        var result = dbContext.SaveChangesAsync();

        if (result != null)
        {
            return Ok();
        }

        return BadRequest();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateVehicle([FromRoute] int id, [FromBody] Vehicle updatedVehicle)
    {
        Vehicle vehicle = new Vehicle();
        vehicle = dbContext.Vehicles.FirstOrDefault(v => v.Id == id)!;

        if (vehicle == null)
        {
            return NotFound();
        }

        vehicle.Model = updatedVehicle.Model;
        dbContext.Vehicles.Update(vehicle);

        var result = dbContext.SaveChangesAsync();

        if (result != null)
        {
            return Ok();
        }

        return BadRequest();
    }
}
