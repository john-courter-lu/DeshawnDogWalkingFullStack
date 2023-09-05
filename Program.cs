using System.Text.Json.Serialization;
using DeShawnsDogWalking.Models;
using Microsoft.AspNetCore.Http.Json;

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
    new WalkerCity { Id = 14, WalkerId = 10, CityId = 2 },
    new WalkerCity { Id = 15, WalkerId = 3, CityId = 1 },
    new WalkerCity { Id = 16, WalkerId = 7, CityId = 3 },
    new WalkerCity { Id = 17, WalkerId = 3, CityId = 4 },
    new WalkerCity { Id = 18, WalkerId = 8, CityId = 5 }
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

// Set the JSON serializer options


builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});


// Set the JSON serializer options end

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

//creat basic endpoints needed below;
app.MapGet("/api/dogs", () =>
{
    return dogs;
});

// dog details
app.MapGet("/api/dogs/{id}", (int id) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == id);

    if (dog == null)
    {
        return Results.NotFound();
    }

    // Assuming you have Walker and City collections available
    dog.Walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    dog.City = cities.FirstOrDefault(c => c.Id == dog.CityId);

    return Results.Ok(dog);
});

app.MapGet("/api/cities", () =>
{
    return cities;
});

app.MapGet("/api/walkers", () =>
{
    List<Walker> walkersWithDetails = walkers.Select(walker =>
{
    int id = walker.Id;
    List<WalkerCity> walkerCitiesForSingleWalker = walkerCities.Where(obj => obj.WalkerId == id).ToList();
    //找到所有walkerId符合的bridge table中的项目

    List<City> citiesForSingleWalker = walkerCitiesForSingleWalker.Select(wc => cities.First(c => c.Id == wc.CityId)).ToList();
    //这不是List<WalkerCity>中的property:public City City的找法.
    //那会是从CityId到City, 只要对比id即可, 而且是单个obj
    //而这里是一个collection, 因为一个walker可以在多个cities里工作

    Walker walkerWithDetails = new Walker
    {
        Id = walker.Id,
        Name = walker.Name,
        Email = walker.Email,

        Cities = citiesForSingleWalker

    };

    return walkerWithDetails;
}).ToList();

    return Results.Ok(walkersWithDetails);
});

app.MapPost("/api/dogs", (Dog newDog) =>
{
    // Assign an automatically generated ID
    newDog.Id = dogs.Max(d => d.Id) + 1;

    // Add the new dog to the collection
    dogs.Add(newDog);

    // Return the newly created dog with the assigned ID

    //return Results.Created($"/api/dogs/{newDog.Id}", newDog);
    // 这个会返回 code 201 Created
    // 在return 的headers 中会显示:Location: /api/dogs/12

    return Results.Ok(newDog);
    //这个结果return只会返回newDog的json body, 像是一个json object

    //这两个结果都会返回newDog, 也就是fetch最后res.json()返回的主体
    /* 
    
    {
    "id": 12,
    "name": "string",
    "cityId": 1,
    "walkerId": null,
    "city": null,
    "walker": null
    }

    */

});

app.MapPost("/api/cities", (City city) =>
{
    // Add the new city to your data source
    // Assign an automatically generated ID
    city.Id = cities.Max(d => d.Id) + 1;
    // Add the new dog to the collection
    cities.Add(city);

    // Return the newly created city
    return Results.Created($"/api/cities/{city.Id}", city);
    //这会返回201 Created / Undocumented, 
    //会pass if(response.ok) , Results.OK是默认, 但是Results.Created也行
});

app.MapPut("/api/dogs/{id}", (int id, Dog updatedDog) =>
{
    // Find the dog by its ID
    // and the goal is to get the index of it so we can update that obj in List<Dog> dogs
    Dog dogToUpdate = dogs.FirstOrDefault(d => d.Id == id);
    int dogToUpdateIndex = dogs.IndexOf(dogToUpdate);

    if (dogToUpdate == null)
    {
        return Results.NotFound();
    }
    if (id != updatedDog.Id)
    {
        return Results.BadRequest();
    }

    dogs[dogToUpdateIndex] = updatedDog;
    // 这是PUT的核心: 新object取代旧的object, 所以前端要保证新的object的完整性.

    //下面加入两个properties
    updatedDog.Walker = walkers.FirstOrDefault(w => w.Id == updatedDog.WalkerId);
    updatedDog.City = cities.FirstOrDefault(c => c.Id == updatedDog.CityId);
    //👆这一步也可以省略, 若想要在前端用getDogById来重新fetch也可以

    return Results.Json(updatedDog);
    //Results.Json 或Results.Ok都可以
});

app.MapPut("/api/walkers/{id}", (int id, Walker updatedWalker) =>
{
    // Find the walker by its ID
    Walker walkerToUpdate = walkers.FirstOrDefault(w => w.Id == id);
    int walkerToUpdateIndex = walkers.IndexOf(walkerToUpdate);

    if (walkerToUpdate == null)
    {
        return Results.NotFound();
    }

    walkers[walkerToUpdateIndex] = updatedWalker;
    // 这是PUT的核心: update walkers List in the database; 注意接收的json要完整,不能只是要改变的properties, 因为这是一个完全的覆盖.

    return Results.Json(updatedWalker);
});


app.MapDelete("/api/dogs/{id}", (int id) =>
{

    Dog dogToRemove = dogs.FirstOrDefault(dog => dog.Id == id);

    if (dogToRemove != null)
    {
        dogs.Remove(dogToRemove);
    }

});

app.MapDelete("/api/walkers/{id}", (int id) =>
{
    // Find the walker by their ID and remove them from the database
    var walkerToRemove = walkers.FirstOrDefault(w => w.Id == id);

    if (walkerToRemove != null)
    {
        walkers.Remove(walkerToRemove);// 这是核心
        return Results.NoContent();
        // 这在教材中没有; 测试结果: Server Responses 204 undocumented; Responses 200;
        // ? server responses VS responses
    }
    else
    {
        return Results.NotFound();
        // 这教材中也没有. 但我觉得很必须
    }
});


app.Run();
