/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Main.ts' />

'use strict';

module Controllers {

	export interface IHomeControllerScope extends angular.IScope {
	}

	export class HomeController {
		public static $inject: Array<string> = ['$scope', '$location'];
		public constructor($scope: IHomeControllerScope, $location: angular.ILocationService) {
		}
	}

	Main.App.Controllers.controller('Home.IndexCtrl', HomeController);

}