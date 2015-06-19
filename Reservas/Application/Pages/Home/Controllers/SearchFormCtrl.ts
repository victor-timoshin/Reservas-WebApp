/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Services/DataService.ts' />

'use strict';

module Controllers {

	export interface ISearchFormControllerScope extends angular.IScope {
		executeSearch: (submit: any) => any;
	}

	export class SearchFormController {
		public static $inject: Array<string> = ['$scope', '$filter', '$location', 'dataService'];
		public constructor($scope: ISearchFormControllerScope, $filter: angular.IFilterService, $location: angular.ILocationService, dataService: Services.DataService) {

			var self = this;

			$scope.executeSearch = function (form) {
				console.log(form);
			}
		}
	}

	Main.App.Controllers.controller('SearchFormCtrl', SearchFormController);

}