using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using CrossPlatformValidation.Backend;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace CrossPlatformValidation.App_Start
{
    public static class AutofacConfig
    {
        public static void RegisterDependencies(HttpConfiguration httpConfiguration)
        {
            var builder = new ContainerBuilder();

            // dependencies
            // registering as singleton so I can use memory/state for data storage
            builder.RegisterType<FakeBackendServices>().As<IBackendServices>().SingleInstance();

            // register MVC controllers for constructor injection
            builder.RegisterControllers(Assembly.GetExecutingAssembly());

            // register WebAPI controllers and filters
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterWebApiFilterProvider(httpConfiguration); 

            var container = builder.Build();

            // MVC Resolver
            var mvcResolver = new AutofacDependencyResolver(container);
            DependencyResolver.SetResolver(mvcResolver);

            // WebAPI Resolver
            var apiResolver = new AutofacWebApiDependencyResolver(container);
            httpConfiguration.DependencyResolver = apiResolver;
        }
    }
}