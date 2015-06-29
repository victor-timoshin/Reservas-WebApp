/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Main.ts' />

'use strict';

module Controllers {

	export interface ILayoutControllerScope extends angular.IScope {
		menuClass: (string) => string;
	}

	export class LayoutController {
		public static $inject: Array<string> = ['$scope', '$route', '$routeParams', '$location', '$cookies', '$translate'];
		public constructor(
			public $scope: ILayoutControllerScope,
			public $route: angular.route.IRouteService,
			public $routeParams: angular.route.IRouteParamsService,
			public $location: angular.ILocationService,
			public $cookies: any,
			public $translate: angular.translate.ITranslateService) {

			var lang = $cookies.__APPLICATION_LANGUAGE || 'ru';
			$cookies.__APPLICATION_LANGUAGE = lang;

			$scope.menuClass = function (page) {
				var current = $location.path().substring(1);
				return page === current ? 'active' : '';
			};
		}
	}

	Main.App.Controllers.controller('LayoutCtrl', LayoutController);

}