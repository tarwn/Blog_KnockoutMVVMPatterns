using CrossPlatformValidation.Backend;
using CrossPlatformValidation.Backend.Data;
using CrossPlatformValidation.Models.v1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CrossPlatformValidation.Controllers
{
    public class OrdersController : ApiController
    {
        private readonly IBackendServices _backend;

        public OrdersController(IBackendServices backendServices)
        {
            _backend = backendServices;
        }

        [HttpGet]
        [Route("api/v1/orders")]
        public List<InventoryOrderModel> GetAllPendingOrders()
        {
            // authorize user
            //TODO authorization

            // get + map data
            var pendingOrders = _backend.GetPendingOrders();
            return pendingOrders.Select(o => new InventoryOrderModel(o))
                                .ToList();
        }

        [HttpPost]
        [Route("api/v1/orders")]
        public InventoryOrderModel SubmitOrder(InventoryOrderModel order)
        {
            // authorize user
            //TODO authorization

            // convert to valid input
            var incomingOrder = new InventoryOrder();
            foreach (var orderLine in order.Contents) {
                incomingOrder.Contents.Add(new InventoryOrderLine(orderLine.Warehouse, orderLine.Product, orderLine.Quantity));
            }

            // validate input
            //TODO validation

            // submit + map result
            var updatedOrder = _backend.SubmitOrder(incomingOrder);
            return new InventoryOrderModel(updatedOrder);
        }

    }
}
