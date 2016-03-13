using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformValidation.Models.v1
{
    public class WarehousePermissionsModel
    {
        public WarehousePermissionsModel()
        { }

        public WarehousePermissionsModel(Backend.Data.WarehousePermissions wp)
        {
            Warehouses = wp.Warehouses;
            Permissions = wp.Permissions;
        }

        public List<string> Warehouses { get; set; }

        public Backend.Data.InventoryPermissions Permissions { get; set; }
    }
}