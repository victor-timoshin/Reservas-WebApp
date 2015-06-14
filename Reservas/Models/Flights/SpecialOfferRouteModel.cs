using System.Xml.Linq;

namespace Reservas.Models.Flights
{
	public class SpecialOfferRouteModel
	{
		#region Constructors

		public SpecialOfferRouteModel(XElement item)
		{
			tripClass = Utils.XMLAttributeToStr(item, "class");
			from_iata = Utils.XMLAttributeToStr(item, "from_iata");
			from_name = Utils.XMLAttributeToStr(item, "from_name");
			onewayPrice = Utils.XMLAttributeToStr(item, "oneway_price");
			roundtripPrice = Utils.XMLAttributeToStr(item, "roundtrip_price");
			to_iata = Utils.XMLAttributeToStr(item, "to_iata");
			to_name = Utils.XMLAttributeToStr(item, "to_name");
		}

		#endregion

		public string tripClass { get; set; }
		public string from_iata { get; set; }
		public string from_name { get; set; }
		public string onewayPrice { get; set; }
		public string roundtripPrice { get; set; }
		public string to_iata { get; set; }
		public string to_name { get; set; }
	}
}