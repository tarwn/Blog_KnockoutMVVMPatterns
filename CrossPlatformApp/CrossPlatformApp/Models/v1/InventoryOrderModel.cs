using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformApp.Models.v1
{
    public class InventoryOrderModel
    {
        public InventoryOrderModel()
        {
            Contents = new List<InventoryOrderLineModel>();
        }

        public InventoryOrderModel(Backend.Data.InventoryOrder order)
        {
            this.Id = order.Id;
            this.Contents = order.Contents.Select(ol => new InventoryOrderLineModel(ol))
                                          .ToList();
        }

        public string Id { get; set; }

        public List<InventoryOrderLineModel> Contents { get; set; }
    }
}