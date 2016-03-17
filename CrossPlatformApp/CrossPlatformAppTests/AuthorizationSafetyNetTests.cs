using CrossPlatformApp;
using CrossPlatformApp.Controllers;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace CrossPlatformAppTests
{
    [TestFixture]
    public class AuthorizationSafetyNetTests
    {
        Func<object, bool> IsMVCAttributeAuth = (o) => (o is System.Web.Mvc.IAuthorizationFilter || o is System.Web.Mvc.AllowAnonymousAttribute);
        Func<object, bool> IsAPIAttributeAuth = (o) => (o is System.Web.Http.Filters.IAuthorizationFilter || o is System.Web.Http.AllowAnonymousAttribute);

        [Test]
        public void AllMvcActionsHaveExplicitAuthorizationDefined()
        {
            var controllers = Assembly.GetAssembly(typeof(HomeController)).GetTypes()
                                      .Where(t => typeof(IController).IsAssignableFrom(t))
                                      .Select(c => new ReflectedControllerDescriptor(c));

            var actionsMissingAuth = controllers.SelectMany(c => c.GetCanonicalActions())
                                                .Where(a => !a.GetCustomAttributes(true).Any(ca => IsMVCAttributeAuth(ca)));

            if (actionsMissingAuth.Any())
            {
                var errorStrings = actionsMissingAuth.Select(a => String.Format("{0}.{1}", a.ControllerDescriptor.ControllerType.Name, a.ActionName));
                Assert.Fail(String.Format("{0} action(s) do not have explicit authorization: {1}",
                                          errorStrings.Count(),
                                          String.Join(",", errorStrings)));
            }
        }

        [Test]
        public void AllMvcActionsHaveExplicitAuthorizationDefined_UsingStandardReflection()
        {
            var actionsMissingAuth = new List<string>();

            var controllers = Assembly.GetAssembly(typeof(HomeController)).GetTypes()
                                      .Where(t => typeof(IController).IsAssignableFrom(t));

            foreach (var controller in controllers)
            {
                // if the controller has it, all it's actions are covered also
                if (controller.GetCustomAttributes().Any(a => IsMVCAttributeAuth(a)))
                    continue;

                var actions = controller.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public);
                foreach (var action in actions)
                {
                    // if the action has a defined authorization filter, it's covered
                    if (action.GetCustomAttributes().Any(a => IsMVCAttributeAuth(a)))
                        continue;

                    // no controller or action defined, add it to the list
                    actionsMissingAuth.Add(String.Format("{0}.{1}", controller.Name, action.Name));
                }
            }

            if (actionsMissingAuth.Any())
            {
                Assert.Fail(String.Format("{0} action(s) do not have explicit authorization: {1}",
                                          actionsMissingAuth.Count,
                                          String.Join(",", actionsMissingAuth)));
            }
        }

        [Test]
        public void AllApiActionsHaveExplicitAuthorizationDefined()
        {
            var httpConfiguration = new HttpConfiguration();
            WebApiConfig.Register(httpConfiguration);
            httpConfiguration.EnsureInitialized();
            var explorer = httpConfiguration.Services.GetApiExplorer();

            var actionsMissingAuth = explorer.ApiDescriptions.Where(a => !a.ActionDescriptor.GetCustomAttributes<object>()
                                                                                            .Any(o => IsAPIAttributeAuth(o)));

            if (actionsMissingAuth.Any())
            {
                var errorStrings = actionsMissingAuth.Select(a => String.Format("{0}.{1}",
                                                                                 a.ActionDescriptor.ControllerDescriptor.ControllerType.Name,                                                                                 
                                                                                 a.ActionDescriptor.ActionName));
                Assert.Fail(String.Format("{0} action(s) do not have explicit authorization: {1}",
                                          errorStrings.Count(),
                                          String.Join(",", errorStrings)));
            }
        }

    }
}
