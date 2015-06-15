using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using System.Web.Http.Hosting;
using System.Web.Http;
using System.Net;
using System.Web.Http.Results;
using Newtonsoft.Json.Linq;
using Reservas.Controllers;
using System.Threading.Tasks;
using Reservas.Models.Flights;
using System.Collections.Generic;

namespace Reservas.Tests
{
	[TestClass]
	public class UnitTest
	{
		[TestMethod]
		public void CSharp_GetHotels()
		{
			#region Initial

			var apiController = new HotelsController();
			apiController.serverUri = "http://engine.hotellook.com";
			apiController.Request = new HttpRequestMessage();
			apiController.Configuration = new HttpConfiguration();

			#endregion

			var httpResponse = apiController.GetSearch("MOW", DateTime.Now.AddDays(3).ToString("yyyy-MM-dd"), DateTime.Now.AddDays(10).ToString("yyyy-MM-dd"), "ru");
			Assert.IsNotNull(httpResponse);

			var httpResponseTask = Task.FromResult(httpResponse);
		}

		[TestMethod]
		public void CSharp_GetSpecialOffers()
		{
			#region Initial

			var apiController = new FlightsController();
			apiController.serverUri = "http://api.travelpayouts.com";
			apiController.Request = new HttpRequestMessage();
			apiController.Request.SetConfiguration(new HttpConfiguration());

			#endregion

			var httpResponse = apiController.GetSpecialOffers(string.Empty, 12);
			Assert.IsNotNull(httpResponse);
			Assert.AreEqual(HttpStatusCode.OK, httpResponse.StatusCode);

			IEnumerable<SpecialOfferModel> specialOffers = new List<SpecialOfferModel>();
			Assert.IsTrue(httpResponse.TryGetContentValue<IEnumerable<SpecialOfferModel>>(out specialOffers));
		}
	}
}