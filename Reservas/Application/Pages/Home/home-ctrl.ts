/// <reference path='../../reference.ts' />
/// <reference path='../../main.ts' />

'use strict';

module Controllers {

	export interface IHomeControllerScope extends angular.IScope {
	}

	export class HomeController {
		public static $inject: Array<string> = ['$scope'];
		public constructor(private $scope: IHomeControllerScope) {
		}
	}

	Main.App.Controllers.controller('HomeCtrl', HomeController);

}