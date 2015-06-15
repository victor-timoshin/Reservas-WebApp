using System.Xml.Linq;

namespace Reservas.Models.Flights
{
	public class SpecialOfferModel
	{
		#region Constructors

		/// <summary>
		/// Class constructor with parameters
		/// </summary>
		/// <param name="item"></param>
		/// <param name="xnamespace"></param>
		public SpecialOfferModel(XElement item, XNamespace xnamespace)
		{
			id = Utils.XMLAttributeToInt(item, "id");
			airline = Utils.XMLAttributeToStr(item, "airline");
			airlineCode = Utils.XMLAttributeToStr(item, "airline_code");
			conditions = Utils.XMLAttributeToStr(item, "conditions");
			title = Utils.XMLAttributeToStr(item, "title");
			description = Utils.XMLAttributeToStr(item, "description");
			saleDateBegin = Utils.XMLAttributeToInt(item, "sale_date_begin");
			saleDateEnd = Utils.XMLAttributeToInt(item, "sale_date_end");
			flightDateBegin = Utils.XMLAttributeToInt(item, "flight_date_begin");
			flightDateEnd = Utils.XMLAttributeToInt(item, "flight_date_end");
			href = Utils.XMLAttributeToStr(item, "href");
			link = Utils.XMLAttributeToStr(item, "link");

			route = new SpecialOfferRouteModel(item.Element(xnamespace + "route"));
		}

		#endregion

		public int id { get; set; }
		public string airline { get; set; }
		public string airlineCode { get; set; }
		public string conditions { get; set; }
		public string title { get; set; }
		public string description { get; set; }
		public int saleDateBegin { get; set; }
		public int saleDateEnd { get; set; }
		public int flightDateBegin { get; set; }
		public int flightDateEnd { get; set; }
		public string href { get; set; }
		public string link { get; set; }

		public SpecialOfferRouteModel route { get; set; }
	}

	public static class Utils
	{
		#region XML

		public static string XMLAttributeToStr(XElement element, string name)
		{
			return (element.Attribute(name) != null) ? (string)element.Attribute(name) : string.Empty;
		}

		public static int XMLAttributeToInt(XElement element, string name)
		{
			return (element.Attribute(name) != null) ? (int)element.Attribute(name) : 0;
		}

		#endregion

	}
}