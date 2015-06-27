/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Services/DataService.ts' />
/// <reference path='../../../Pages/Home/Models/SearchDataModel.ts' />

'use strict';

module App.Flights.Controllers {

	export interface ISearchFormControllerScope extends angular.IScope {
		complexity: any;
		searchData: App.Models.SearchDataModel;
		autocompleteOptions: any;

		events: any;
	}

	export class SearchFormController {
		public static $inject: Array<string> = ['$scope', '$rootScope', '$filter', '$location', 'dataService'];
		public constructor(
			private $scope: ISearchFormControllerScope,
			private $rootScope: angular.IRootScopeService,
			private $filter: angular.IFilterService,
			private $location: angular.ILocationService,
			private dataService: Services.DataService) {

			var self = this;
			var dateToday = new Date($.now());

			self.$scope.complexity = { value: 'roundtrip' };
			self.$scope.searchData = new App.Models.SearchDataModel();

			angular.copy({
				origin: '',
				destination: '',
				dateRange: {
					start: {
						value: moment(dateToday).format('YYYY-MM-DD'),
						min: dateToday.getTime(),
						max: dateToday.addDays(3)
					},
					end: {
						value: moment(dateToday).format('YYYY-MM-DD'),
						min: dateToday.getTime(),
						max: dateToday.addDays(3)
					}
				}
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

						$location.path('/flights/' + _.values({
							src: 'LED',
							dst: 'MOW',
							date_out: '2015-06-28',
							date_in: '2015-07-18',
							adult_num: '1',
							child_num: '0',
							infant_num: '0',
							service_class: '0',
							direct: 0
						}).join('').replace(/\-/g, ''));
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