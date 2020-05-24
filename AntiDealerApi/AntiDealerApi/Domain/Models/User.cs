using System.Collections.Generic;
using Newtonsoft.Json;

namespace AntiDealerApi.Domain.Models
{
    public class User
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string Salt { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
        [JsonIgnore]
        public string RefreshToken { get; set; }
        public int Rating { get; set; }
        public List<Report> Reports { get; set; }
    }
}