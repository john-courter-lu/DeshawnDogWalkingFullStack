namespace DeShawnsDogWalking.Models
{
    public class Walker
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<WalkerCity> Cities { get; set; }
        public List<Dog> Dogs { get; set; }
    }
}
