///<reference path='../../../Reference.ts' />
///<reference path='../Models/RegionModel.ts' />

'use strict';

module Main {

	export interface IRegionSelectorControllerScope extends angular.IScope {
		//#region Variables

		regions: Models.RegionModel[];
		currentRegion: Models.RegionModel;

		//#endregion

		//#region Methods

		setRegion: (index: number) => void;

		//#endregion
	}

	export class RegionSelectorController {
		public static $inject: Array<string> = ['$scope', '$route', '$routeParams', '$location', '$cookies', '$translate'];

		public constructor(
			public $scope: IRegionSelectorControllerScope,
			public $route: angular.route.IRouteService,
			public $routeParams: angular.route.IRouteParamsService,
			public $location: angular.ILocationService,
			public $cookies: any,
			public $translate: angular.translate.ITranslateService) {

			$scope.regions = [
				{ code: 'ru', name: 'Русский' },
				{ code: 'en', name: 'United States' }
			];

			$scope.currentRegion = $scope.regions[0];

			$scope.setRegion = function (index: number) {
				var selected = $scope.regions[index];

				$cookies.__APPLICATION_LANGUAGE = selected.code;
				$translate.use(selected.code);

				$scope.currentRegion = selected;
			}
		}
	}

	Main.App.Controllers.controller('RegionSelectorCtrl', RegionSelectorController);

}