using CrossPlatformValidation.Backend;
using CrossPlatformValidation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrossPlatformValidation.Controllers
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