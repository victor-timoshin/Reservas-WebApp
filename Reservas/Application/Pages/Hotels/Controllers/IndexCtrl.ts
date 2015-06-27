/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Services/DataService.ts' />

/// <reference path='../Models/HotelModel.ts' />
/// <reference path='../Models/AmenityModel.ts' />

/// <reference path='../ViewModels/SearchViewModel.ts' />

'use strict';

module Controllers {

	export interface IIndexController {
		amenities: Array<App.Hotels.Models.AmenityModel>;
		roomTypes: Array<any>;
	}

	export interface IHotelsControllerScope extends angular.IScope {
		hotels: Array<App.Hotels.Models.HotelModel>;
	}

	export class HotelsControllers extends Main.Controllers.BaseController<App.Hotels.ViewModels.SearchViewModel> implements IIndexController {
		public static $inject: Array<string> = ['$scope', '$routeParams', 'dataService'];

		public amenities: Array<App.Hotels.Models.AmenityModel>;
		public roomTypes: Array<any>;

		public constructor(
			private $scope: IHotelsControllerScope,
			private $routeParams: angular.route.IRouteParamsService,
			private dataService: Services.DataService) {

			super($scope, App.Hotels.ViewModels.SearchViewModel);
			var self = this;

			dataService.getHotels('MOW', '2015-06-28', '2015-07-18', 1, 0, function (data) {
				self.viewModel.listHotels = data;
			});

		}
	}

	Main.App.Controllers.controller('Hotels.IndexCtrl', HotelsControllers);
}