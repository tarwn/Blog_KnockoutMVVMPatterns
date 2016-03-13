﻿using CrossPlatformValidation.Backend;
using CrossPlatformValidation.Models.v1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CrossPlatformValidation.Controllers
{
    public class InventoryController : ApiController
    {
        private readonly IBackendServices _backend;

        public InventoryController(IBackendServices backendServices)
        {
            _backend = backendServices;
        }

        [HttpGet]
        [Route("api/v1/inventory")]
        public List<InventoryLevelModel> GetCurrentWarehouseLevels()
        {
            // authorize user
            //TODO authorization

            // get + map data
            var currentLevels = _backend.GetCurrentWarehouseInventoryLevels();
            return currentLevels.Select(cl => new InventoryLevelModel(cl))
                                .ToList();
        }

    }
}
