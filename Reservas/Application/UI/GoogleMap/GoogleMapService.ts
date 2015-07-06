/// <reference path='../../Reference.ts' />
/// <reference path='../../../Assets/Typings/GoogleMap/google.maps.d.ts' />

'use strict';

module App.UI {

	export class GoogleMapService {
		private rootScope: angular.IRootScopeService;
		private window: Window;
		private q: angular.IQService;

		private mapOptions: google.maps.MapOptions;
		private mapInstance: google.maps.Map;
		private markers: Array<google.maps.Marker> = [];
		private selectedMarkerIdx: number = null;

		public static Factory($rootScope: angular.IRootScopeService, $window: Window, $q: angular.IQService) {
			return new GoogleMapService($rootScope, $window, $q);
		}

		public constructor($rootScope: angular.IRootScopeService, $window: Window, $q: angular.IQService) {
			this.rootScope = $rootScope;
			this.window = $window;
			this.q = $q;
		}

		public isLoaded(): boolean {
			return angular.isDefined(this.window['google'])
				&& angular.isDefined(this.window['google'].maps);
		}

		public loadScript() {
			var deferred = this.q.defer();
			var script: HTMLScriptElement = document.createElement('script');
			this.window['initMap'] = function () {
				deferred.resolve();
			}
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=initMap';

			document.head.appendChild(script);

			return deferred.promise;
		}

		public initialize(element: HTMLElement, options: GoogleMapOptions): void {
			var defaultStyles = [
				{
					stylers: [
						{ hue: '#d5c288' },
						{ saturation: -30 },
						{ lightness: 30 },
						{
							featureType: 'landscape.man_made',
							stylers: [{ visibility: 'on' }]
						}
					]
				}, {
					featureType: 'road',
					elementType: 'geometry',
					stylers: [
						{ lightness: 50 },
						{ saturation: 0 },
						{ visibility: 'simplified' }
					]
				}, {
					featureType: 'road',
					elementType: 'labels',
					stylers: [
						{ visibility: 'on' }
					]
				}
			];

			var mapOptions = {
				center: new google.maps.LatLng(options.geometry.location.latitude, options.geometry.location.longitude),
				zoom: options.zoom,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
				disableDefaultUI: true,
				styles: <any>defaultStyles
			};

			this.mapInstance = new google.maps.Map(element, mapOptions);
			this.mapInstance.setTilt(45);
		}

		public getGeocode(zipCode: string, callback: Function) {
			new google.maps.Geocoder().geocode({ address: zipCode }, function (results, status) {
				callback(results, status);
			});
		}

		public placeMarkers(data: Array<App.UI.GoogleMapOptions>) {
			var self = this;
			var bounds = new google.maps.LatLngBounds();

			self.clearAllMarkers();

			angular.forEach(data, function (item: App.UI.GoogleMapOptions, key: number) {
				var position = new google.maps.LatLng(item.geometry.location.latitude, item.geometry.location.longitude);
				var currentMarker;

				self.markers.push(currentMarker = new google.maps.Marker({
					map: self.mapInstance,
					position: position,
					animation: google.maps.Animation.DROP,
					icon: item.icon,
					title: item.iconTitle
				}));

				bounds.extend(position);

				google.maps.event.addListener(currentMarker, 'click', function () {
					self.selectedMarkerIdx = key;
					self.rootScope.$apply();
				});
			});

			self.mapInstance.fitBounds(bounds);
		}

		public clearAllMarkers(): void {
			angular.forEach(this.markers, function (item, key) {
				item.setMap(null);
			});

			this.markers = [];
		}

		public zoomToMarker(idx: number): void {
			var position = this.markers[idx].getPosition();

			this.mapInstance.setCenter(position);
			this.mapInstance.setZoom(16);
		}
	}

	Main.App.Services.factory('mapService', ['$rootScope', '$window', '$q', GoogleMapService.Factory]);

}