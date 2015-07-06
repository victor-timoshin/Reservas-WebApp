'use strict';

module App.UI {

	export class GoogleMapLocation {
		public latitude: number;
		public longitude: number;
	}

	export class GoogleMapGeometry {
		public location: GoogleMapLocation;
	}

	export class GoogleMapOptions {
		public geometry: GoogleMapGeometry;
		public zoom: number;
		public icon: string;
		public iconTitle: string;
	}

}