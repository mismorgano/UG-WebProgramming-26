using Microsoft.EntityFrameworkCore;
using VehicleControl.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<CarBrand> CarBrands {get; set;}
    public DbSet<Vehicle> Vehicles {get; set;}
    // public DbSet<Product> Products {get; set;}
}