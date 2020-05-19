using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AntiDealerApi.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string Salt { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
        public int Rating { get; set; }
        public List<Report> Reports { get; set; }
    }
}