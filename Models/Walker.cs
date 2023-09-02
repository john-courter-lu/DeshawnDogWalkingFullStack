namespace DeShawnsDogWalking.Models
{
    public class Walker
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public List<City> Cities { get; set; } 
        //最终返回List<City>,是一个collection of cities 
        //而不是bridge table List<WalkerCity> City
        //因为是一个collection,而不是单个obj
        //one walker可以在many cities
        public List<Dog> Dogs { get; set; }
    }
}
