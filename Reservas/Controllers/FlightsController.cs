using HttpWebRequestHelpers;
using Reservas.Models.Flights;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;

namespace Reservas.Controllers
{
	public class FlightsController : ApiController
	{
		public string serverUri = ConfigurationManager.AppSettings["API:FLIGHTS:ROOT_URL"];

		/// <summary>
		/// Get special offers from airlines.
		/// </summary>
		/// <param name="airlineCode">IATA code of the airline operating the flight.</param>
		/// <param name="limit">Records limit per page.</param>
		/// <returns></returns>
		[HttpGet, AcceptVerbs("GET")]
		public HttpResponseMessage GetSpecialOffers(string airlineCode, int limit)
		{
			Dictionary<string, List<SpecialOfferModel>> offers = new Dictionary<string, List<SpecialOfferModel>>();

			var relativePath = "v2/prices/special-offers";
			XDocument document = XmlRequestHelper.GetObjectXML(serverUri, relativePath, ConfigurationManager.AppSettings["API:TOKEN"]);

			XNamespace xnamespace = document.Root.Name.Namespace;
			foreach (XElement item in document.Root.Elements(xnamespace + "offer"))
			{
				SpecialOfferModel model = new SpecialOfferModel(item, xnamespace);

				if (offers.ContainsKey(Utils.XMLAttributeToStr(item, "airline_code")))
					offers[Utils.XMLAttributeToStr(item, "airline_code")].Add(model);
				else
					offers.Add(Utils.XMLAttributeToStr(item, "airline_code"), new List<SpecialOfferModel> { model });
			}

			var finalList = offers.SelectMany(i => i.Value).ToList();

			if (!string.IsNullOrWhiteSpace(airlineCode))
				finalList = finalList.Where(i => i.airlineCode == airlineCode.ToUpper()).ToList();

			return Request.CreateResponse(HttpStatusCode.OK, finalList.Take(limit));
		}
	}
}