﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrossPlatformValidation.Models
{
    public class HomeModel
    {
        public HomeModel(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }
    }
}