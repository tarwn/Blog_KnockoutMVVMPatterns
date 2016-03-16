using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformApp.Backend.Data
{
    public class User
    {
        public User() 
        { 
            WarehousePermissions = new List<WarehousePermissions>();
        }

        public User(string id, string username, string passwordHash, List<WarehousePermissions> permissions)
        {
            Id = id;
            Username = username;
            PasswordHash = passwordHash;
            WarehousePermissions = permissions;
        }

        public string Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public List<WarehousePermissions> WarehousePermissions { get; set; }
    }
}