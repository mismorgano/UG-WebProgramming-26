using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        dbContext.CarBrands.Add(brand);
        var result = await dbContext.SaveChangesAsync();

        if (result > 0)
        {
            return Ok();
        }

        return BadRequest();

    }

    [EnableCors("LocalHostOrigin")]
    [HttpGet]
    public async Task<ActionResult> GetBrands()
    {
        // I don't add any brand so I don't need variable memory just set the "global" brands.
        var brands = await dbContext.CarBrands.ToArrayAsync();


        // The firs time instead of just return NoContent we're gonna 
        // populate our Brand table with many Default Brands

        if (!brands.Any())
        {
            // DefaultBrands() has a list of several brands
            var defaultBrands = Utils.Defaults.DefaultBrands();

            dbContext.AddRange(defaultBrands);
            var result = await dbContext.SaveChangesAsync();

            // Well there may be not content if there's an error when saving to the database
            if (result > 0)
                brands = defaultBrands;
            else
                return NoContent();
        }


        return Ok(brands);

    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetBrandFromId([FromRoute] int id)
    {

        var carBrand = await dbContext.CarBrands.FirstOrDefaultAsync(v => v.Id == id)!;

        if (carBrand != null)
            return Ok(carBrand);

        return NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBrand([FromRoute] int id)
    {

        var carBrand = await dbContext.CarBrands.FirstOrDefaultAsync(m => m.Id == id)!;

        if (carBrand == null)
        {
            return NotFound();
        }

        dbContext.CarBrands.Remove(carBrand);
        var result = await dbContext.SaveChangesAsync();

        if (result > 0)
        {
            return Ok();
        }
        return BadRequest();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateBrand([FromRoute] int id,
            [FromBody] CarBrand updatedBrand)
    {

        var brand = await dbContext.CarBrands.FirstOrDefaultAsync(m => m.Id == id)!;

        if (brand == null)
        {
            return NotFound();
        }

        brand.Brand = updatedBrand.Brand;
        dbContext.CarBrands.Update(brand);

        var result = await dbContext.SaveChangesAsync();

        if (result > 0)
        {
            return Ok();
        }
        return BadRequest();
    }
}
