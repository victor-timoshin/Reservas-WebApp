/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Main.ts' />

'use strict';

module Controllers {

	export interface ILayoutControllerScope extends angular.IScope {
		usefulClass: (pages: Array<string>, className: string) => string;
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

			$scope.usefulClass = function (pages: Array<string>, className: string) {
				var current = $location.path().substring(1);
				for (var i = 0; i < pages.length; ++i) {
					if (pages[i] === current.substr(0, current.lastIndexOf('/'))) {
						return className;
					}
				}

				return '';
			};
		}
	}

	Main.App.Controllers.controller('LayoutCtrl', LayoutController);

}