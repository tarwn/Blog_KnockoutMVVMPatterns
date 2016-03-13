using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CrossPlatformValidation.Models.v1
{
    public class InventoryOrderLineModel
    {
        public InventoryOrderLineModel()
        { }

        public InventoryOrderLineModel(Backend.Data.InventoryOrderLine order)
        {
            Warehouse = order.Warehouse;
            Product = order.Product;
            Quantity = order.Quantity;
        }

        public string Warehouse { get;set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
    }
}
