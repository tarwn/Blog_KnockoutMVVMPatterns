using CrossPlatformApp.Backend;
using CrossPlatformApp.Models.v1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CrossPlatformApp.Controllers
{
    public class UserController : ApiController
    {
        private readonly IBackendServices _backend;

        public UserController(IBackendServices backendService)
        {
            _backend = backendService;
        }

        [HttpGet]
        [Route("api/v1/users/{id}")]
        [Authorize]
        public UserModel Index(string id)
        {
            //authorize user
            //TODO authorize

            // get + map data
            var user = _backend.GetUser(id);
            if (user == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(String.Format("'{0}' does not match a user in this system", id))
                });
            }
            else
            {
                return new UserModel(user);
            }
        }
    }
}
