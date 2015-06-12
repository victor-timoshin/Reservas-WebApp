using System.Globalization;
using System.Threading;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Reservas
{
	public class MvcApplication : System.Web.HttpApplication
	{
		protected void Application_Start()
		{
			AreaRegistration.RegisterAllAreas();
			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			GlobalConfiguration.Configure(WebApiConfig.Register);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
			BundleConfig.RegisterBundles(BundleTable.Bundles);
		}

		protected void Application_BeginRequest()
		{
			string lang = "en";

			var cookie = Request.Cookies.Get("__APPLICATION_LANGUAGE");
			if (cookie != null) lang = cookie.Value;

			Thread.CurrentThread.CurrentCulture = new CultureInfo(lang);
			Thread.CurrentThread.CurrentUICulture = new CultureInfo(lang);
		}
	}
}