using CrossPlatformApp.Backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformApp.Backend
{
    public interface IBackendServices
    {
        List<InventoryLevel> GetCurrentWarehouseInventoryLevels();

        InventoryOrder SubmitOrder(InventoryOrder order);

        List<InventoryOrder> GetPendingOrders();

        User GetUser(string id);
    }
}