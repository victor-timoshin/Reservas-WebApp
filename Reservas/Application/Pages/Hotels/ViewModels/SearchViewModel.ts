/// <reference path='../Models/HotelModel.ts' />

'use strict';

module App.Hotels.ViewModels {

	export class SearchViewModel {
		public listHotels: Array<Hotels.Models.HotelModel>;
		public selectedHotel: Hotels.Models.HotelModel;

		public constructor() {
			this.listHotels = [];
			this.selectedHotel = null;
		}

		public setSelectedHotel(hotelKey: number): void {
			this.selectedHotel = this.listHotels[hotelKey];
		}
	}

}