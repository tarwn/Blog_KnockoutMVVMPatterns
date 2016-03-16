using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformApp.Backend.Data
{
    public class InventoryOrder
    {
        public InventoryOrder()
        {
            Contents = new List<InventoryOrderLine>();
        }

        public string Id { get; set; }

        public List<InventoryOrderLine> Contents { get; set; }

        // status, etc
    }
}