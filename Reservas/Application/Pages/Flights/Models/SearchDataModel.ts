'use strict';

module App.Flights.Models {

	export class SearchDataModel {
		public src: string;
		public dst: string;
		public date_out: string;
		public date_in: string;
		public adult_num: number;
		public child_num: number;
		public infant_num: number;
		public service_class: number;
		public direct: number;
	}

}