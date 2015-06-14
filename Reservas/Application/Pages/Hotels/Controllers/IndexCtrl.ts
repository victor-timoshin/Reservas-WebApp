/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Services/DataService.ts' />

'use strict';

module Controllers {

	export interface IHotelsControllerScope extends angular.IScope {
	}

	export class HotelsControllers {
		public static $inject: Array<string> = ['$scope'];
		public constructor() {
		}
	}

	Main.App.Controllers.controller('Hotels.IndexCtrl', HotelsControllers);
}