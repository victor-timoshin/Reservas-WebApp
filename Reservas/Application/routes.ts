/// <reference path='Reference.ts' />
/// <reference path='Main.ts' />

module Main {

	App.Module.config(['$routeProvider', function ($routeProvider: angular.route.IRouteProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'Application/Pages/Home/Views/index.html',
			controller: 'Home.IndexCtrl',
			data: {
				title: 'HOME_TITLE'
			}
		});

		$routeProvider.when('/flights/:q', {
			templateUrl: 'Application/Pages/Flights/Views/index.html',
			controller: 'Flights.IndexCtrl',
			dara: {
				title: 'FLIGHTS_SEARCH'
			}
		});

		$routeProvider.when('/hotels/:q', {
			templateUrl: 'Application/Pages/Hotels/Views/index.html',
			controller: 'Hotels.IndexCtrl',
			data: {
				title: 'HOTELS_SEARCH'
			}
		});

		$routeProvider.otherwise({ redirectTo: '/home' });
	}]);

	App.Module.config(['$translateProvider', function ($translateProvider: angular.translate.ITranslateProvider) {
		$translateProvider.useUrlLoader('/Api/Translations/Get');
		$translateProvider.preferredLanguage('ru');
	}]);

}