/// <reference path='../../../Reference.ts' />
/// <reference path='../../BaseController.ts' />
/// <reference path='../ViewModels/DetailViewModel.ts' />
/// <reference path='../FetcherService.ts' />

'use strict';

module App.Hotels.Controllers {

	export interface IDetailController {
		amenities: Array<any>;
		roomTypes: Array<any>;
	}

	export interface IDetailControllerScope extends angular.IScope {
		fetcherService: App.Hotels.FetcherService;
	}

	export class DetailController extends Main.Controllers.BaseController<ViewModels.DetailViewModel> implements IDetailController {
		public static $inject: Array<string> = ['$scope', 'hotels.fetcherService'];

		public amenities: Array<any>;
		public roomTypes: Array<any>;

		public constructor(
			public $scope: IDetailControllerScope,
			public fetcherService: App.Hotels.FetcherService) {

			super($scope, ViewModels.DetailViewModel);
			var self = this;

			$scope.fetcherService = fetcherService;

			$scope.$watch('fetcherService.selected', function (newValue, oldValue) {
				if (newValue != oldValue) {
					self.viewModel.details = $scope.fetcherService.selected;
				}
			});
		}
	}

	Main.App.Controllers.controller('Hotels.DetailCtrl', DetailController);
}