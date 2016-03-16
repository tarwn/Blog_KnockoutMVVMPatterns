using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformApp.Backend.Data
{
    [Flags]
    public enum InventoryPermissions
    {
        None = 0,
        CanView = 1,
        CanOrderLevel1 = 2,
        CanOrderLevel2 = 4
    }
}