using CrossPlatformApp.Backend;
using CrossPlatformApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrossPlatformApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IBackendServices _backend;

        public HomeController(IBackendServices backendServices)
        {
            _backend = backendServices;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View(new HomeModel("abc123"));
        }

    }
}