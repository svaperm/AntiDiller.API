namespace AntiDealerApi.Domain.Services
{
    public interface IPasswordHasher
    {
        string HashPassword(string password, byte[] salt);
        byte[] GenerateSalt();
    }
}