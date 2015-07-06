/// <reference path='../../Reference.ts' />
/// <reference path='GoogleMapModel.ts' />

/// <reference path='../../../Assets/Typings/GoogleMap/google.maps.d.ts' />

'use strict';

module App.UI {

	export class GoogleMapDirective implements angular.IDirective {
		public restrict: string;
		public scope: any;
		public link: angular.IDirectiveLinkFn;

		public static Factory() {
			var directive = (mapService: GoogleMapService, $compile: angular.ICompileService) => {
				return new GoogleMapDirective(mapService, $compile);
			}

			directive.$inject = ['mapService'];
			return directive;
		}

		public constructor(mapService: GoogleMapService, $compile: angular.ICompileService) {
			var self = this;
			self.restrict = 'A';
			self.scope = {
				position: '=',
				zoom: '=',
				icon: '=',
				iconTitle: '='
			};
			self.link = (googleMapScope: any, instanceElement: angular.IAugmentedJQuery, instanceAttributes: angular.IAttributes, controller: angular.INgModelController) => {
				var options: GoogleMapOptions = new App.UI.GoogleMapOptions();
				options.geometry = new GoogleMapGeometry();
				options.geometry.location = new GoogleMapLocation();
				options.geometry.location.latitude = googleMapScope.position.latitude;
				options.geometry.location.longitude = googleMapScope.position.longitude;
				options.zoom = googleMapScope.zoom || 4;
				options.icon = googleMapScope.icon;
				options.iconTitle = googleMapScope.iconTitle;

				function resize(): void {
					mapService.initialize(instanceElement[0], options);
					mapService.placeMarkers([{
						geometry: {
							location: {
								latitude: options.geometry.location.latitude,
								longitude: options.geometry.location.longitude
							}
						},
						zoom: options.zoom,
						icon: options.icon,
						iconTitle: options.iconTitle
					}]);
				}

				googleMapScope.$watch('position', function (newValue, oldValue) {
					if (mapService.isLoaded()) {
						resize();
					}
					else {
						mapService.loadScript().then(
							function () {
								if (mapService.isLoaded()) {
									resize();
								} else {
								}
							},
							function () {
							});
					}
				});
			}
		}
	}

	Main.App.Directives.directive('uiGoogleMap', App.UI.GoogleMapDirective.Factory());

}