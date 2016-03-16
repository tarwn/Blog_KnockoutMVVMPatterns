using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformApp.Models.v1
{
    public class InventoryLevelModel
    {
        public InventoryLevelModel()
        { }

        public InventoryLevelModel(Backend.Data.InventoryLevel cl)
        {
            Warehouse = cl.Warehouse;
            Product = cl.Product;
            Quantity = cl.Quantity;
        }


        public string Warehouse { get; set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
    }
}