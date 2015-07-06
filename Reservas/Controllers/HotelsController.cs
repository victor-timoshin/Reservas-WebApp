using HttpWebRequestHelpers;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Reservas.Controllers
{
	public class HotelsController : ApiController
	{
		public string serverUri = ConfigurationManager.AppSettings["API:HOTELS:ROOT_URL"];

		public static string Formatted(string dateTimeStr, string dateTimeFormat)
		{
			System.Globalization.CultureInfo cultureInfo = System.Globalization.CultureInfo.InvariantCulture;

			DateTime outputDateTime;
			if (DateTime.TryParseExact(dateTimeStr, dateTimeFormat, cultureInfo, System.Globalization.DateTimeStyles.None, out outputDateTime))
				return outputDateTime.ToString("yyyy-MM-dd", cultureInfo);

			return string.Empty;
		}

		[HttpGet]
		public async Task<HttpResponseMessage> GetSearch(string iata, string checkIn, string checkOut, int adultsCount, int childrenCount, string lang)
		{
			Dictionary<string, string> dictionary = new Dictionary<string, string>();
			dictionary.Add("iata", iata);
			dictionary.Add("checkIn", Formatted(checkIn, "yyyyMMdd"));
			dictionary.Add("checkOut", Formatted(checkOut, "yyyyMMdd"));
			dictionary.Add("adultsCount", adultsCount.ToString());
			dictionary.Add("childrenCount", childrenCount.ToString());
			dictionary.Add("lang", lang);
			dictionary.Add("currency", "RUB");
			dictionary.Add("timeout", "20");
			dictionary.Add("waitForResult", "0");

			List<KeyValuePair<string, string>> dictionaryList = dictionary.ToList();
			dictionaryList.Sort((firstPair, nextPair) =>
			{
				return firstPair.Key.CompareTo(nextPair.Key);
			});

			string signature = ConfigurationManager.AppSettings["API:TOKEN"] + ":" + ConfigurationManager.AppSettings["API:MARKER"];
			foreach (var item in dictionaryList)
				signature = signature + ":" + item.Value.ToString();

			MD5 md5 = new MD5CryptoServiceProvider();
			Byte[] originalBytes = ASCIIEncoding.Default.GetBytes(signature);
			Byte[] encodedBytes = md5.ComputeHash(originalBytes);

			string signatureData = BitConverter.ToString(encodedBytes).Replace("-", "").ToLower();

			string str = "";
			str = str + "iata=" + dictionary["iata"] + "&";
			str = str + "checkIn=" + dictionary["checkIn"] + "&";
			str = str + "checkOut=" + dictionary["checkOut"] + "&";
			str = str + "adultsCount=" + dictionary["adultsCount"] + "&";
			str = str + "childrenCount=" + dictionary["childrenCount"] + "&";
			str = str + "lang=" + dictionary["lang"] + "&";
			str = str + "currency=" + dictionary["currency"] + "&";
			str = str + "timeout=" + dictionary["timeout"] + "&";
			str = str + "waitForResult=" + dictionary["waitForResult"] + "&";
			str = str + "marker=" + ConfigurationManager.AppSettings["API:MARKER"] + "&";
			str = str + "signature=" + signatureData;

			dynamic accessData = JsonRequestHelper.GetObjectRest<dynamic>(serverUri, string.Format("api/v2/search/start.json?{0}", str));

			string searchId = (string)accessData.searchId;

			Dictionary<string, string> dictionaryTest = new Dictionary<string, string>();
			dictionaryTest.Add("searchId", searchId);
			dictionaryTest.Add("limit", "10");
			dictionaryTest.Add("sortBy", "price");
			dictionaryTest.Add("sortAsc", "1");

			List<KeyValuePair<string, string>> dictionaryListTest = dictionaryTest.ToList();
			dictionaryListTest.Sort((firstPair, nextPair) =>
			{
				return firstPair.Key.CompareTo(nextPair.Key);
			});

			string signatureTest = ConfigurationManager.AppSettings["API:TOKEN"] + ":" + ConfigurationManager.AppSettings["API:MARKER"];
			foreach (var item in dictionaryListTest)
				signatureTest = signatureTest + ":" + item.Value.ToString();

			MD5 md5Test = new MD5CryptoServiceProvider();
			Byte[] originalBytesTest = ASCIIEncoding.Default.GetBytes(signatureTest);
			Byte[] encodedBytesTest = md5Test.ComputeHash(originalBytesTest);

			string signatureDataTest = BitConverter.ToString(encodedBytesTest).Replace("-", "").ToLower();

			dynamic data = await JsonRequestHelper.GetObjectRestAsync<dynamic>(serverUri, string.Format("api/v2/search/getResult.json?searchId={0}&limit=10&sortBy=price&sortAsc=1&marker={1}&signature={2}", searchId, ConfigurationManager.AppSettings["API:MARKER"], signatureDataTest));

			if (data == null)
				return Request.CreateResponse(HttpStatusCode.NotFound);

			return Request.CreateResponse(HttpStatusCode.OK, data as object);
		}
	}
}