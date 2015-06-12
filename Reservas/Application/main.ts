/// <reference path='reference.ts' />

'use strict';

module Main {

	var underscore = angular.module('underscore', []);
	underscore.factory('_', ['$window', function ($window: any) {
		return $window._;
	}]);

	export class App {
		public static Filters: angular.IModule = angular.module('app.filters', []);
		public static Directives: angular.IModule = angular.module('app.directives', []);
		public static Constants: angular.IModule = angular.module('app.constants', []);
		public static Services: angular.IModule = angular.module('app.services', []);
		public static Providers: angular.IModule = angular.module('app.providers', ['app.constants']);
		public static Controllers: angular.IModule = angular.module('app.controllers', ['app.services', 'app.providers']);
		public static Module: angular.IModule = angular.module('app', [
			'ngRoute',
			'ngResource',
			'ngCookies',
			'ngAnimate',
			'pascalprecht.translate',
			'underscore',

			'app.filters',
			'app.directives',
			'app.constants',
			'app.services',
			'app.providers',
			'app.controllers']);
	}

	interface IApplicationRootScope extends angular.IScope {
		pageTitle: string;
	}

	App.Module.run(function ($rootScope: IApplicationRootScope, $http: angular.IHttpService, $location: angular.ILocationService, $route: angular.route.IRouteService) {
		$rootScope.$on('$routeChangeSuccess', function (event: angular.IAngularEvent, currentRoute, previousRoute) {
			$rootScope.pageTitle = 'Reservas - ' + $route.current['title'];
		});

		$rootScope.$on('$routeChangeError', function () {
		});
	});

}