using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CrossPlatformValidation.Backend.Data
{
    public class WarehousePermissions
    {
        public WarehousePermissions(List<string> warehouses, InventoryPermissions permissions)
        {
            Warehouses = warehouses;
            Permissions = permissions;
        }

        public List<string> Warehouses { get; set; }
        public InventoryPermissions Permissions { get; set; }
    }
}
