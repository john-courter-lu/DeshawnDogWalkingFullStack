using DeShawnsDogWalking.Models;

// Collections for your project's data
List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "Alphonse Meron", Email = "ameron0@mashable.com" },
    new Walker { Id = 2, Name = "Damara Pentecust", Email = "dpentecust1@apache.org" },
    new Walker { Id = 3, Name = "Anna Bowton", Email = "abowton2@wisc.edu" },
    new Walker { Id = 4, Name = "Hunfredo Drynan", Email = "hdrynan3@bizjournals.com" },
    new Walker { Id = 5, Name = "Elmira Bick", Email = "ebick4@biblegateway.com" },
    new Walker { Id = 6, Name = "Bernie Dreger", Email = "bdreger5@zimbio.com" },
    new Walker { Id = 7, Name = "Rolando Gault", Email = "rgault6@google.com" },
    new Walker { Id = 8, Name = "Tiffanie Tubby", Email = "ttubby7@intel.com" },
    new Walker { Id = 9, Name = "Tomlin Cutill", Email = "tcutill8@marketwatch.com" },
    new Walker { Id = 10, Name = "Arv Biddle", Email = "abiddle9@cafepress.com" }
};

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Dianemarie", WalkerId = 3, CityId = 1 },
    new Dog { Id = 2, Name = "Christoph", WalkerId = 10, CityId = 2 },
    new Dog { Id = 3, Name = "Rocket", WalkerId = 7, CityId = 3 },
    new Dog { Id = 4, Name = "Ebony", WalkerId = 3, CityId = 4 },
    new Dog { Id = 5, Name = "Scotty", WalkerId = 8, CityId = 5 },
    // Additional dog objects with no WalkerId
    new Dog { Id = 6, Name = "Buddy", CityId = 6 },
    new Dog { Id = 7, Name = "Max", CityId = 7 },
    new Dog { Id = 8, Name = "Bailey", CityId = 8 },
    new Dog { Id = 9, Name = "Lucy", CityId = 9 },
    new Dog { Id = 10, Name = "Charlie", CityId = 10 }
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity { Id = 1, WalkerId = 10, CityId = 1 },
    new WalkerCity { Id = 2, WalkerId = 8, CityId = 6 },
    new WalkerCity { Id = 3, WalkerId = 5, CityId = 4 },
    new WalkerCity { Id = 4, WalkerId = 9, CityId = 10 },
    new WalkerCity { Id = 5, WalkerId = 2, CityId = 3 },
    new WalkerCity { Id = 6, WalkerId = 4, CityId = 7 },
    new WalkerCity { Id = 7, WalkerId = 1, CityId = 5 },
    new WalkerCity { Id = 8, WalkerId = 7, CityId = 9 },
    new WalkerCity { Id = 9, WalkerId = 3, CityId = 2 },
    new WalkerCity { Id = 10, WalkerId = 6, CityId = 8 },
    new WalkerCity { Id = 11, WalkerId = 6, CityId = 9 },
    new WalkerCity { Id = 12, WalkerId = 9, CityId = 7 },
    new WalkerCity { Id = 13, WalkerId = 5, CityId = 7 },
    new WalkerCity { Id = 14, WalkerId = 10, CityId = 2 }
};

List<City> cities = new List<City>
{
    new City { Id = 1, Name = "Pittsburgh" },
    new City { Id = 2, Name = "Minneapolis" },
    new City { Id = 3, Name = "Phoenix" },
    new City { Id = 4, Name = "Tucson" },
    new City { Id = 5, Name = "Denver" },
    new City { Id = 6, Name = "Boise" },
    new City { Id = 7, Name = "San Diego" },
    new City { Id = 8, Name = "Sarasota" },
    new City { Id = 9, Name = "White Plains" },
    new City { Id = 10, Name = "Chicago" }
};

           
           



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});


app.Run();