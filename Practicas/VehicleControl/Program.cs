using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// allowCors (to localhost)
var localHostAllow = "LocalHostOrigin";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: localHostAllow, policy =>
    {
        policy.WithOrigins("http://localhost:4200");
    });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
