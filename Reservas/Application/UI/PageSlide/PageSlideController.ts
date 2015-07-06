/// <reference path='../../Reference.ts' />

'use strict';

module App.UI {

	export interface IPageSlideControllerScope extends angular.IScope {
	}

	export class IPageSlideController {
	}

	export class PageSlideController implements IPageSlideController {
		public static $inject: Array<string> = ['$scope'];

		public constructor(private $scope: IPageSlideControllerScope) {
		}
	}

	Main.App.Controllers.controller('PageSlideCtrl', PageSlideController);

}