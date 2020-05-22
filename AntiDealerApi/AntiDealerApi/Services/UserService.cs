using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AntiDealerApi.Domain.Models;
using AntiDealerApi.Domain.Repositories;
using AntiDealerApi.Domain.Services;
using AntiDealerApi.Helpers;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AntiDealerApi.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly IUserRepository _userRepository;

        public UserService(IOptions<AppSettings> appSettings, IUserRepository userRepository)
        {
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
        }

        public async Task<string> Authenticate(string email, string password)
        {
            var user = await _userRepository.GetUser(email);

            if (user == null)
                return null;

            string userPasswordHash = user.PasswordHash;

            byte[] salt = Convert.FromBase64String(user.Salt);
            string passwordHash = HashPassword(password, salt);

            if (!userPasswordHash.Equals(passwordHash)) // check user password
                return null;

            string token = GenerateJwtToken(user.Email);
            return token;
        }

        public async Task<string> Register(string email, string password)
        {
            // check if email is registered
            var checkUser = await _userRepository.GetUser(email);
            if (checkUser != null)
                return null;

            byte[] salt = GenerateSalt();
            string passwordHash = HashPassword(password, salt);
            var newUser = new User
            {
                Email = email,
                PasswordHash = passwordHash,
                Salt = Convert.ToBase64String(salt),
                Rating = 0
            };

            var user = await _userRepository.AddUser(newUser);

            string token = GenerateJwtToken(user.Email);
            return token;
        }

        public async Task<User> GetCurrentUser(string email)
        {
            var user = await _userRepository.GetUser(email);
            return user;
        }

        // returns true if error
        public async Task<bool> EditCurrentUser(string currentEmail, string email, string password)
        {
            // check if email is registered
            if (email != String.Empty)
            {
                var checkUser = await _userRepository.GetUser(email);
                if (checkUser != null)
                    return true;
            }

            var currentUser = await _userRepository.GetUser(currentEmail);
            if (email != String.Empty)
                currentUser.Email = email;
            if (!String.IsNullOrEmpty(password))
            {
                byte[] salt = GenerateSalt();
                string passwordHash = HashPassword(password, salt);
                
                currentUser.PasswordHash = passwordHash;
                currentUser.Salt = Convert.ToBase64String(salt);
            }

            await _userRepository.SaveChanges();
            return false;
        }

        private string HashPassword(string password, byte[] salt)
        {
            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }

        private byte[] GenerateSalt()
        {
            // generate a 128-bit salt using a secure PRNG
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return salt;
        }

        public string GenerateJwtToken(string email)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, email)
                }),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string stringToken = tokenHandler.WriteToken(token);

            return stringToken;
        }
    }
}