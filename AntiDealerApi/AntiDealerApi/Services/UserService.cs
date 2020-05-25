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
using AntiDealerApi.Resources;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AntiDealerApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenService _tokenService;

        public UserService(IUserRepository userRepository, IPasswordHasher passwordHasher, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
        }

        public async Task<AuthResource> Authenticate(string email, string password)
        {
            var user = await _userRepository.GetUser(email);

            if (user == null)
                return null;

            string userPasswordHash = user.PasswordHash;

            byte[] salt = Convert.FromBase64String(user.Salt);
            string passwordHash = _passwordHasher.HashPassword(password, salt);

            if (!userPasswordHash.Equals(passwordHash)) // check user password
                return null;

            string token = _tokenService.GenerateJwtToken(user.Email);
            string refreshToken = _tokenService.GenerateRefreshToken();
            await UpdateRefreshToken(email, refreshToken);
            return new AuthResource
            {
                Token = token,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthResource> Register(string email, string password)
        {
            // check if email is registered
            var checkUser = await _userRepository.GetUser(email);
            if (checkUser != null)
                return null;

            byte[] salt = _passwordHasher.GenerateSalt();
            string passwordHash = _passwordHasher.HashPassword(password, salt);
            var newUser = new User
            {
                Email = email,
                PasswordHash = passwordHash,
                Salt = Convert.ToBase64String(salt),
                Rating = 0
            };

            var user = await _userRepository.AddUser(newUser);

            string token = _tokenService.GenerateJwtToken(user.Email);
            string refreshToken = _tokenService.GenerateRefreshToken();
            await UpdateRefreshToken(email, refreshToken);
            return new AuthResource
            {
                Token = token,
                RefreshToken = refreshToken
            };
        }

        public async Task<User> GetUser(string email)
        {
            var user = await _userRepository.GetUser(email);
            return user;
        }

        // returns true if error
        public async Task<bool> EditCurrentUser(string currentEmail, string email, string password)
        {
            // check if email is registered
            if (!String.IsNullOrEmpty(email))
            {
                var checkUser = await _userRepository.GetUser(email);
                if (checkUser != null)
                    return true;
            }

            var currentUser = await _userRepository.GetUser(currentEmail);
            if (!String.IsNullOrEmpty(email))
                currentUser.Email = email;
            if (!String.IsNullOrEmpty(password))
            {
                byte[] salt = _passwordHasher.GenerateSalt();
                string passwordHash = _passwordHasher.HashPassword(password, salt);

                currentUser.PasswordHash = passwordHash;
                currentUser.Salt = Convert.ToBase64String(salt);
            }

            await _userRepository.SaveChanges();
            return false;
        }

        public async Task UpdateRefreshToken(string email, string refreshToken)
        {
            await _userRepository.UpdateUserRefreshToken(email, refreshToken);
        }
    }
}