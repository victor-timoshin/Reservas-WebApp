/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Services/DataService.ts' />
/// <reference path='../../../Pages/Flights/Models/SearchDataModel.ts' />

'use strict';

module App.Flights.Controllers {

	export interface ISearchFormControllerScope extends angular.IScope {
		complexity: any;
		searchData: App.Flights.Models.SearchDataModel;
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

			self.$scope.complexity = { value: 'roundtrip' };
			self.$scope.searchData = new App.Flights.Models.SearchDataModel();

			angular.copy({
				src: 'LED',
				dst: 'MOW',
				date_out: '2015-06-28',
				date_in: '2015-07-18',
				adult_num: 1,
				child_num: 0,
				infant_num: 0,
				service_class: 0,
				direct: 0
			}, self.$scope.searchData);

			$scope.events = {
				executeQuery: function (form) {
					if (form.$valid) {
						switch ($scope.complexity) {
							case 'oneway':
								break;

							case 'roundtrip':
								break;

							case 'multicity':
								break;
						}

						$location.path('/flights/' + _.values(self.$scope.searchData).join('').replace(/\-/g, ''));
					}
					else {
					}
				},
				reset: function () {
				}
			}
		}
	}

	Main.App.Controllers.controller('Flights.SearchFormCtrl', SearchFormController);

}