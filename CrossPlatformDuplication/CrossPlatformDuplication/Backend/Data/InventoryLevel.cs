using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CrossPlatformValidation.Backend.Data
{
    public class InventoryLevel
    {
        public InventoryLevel()
        { }

        public InventoryLevel(string warehouse, string product, int quantity)
        {
            Warehouse = warehouse;
            Product = product;
            Quantity = quantity;
        }

        public string Warehouse { get; set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
    }
}
