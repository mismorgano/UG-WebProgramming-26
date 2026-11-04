using Microsoft.AspNetCore.Mvc;

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

    
}
