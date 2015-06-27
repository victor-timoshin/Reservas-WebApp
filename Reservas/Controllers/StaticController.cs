using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Reservas.Models.Static;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Reservas.Controllers
{
	public class StaticController : ApiController
	{
		[HttpGet]
		public HttpResponseMessage Autocomplete(string name = "", string translation = "ru")
		{
			string[] translations = new string[] { "de", "en", "zh-CN", "tr", "ru", "it", "es", "fr", "th" };
			if (!translations.Contains(translation))
				throw new HttpResponseException(HttpStatusCode.NotFound);

			IList<AutocompleteModel> autocomplete = new List<AutocompleteModel>();
			IList<CityModel> cities = new List<CityModel>();
			IList<CountryModel> countries = new List<CountryModel>();

			using (StreamReader streamReader = new StreamReader(HttpContext.Current.Server.MapPath("~/Assets/Json/cities.json")))
			{
				dynamic array = (JArray)JsonConvert.DeserializeObject(streamReader.ReadToEnd());
				if (array == null)
					throw new HttpResponseException(HttpStatusCode.NotFound);

				foreach (var item in array)
				{
					if (!string.IsNullOrWhiteSpace((string)item.name_translations[translation]))
					{
						autocomplete.Add(new AutocompleteModel
						{
							code = item.code,
							name = item.name_translations[translation],
							coordinates = (item.coordinates != null) ? item.coordinates.lon + ":" + item.coordinates.lat : null,
							timeZone = item.time_zone,
							countryCode = item.country_code
						});
					}
				}

				if (!string.IsNullOrEmpty(name))
					autocomplete = autocomplete.Where(item => item.name.ToLower().StartsWith(name.ToLower())).Select(city => city).ToList();
			}

			using (StreamReader streamReader = new StreamReader(HttpContext.Current.Server.MapPath("~/Assets/Json/countries.json")))
			{
				dynamic array = (JArray)JsonConvert.DeserializeObject(streamReader.ReadToEnd());
				if (array == null)
					throw new HttpResponseException(HttpStatusCode.NotFound);

				for (var autocompleteIndex = 0; autocompleteIndex < autocomplete.Count(); autocompleteIndex++)
				{
					foreach (var item in array)
					{
						if (autocomplete[autocompleteIndex].countryCode == (string)item.code)
						{
							autocomplete[autocompleteIndex].countryCode = item.code;
							autocomplete[autocompleteIndex].countryName = item.name_translations[translation];
							autocomplete[autocompleteIndex].currency = item.currency;
						}
					}
				}
			}

			return Request.CreateResponse<IList<AutocompleteModel>>(HttpStatusCode.OK, autocomplete);
		}
	}
}