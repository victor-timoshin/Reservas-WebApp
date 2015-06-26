/// <reference path='../Reference.ts' />

'use strict';

module App.UI {

	export interface IImageConfig {
		noImageUrl: string;
		baseUrl: string;
	}

	Main.App.Constants.value('uiImageConfig', {
		noImageUrl: 'http://placehold.it/150x150&text=NO+IMAGE',
		baseUrl: 'http://cdn.photo.hotellook.com/image_v2/crop'
	});

	export class ImageScopeDeclaration {
		public dimensions: string;
		public totalCount: string;
		public index: string;
		public id: string;
	}

	export class ImageDirective implements angular.IDirective {

		public restrict: string;
		public template: string;
		public replace: boolean;
		public scope: ImageScopeDeclaration;
		public link: angular.IDirectiveLinkFn;

		public static Factory() {
			var directive = ($config: IImageConfig) => {
				return new ImageDirective($config);
			}

			directive.$inject = ['uiImageConfig'];
			return directive;
		}

		public constructor($config: IImageConfig) {
			var self = this;
			self.restrict = 'A';
			self.template = '<img data-ng-src="{{url}}" width="{{dimensions}}" height="{{dimensions}}" class="img-responsive" />';
			self.replace = true;
			self.scope = new ImageScopeDeclaration();
			self.scope.dimensions = '@';
			self.scope.totalCount = '@';
			self.scope.index = '@';
			self.scope.id = '@';
			self.link = ($scope: any, instanceElement: angular.IAugmentedJQuery, instanceAttributes: angular.IAttributes, controller: angular.INgModelController) => {

				instanceElement[0].onerror = function () {
					self.setEmptyImage(instanceElement, $config);
				}

				instanceAttributes.$observe('id', function (id) {
					$scope.id = instanceAttributes['id'] || id;
					$scope.totalCount = instanceAttributes['totalCount'] || 1;

					if (parseInt($scope.totalCount) >= parseInt($scope.index)) {
						$scope.url = self.getImageUrl($scope, $config);
					}
					else {
						self.setEmptyImage(instanceElement, $config);
					}
				});
			}
		}

		private setEmptyImage($element: angular.IAugmentedJQuery, $config: IImageConfig): void {
			$element.addClass($element[0].className + ' image-error');
			$element.attr('src', $config.noImageUrl);
		}

		private getImageUrl($scope: any, $config: IImageConfig): string {
			var str = new String();
			return str.format('{0}/h{1}_{2}/{3}.jpg', $config.baseUrl, $scope.id, $scope.index, $scope.dimensions);
		}
	}

	Main.App.Directives.directive('uiImage', App.UI.ImageDirective.Factory());

}