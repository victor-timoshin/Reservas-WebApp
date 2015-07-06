/// <reference path='../Reference.ts' />
/// <reference path='../Utils.ts' />

/// <reference path='../Pages/Home/Models/SpecialOfferModel.ts' />

'use strict';

module Services {

	export class DataService {
		public static $inject: Array<string> = ['$http', '$q', '$log'];

		private httpService: angular.IHttpService;
		private qService: angular.IQService;
		private logService: angular.ILogService;
		private lang: string;

		public static Factory($http: angular.IHttpService, $q: angular.IQService, $log: angular.ILogService) {
			return new DataService($http, $q, $log);
		}

		public constructor(
			public $http: angular.IHttpService,
			public $q: angular.IQService,
			public $log: angular.ILogService) {

			this.httpService = $http;
			this.qService = $q;
			this.logService = $log;

			this.lang = 'ru';
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

		public getAutocomplete(name: string, lang: string, successCallback: Function): angular.IPromise<any> {
			var url: string = '';
			return this.getDataFromBackend<any>(url.format('/Api/Static/Autocomplete?name={0}&translation={1}', name, lang)).then(function (data) {
				successCallback(data);
			});
		}

		public getHotels(iata: string, checkIn: string, checkOut: string, adultsCount: number, childrenCount: number, successCallback: Function): angular.IPromise<any> {
			var url: string = '';
			return this.getDataFromBackend<any>(url.format('/Api/hotels/GetSearch?iata={0}&checkIn={1}&checkOut={2}&adultsCount={3}&childrenCount={4}&lang={5}', iata, checkIn, checkOut, adultsCount, childrenCount, this.lang)).then(function (resourceData) {
				successCallback(resourceData.result);
			});
		}
	}

	Main.App.Services.factory('dataService', DataService.Factory);

}