/// <reference path='../../../Reference.ts' />
/// <reference path='../../../UI/PageSlide/PageSlideTypes.ts' />
/// <reference path='../../../Services/DataService.ts' />
/// <reference path='../ViewModels/SearchViewModel.ts' />
/// <reference path='../Models/HotelModel.ts' />
/// <reference path='../Models/AmenityModel.ts' />
/// <reference path='../FetcherService.ts' />

'use strict';

module Controllers {

	export interface IIndexController {
		amenities: Array<App.Hotels.Models.AmenityModel>;
		roomTypes: Array<any>;
	}

	export interface IHotelsControllerScope extends angular.IScope {
		dataService: Services.DataService;
		fetcherService: App.Hotels.FetcherService;

		hotels: Array<App.Hotels.Models.HotelModel>;

		checked: App.UI.PageSlideState;
		isSelected: (id: number) => string;
		onShowDetails: (id: number) => void;
		onHideDetails: () => void;
	}

	export class HotelsControllers extends Main.Controllers.BaseController<App.Hotels.ViewModels.SearchViewModel> implements IIndexController {
		public static $inject: Array<string> = ['$scope', '$routeParams', 'dataService', 'hotels.fetcherService'];

		public amenities: Array<App.Hotels.Models.AmenityModel>;
		public roomTypes: Array<any>;

		public constructor(
			public $scope: IHotelsControllerScope,
			public $routeParams: angular.route.IRouteParamsService,
			public dataService: Services.DataService,
			public fetcherService: App.Hotels.FetcherService) {

			super($scope, App.Hotels.ViewModels.SearchViewModel);
			var self = this;

			$scope.dataService = dataService;
			$scope.fetcherService = fetcherService;

			var request: string = $routeParams['q'];

			var iata = request.substr(0, 3),
				checkIn = request.substr(3, 8),
				checkOut = request.substr(11, 8),
				adultsCount = parseInt(request.substr(19, 1)),
				childrenCount = parseInt(request.substr(20));

			$scope.dataService.getHotels(iata, checkIn, checkOut, adultsCount, childrenCount, function (data) {
				self.viewModel.listHotels = data;
				$scope.fetcherService.hotels = data;
			});

			$scope.isSelected = function (id: number): string {
				if (self.viewModel.selectedHotel && $scope.checked === App.UI.PageSlideState.STATE_ACTIVE)
					return self.viewModel.selectedHotel.id === id ? 'selected' : '';
			}

			$scope.onShowDetails = function (id: number): void {
				self.viewModel.setSelectedHotel(id);

				$scope.fetcherService.selected = self.viewModel.selectedHotel;
				$scope.checked = App.UI.PageSlideState.STATE_ACTIVE;
			}

			$scope.onHideDetails = function (): void {
				$scope.checked = App.UI.PageSlideState.STATE_DISABLED;
			}

		}
	}

	Main.App.Controllers.controller('Hotels.IndexCtrl', HotelsControllers);
}