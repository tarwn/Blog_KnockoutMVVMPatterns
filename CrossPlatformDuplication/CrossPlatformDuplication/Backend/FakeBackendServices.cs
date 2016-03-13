﻿using CrossPlatformValidation.Backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace CrossPlatformValidation.Backend
{
    public class FakeBackendServices : IBackendServices
    {
        private readonly List<User> _users;
        private readonly List<InventoryLevel> _inventory;
        private readonly List<InventoryOrder> _pendingOrders;

        public FakeBackendServices()
        {
            _users = new List<User>();
            _inventory = new List<InventoryLevel>();
            _pendingOrders = new List<InventoryOrder>();

            InitializeData();
        }

        private void InitializeData()
        {
            // current inventory
            _inventory.Add(new InventoryLevel("North Warehouse", "Red Paint #12", 500));
            _inventory.Add(new InventoryLevel("North Warehouse", "Green Paint #6", 500));
            _inventory.Add(new InventoryLevel("North Warehouse", "Orange Paint #34", 250));
            _inventory.Add(new InventoryLevel("North Warehouse", "White Paint #2", 1));
            _inventory.Add(new InventoryLevel("South Warehouse", "White Paint #2", 1000));
            _inventory.Add(new InventoryLevel("East Warehouse", "Red Paint #12", 0));
            _inventory.Add(new InventoryLevel("East Warehouse", "White Paint #2", 1000));
            // already pending orders
            // users
            _users.Add(new User("abc123", "sampleUser", "password", new List<WarehousePermissions>() { 
                new WarehousePermissions(new List<string>{ "North Warehouse"}, InventoryPermissions.CanView),
                new WarehousePermissions(new List<string>{ "South Warehouse"}, InventoryPermissions.CanView | InventoryPermissions.CanOrderLevel1),
                new WarehousePermissions(new List<string>{ "East Warehouse"}, InventoryPermissions.CanView | InventoryPermissions.CanOrderLevel1 | InventoryPermissions.CanOrderLevel2),
            }));
        }

        public List<InventoryLevel> GetCurrentWarehouseInventoryLevels()
        {
            return _inventory;
        }

        public InventoryOrder SubmitOrder(InventoryOrder order)
        {
            order.Id = GenerateOrderId();
            _pendingOrders.Add(order);
            return order;
        }

        private string GenerateOrderId()
        {
            return String.Format("{0:yyyyMMdd}-{1}", DateTime.UtcNow, Math.Floor(new Random().NextDouble() * 10000).ToString().PadLeft(6,'0'));

        }

        public List<InventoryOrder> GetPendingOrders()
        {
            return _pendingOrders;
        }

        public User GetUser(string id)
        {
            return _users.SingleOrDefault(u => u.Id == id);
        }
    }
}