using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformApp.Backend.Data
{
    public class InventoryOrderLine
    {
        public InventoryOrderLine(string warehouse, string product, int quantity)
        {
            Warehouse = warehouse;
            Product = product;
            Quantity = quantity;
        }

        public string Warehouse { get; set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
        
        // status, expected delivery ate, etc
    }
}