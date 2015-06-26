/// <reference path='RoomOptionsModel.ts' />

'use strict';

module App.Hotels.Models {

	export class RoomModel {
		public agencyId: string;
		public agencyName: string;
		public bookingURL: string;
		public fullBookingURL: string;
		public internalTypeId: string;
		public type: string;
		public desc: string;
		public total: number;
		public price: number;
		public tax: number;
		public options: RoomOptionsModel;
	}

}