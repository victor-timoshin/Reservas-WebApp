/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Services/DataService.ts' />
/// <reference path='../../../Pages/Hotels/Models/SearchDataModel.ts' />

'use strict';

module App.Hotels.Controllers {

	export interface ISearchFormControllerScope extends angular.IScope {
		searchData: App.Hotels.Models.SearchDataModel;
		autocompleteOptions: any;

		events: any;
	}

	export class SearchFormController {
		public static $inject: Array<string> = ['$scope', '$rootScope', '$filter', '$location', 'dataService'];
		public constructor(
			public $scope: ISearchFormControllerScope,
			public $rootScope: angular.IRootScopeService,
			public $filter: angular.IFilterService,
			public $location: angular.ILocationService,
			public dataService: Services.DataService) {

			var self = this;
			var dateToday = new Date($.now());

			self.$scope.searchData = new App.Hotels.Models.SearchDataModel();

			angular.copy({
				iata: 'MOW',
				check_in: '2015-06-28',
				check_out: '2015-07-18',
				adults_count: 1,
				children_count: 0
			}, self.$scope.searchData);

			$scope.events = {
				executeQuery: function (form) {
					if (form.$valid) {
						$location.path('/hotels/' + _.values(self.$scope.searchData).join('').replace(/\-/g, ''));
					}
					else {
					}
				},
				reset: function () {
				}
			}
		}
	}

	Main.App.Controllers.controller('Hotels.SearchFormCtrl', SearchFormController);

}