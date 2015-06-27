/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Services/DataService.ts' />
/// <reference path='../../../Pages/Home/Models/SearchDataModel.ts' />

'use strict';

module App.Hotels.Controllers {

	export interface ISearchFormControllerScope extends angular.IScope {
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
						$location.path('/hotels/' + _.values({
							iata: 'MOW',
							check_in: '2015-06-28',
							check_out: '2015-07-18',
							adults_count: '1',
							children_count: '0'
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

	Main.App.Controllers.controller('Hotels.SearchFormCtrl', SearchFormController);

}