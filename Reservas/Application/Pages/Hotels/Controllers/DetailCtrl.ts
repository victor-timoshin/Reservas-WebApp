/// <reference path='../../../Reference.ts' />
/// <reference path='../../BaseController.ts' />
/// <reference path='../ViewModels/DetailViewModel.ts' />

'use strict';

module App.Hotels.Controllers {

	export interface IDetailController {
		amenities: Array<any>;
		roomTypes: Array<any>;
	}

	export interface IDetailControllerScope extends angular.IScope {
	}

	export class DetailController extends Main.Controllers.BaseController<ViewModels.DetailViewModel> implements IDetailController {
		public static $inject: Array<string> = ['$scope'];

		public amenities: Array<any>;
		public roomTypes: Array<any>;

		public constructor(public $scope: IDetailControllerScope) {

			super($scope, ViewModels.DetailViewModel);
		}
	}

	Main.App.Controllers.controller('Hotels.DetailCtrl', DetailController);
}