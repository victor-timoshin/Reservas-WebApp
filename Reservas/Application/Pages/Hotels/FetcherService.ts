/// <reference path='../../Reference.ts' />
/// <reference path='Models/HotelModel.ts' />

'use strict';

module App.Hotels {

	export class FetcherService {

		public hotels: Array<Hotels.Models.HotelModel>;
		public selected: Hotels.Models.HotelModel;

		public constructor() {
		}
	}

	Main.App.Services.service('hotels.fetcherService', FetcherService);

}