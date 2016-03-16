using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformApp.Models.v1
{
    public class UserModel
    {
        public UserModel()
        { }

        public UserModel(Backend.Data.User user)
        {
            Id = user.Id;
            Permissions = user.WarehousePermissions.Select(wp => new WarehousePermissionsModel(wp))
                                                    .ToList();
        }

        public string Id { get; set; }

        public List<WarehousePermissionsModel> Permissions { get; set; }
    }
}