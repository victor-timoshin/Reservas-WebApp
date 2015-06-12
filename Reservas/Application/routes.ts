/// <reference path='reference.ts' />
/// <reference path='main.ts' />

module Main {

	App.Module.config(['$routeProvider', function ($routeProvider: angular.route.IRouteProvider) {
		$routeProvider.when('/home', { templateUrl: 'Application/Pages/Home/home-tmpl.html', controller: 'HomeCtrl', title: 'Главная страница' });

		$routeProvider.otherwise({ redirectTo: '/home' });
	}]);

	App.Module.config(['$translateProvider', function ($translateProvider: angular.translate.ITranslateProvider) {
		$translateProvider.useUrlLoader('/Api/Translations/Get');
		$translateProvider.preferredLanguage('ru');
	}]);

}