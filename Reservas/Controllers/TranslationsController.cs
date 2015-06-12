using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Globalization;
using System.Reflection;
using System.Resources;
using System.Threading.Tasks;
using System.Web.Http;

namespace Reservas.Controllers
{
	public class TranslationsController : ApiController
	{
		public IHttpActionResult Get(string lang)
		{
			var resourceObject = new JObject();

			string[] names = AppResourcesAssembly.GetManifestResourceNames();
			string resource = names[0];
			string baseName = resource.Substring(0, resource.LastIndexOf('.'));

			ResourceManager resourceManager = new ResourceManager(baseName, AppResourcesAssembly);
			ResourceSet resourceSet = resourceManager.GetResourceSet(new CultureInfo(lang), true, true);

			IDictionaryEnumerator enumerator = resourceSet.GetEnumerator();
			while (enumerator.MoveNext())
				resourceObject.Add(enumerator.Key.ToString(), enumerator.Value.ToString());

			return Ok(resourceObject);
		}

		protected virtual Assembly AppResourcesAssembly
		{
			get
			{
				Type type = typeof(System.Web.Compilation.BuildManager);
				PropertyInfo propertyInfo = type.GetProperty("AppResourcesAssembly", BindingFlags.Static | BindingFlags.GetField | BindingFlags.NonPublic);
				return propertyInfo.GetValue(null, null) as Assembly;
			}
		}
	}
}