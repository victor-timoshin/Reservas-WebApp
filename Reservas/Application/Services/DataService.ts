/// <reference path='../Reference.ts' />
/// <reference path='../Utils.ts' />

/// <reference path='../Pages/Home/Models/SpecialOfferModel.ts' />

'use strict';

module Services {

	export class DataService {
		public static $inject: Array<string> = ['$http', '$q'/*, '$cookies'*/, '$log'];

		private httpService: angular.IHttpService;
		private qService: angular.IQService;
		private logService: angular.ILogService;
		private lang: string;

		public static Factory($http: angular.IHttpService, $q: angular.IQService/*, $cookies: any*/, $log: angular.ILogService) {
			return new DataService($http, $q/*, $cookies*/, $log);
		}

		public constructor($http: angular.IHttpService, $q: angular.IQService/*, $cookies: any*/, $log: angular.ILogService) {
			this.httpService = $http;
			this.qService = $q;
			this.logService = $log;

			//this.lang = $cookies.__APPLICATION_LANGUAGE;
		}

		private getDataFromBackend<T>(url: string, params?: any): angular.IPromise<T> {
			var defer = this.qService.defer();
			this.httpService.get(url, {
				params: params
			}).then(
				(successCallback: angular.IHttpPromiseCallbackArg<any>) => { defer.resolve(successCallback.data); },
				(errorCallback: angular.IHttpPromiseCallbackArg<any>) => { defer.reject(errorCallback.statusText); });

			return defer.promise;
		}

		/**
		 * Get special offers from airlines.
		 *
		 * @param airlineCode {string} IATA code of the airline operating the flight.
		 * @param limit {number} Records limit per page.
		 */
		public getSpecialOffers(airlineCode: string, limit: number, successCallback: Function): void {
			var url: string = '';
			this.getDataFromBackend<Array<SpecialOfferModel>>(url.format('/Api/Flights/GetSpecialOffers?airlineCode={0}&limit={1}', airlineCode, limit)).then(function (offers) {
				successCallback(offers);
			});
		}

		public getHotels(iata: string, checkIn: string, checkOut: string, successCallback: Function): angular.IPromise<any> {
			var url: string = '';
			return this.getDataFromBackend<any>(url.format('/Api/hotels/GetSearch?iata={0}&checkIn={1}&checkOut={2}&lang={3}', iata, checkIn, checkOut, this.lang)).then(function (resourceData) {
				successCallback(resourceData.result);
			});
		}
	}

	Main.App.Services.factory('dataService', DataService.Factory);

}