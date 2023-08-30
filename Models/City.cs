namespace DeShawnsDogWalking.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<WalkerCity> Walkers { get; set; }
        public List<Dog> Dogs { get; set; }
    }
}
