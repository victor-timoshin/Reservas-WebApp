/// <reference path='../../reference.ts' />
/// <reference path='../../main.ts' />

'use strict';

module Contrillers {

	export interface ILayoutControllerScope extends angular.IScope {
		menuClass: (string) => string;
	}

	export class LayoutController {
		public static $inject: Array<string> = ['$scope', '$route', '$routeParams', '$location', '$cookies', '$translate'];
		public constructor(
			private $scope: ILayoutControllerScope,
			private $route: angular.route.IRouteService,
			private $routeParams: angular.route.IRouteParamsService,
			private $location: angular.ILocationService,
			private $cookies: any,
			private $translate: angular.translate.ITranslateService) {

			var lang = this.$cookies.__APPLICATION_LANGUAGE || 'ru';
			this.$cookies.__APPLICATION_LANGUAGE = lang;

			$scope.menuClass = function (page) {
				var current = $location.path().substring(1);
				return page === current ? 'active' : '';
			};
		}
	}

	Main.App.Controllers.controller('LayoutCtrl', LayoutController);
}