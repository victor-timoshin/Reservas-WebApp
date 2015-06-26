/// <reference path='RoomModel.ts' />
/// <reference path='LocationModel.ts' />

'use strict';

module App.Hotels.Models {

	export class HotelModel {
		public id: number;
		public name: string;
		public fullUrl: string;
		public price: number;
		public maxPrice: number;
		public maxPricePerNight: number;
		public minPriceTotal: number;
		public photoCount: number;
		public amenities: Array<number>;
		public address: string;
		public distance: number;
		public location: LocationModel;
		public url: string;
		public rooms: Array<RoomModel>;
		public bookingURL: string;
		public fullBookingURL: string;
		public internalTypeId: string;
		public agencyId: string;
		public agencyName: string;
		public stars: number;
		public rating: number;
		public guestScore: number;
		public popularity: number;

		public visible: boolean = true;
	}
}