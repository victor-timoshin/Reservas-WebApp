/// <reference path='../../../Reference.ts' />
/// <reference path='../../../Services/DataService.ts' />
/// <reference path='../Models/SpecialOfferModel.ts' />

'use strict';

module Controllers {

	export interface ISpecialOffersControllerScope extends angular.IScope {
		offers: Array<SpecialOfferModel>;
	}

	export class SpecialOffersController {
		public static $inject: Array<string> = ['$scope', 'dataService'];

		public constructor(
			private $scope: ISpecialOffersControllerScope,
			private dataService: Services.DataService) {

			$scope.offers = [];
			this.loadSpecialOffers($scope, dataService);
		}

		private loadSpecialOffers($scope: ISpecialOffersControllerScope, dataService: Services.DataService):void {
			var self = this;

			dataService.getSpecialOffers('', 12, function (offers: Array<SpecialOfferModel>) {
				for (var i = 0; i < offers.length; i += 1) {
					$scope.offers.push(offers[i]);
				}
			});
		}
	}

	Main.App.Controllers.controller('SpecialOffersCtrl', SpecialOffersController);
}