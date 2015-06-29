/// <reference path="../../../Reference.ts" />
/// <reference path='../../../Services/DataService.ts' />

'use strict';

module Controllers {

	export interface IFlightsControllerScope extends angular.IScope {
	}

	export class FlightsController {
		public static $inject: Array<string> = ['$scope'];
		public constructor(public $scope: IFlightsControllerScope) {
		}
	}

	Main.App.Controllers.controller('Flights.IndexCtrl', FlightsController);

}