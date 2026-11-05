using Microsoft.AspNetCore.Mvc;
using VehicleControl.Models;

namespace VehicleControl.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogsController : ControllerBase
{
    private readonly ApplicationDbContext dbContext;

    public CatalogsController(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost]
    public async Task<ActionResult> CreateBrand([FromBody] CarBrand brand)
    {
        await dbContext.CarBrands.AddAsync(brand);
        var result = await dbContext.SaveChangesAsync();

        if (result > 0)
        {
            return Ok();
        }

        return BadRequest();

    }

    [HttpGet]
    public async Task<ActionResult> GetBrands()
    {
        List<CarBrand> brands = new List<CarBrand>();
        brands = dbContext.CarBrands.ToList();

        if (brands != null)
        {
            return Ok(brands);
        }

        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetBrandFromId([FromRoute] int id)
    {
        CarBrand carBrand = new CarBrand();
        carBrand = dbContext.CarBrands.FirstOrDefault(v => v.Id == id)!;

        return Ok(carBrand);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBrand([FromRoute] int id)
    {
        CarBrand carBrand = new CarBrand();
        carBrand = dbContext.CarBrands.FirstOrDefault(m => m.Id == id)!;

        if (carBrand == null)
        {
            return NotFound();
        }

        dbContext.CarBrands.Remove(carBrand);
        var result = dbContext.SaveChangesAsync();

        if (result != null)
        {
            return Ok();
        }
        return BadRequest();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateBrand([FromRoute] int id,
            [FromBody] CarBrand updatedBrand)
    {
        CarBrand brand = new CarBrand();
        brand = dbContext.CarBrands.FirstOrDefault(m => m.Id == id)!;

        if (brand == null)
        {
            return NotFound();
        }

        brand.Brand = updatedBrand.Brand;
        dbContext.CarBrands.Update(brand);

        var result = dbContext.SaveChangesAsync();

        if (result != null)
        {
            return Ok();
        }
        return BadRequest();
    }
}
