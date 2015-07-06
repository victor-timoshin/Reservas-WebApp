/// <reference path='../../Reference.ts' />

'use strict';

module App.UI {

	export interface IStarRatingScope extends angular.IScope {
	}

	export class StarRatingScopeDecl {
		public score: string;
		public max: string;
	}

	export class StarRatingDirective implements angular.IDirective {

		//#region Properties

		public templateUrl: any;
		public restrict: string;
		public transclude: boolean;
		public replace: boolean;
		public scope: StarRatingScopeDecl;
		public link: angular.IDirectiveLinkFn;

		//#endregion

		public static Factory() {
			var directive = () => {
				return new StarRatingDirective();
			}

			return directive;
		}

		public constructor() {
			var self = this;

			self.restrict = 'A';
			self.templateUrl = '/Application/UI/StarRating/StarRatingTemplate.html';
			self.transclude = true;
			self.replace = true;
			self.scope = new StarRatingScopeDecl();
			self.scope.score = '=score';
			self.scope.max = '=max';
			self.link = (starRatingScope: any, instanceElement: angular.IAugmentedJQuery, instanceAttributes: angular.IAttributes, controller: angular.INgModelController) => {
				starRatingScope.updateStars = function () {
					var idx = 0;
					starRatingScope.stars = [];
					for (idx = 0; idx < starRatingScope.max; idx += 1) {
						starRatingScope.stars.push({
							full: starRatingScope.score > idx
						});
					}
				};

				starRatingScope.starClass = function (star, idx) {
					var starClass = 'fa-star-o';
					if (star.full) {
						starClass = 'fa-star';
					}

					return starClass;
				};

				starRatingScope.$watch('score', function (newValue, oldValue) {
					if (newValue !== null && newValue !== undefined) {
						starRatingScope.updateStars();
					}
				});
			}
		}
	}

	Main.App.Directives.directive('uiStarRating', StarRatingDirective.Factory());

}