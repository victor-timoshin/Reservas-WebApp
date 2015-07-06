/// <reference path='../../Reference.ts' />

'use strict';

module App.UI {

	export class PageSlideScopeDeclaration {
		public open: string;
		public autoClose: string;
		public join: string;
		public side: string;
		public speed: string;
		public className: string;
		public size: string;
		public squeeze: string;
		public cloak: string;
		public push: string;
	}

	interface IPageSlideScope extends angular.IScope {
		open: any;
		autoClose: any;
		join: string;
		side: string;
		speed: string;
		className: string;
		size: string;
		squeeze: boolean;
		cloak: string;
		push: boolean;

		onOpenEvent: ($scope: IPageSlideScope, slider: any, param: any, body: HTMLElement, content: any) => void;
		onCloseEvent: ($scope: IPageSlideScope, slider: any, param: any, body: HTMLElement, content: any) => void;
	}

	export class PageSlideDirective implements angular.IDirective {
		public templateUrl: string;
		public link: angular.IDirectiveLinkFn;
		public restrict: string;
		public transclude: boolean;
		public replace: boolean;
		public scope: PageSlideScopeDeclaration;

		public static Create(): PageSlideDirective {
			var directive = new PageSlideDirective();

			directive.restrict = 'A';
			directive.templateUrl = '/Application/UI/PageSlide/PageSlideTemplate.html';
			directive.transclude = true,
			directive.replace = true,

			directive.scope = new PageSlideScopeDeclaration();
			directive.scope.open = '=?';
			directive.scope.autoClose = '=?';
			directive.scope.join = '@';
			directive.scope.side = '@';
			directive.scope.speed = '@';
			directive.scope.className = '@';
			directive.scope.size = '@';
			directive.scope.squeeze = '@';
			directive.scope.cloak = '@';
			directive.scope.push = '@';

			directive.link = ($scope: IPageSlideScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, controller: any, transclude: angular.ITranscludeFunction) => {

				var param: any = {};
				param.side = $scope.side || 'right';
				param.join = $scope.join || 'inner';
				param.speed = $scope.speed || '0.5';
				param.size = $scope.size || '300px';
				param.zindex = 1000;
				param.className = $scope.className || 'ui-page-slide';
				param.cloak = $scope.cloak && $scope.cloak.toLowerCase() == 'false' ? false : true;
				param.squeeze = Boolean($scope.squeeze) || false;
				param.push = Boolean($scope.push) || false;

				element.addClass(param.className);

				var content = null;
				var body: HTMLElement = document.body;
				var slider: HTMLElement = <HTMLElement>element[0];

				if (slider.tagName.toLowerCase() !== 'div' && slider.tagName.toLowerCase() !== 'aside' && slider.tagName.toLowerCase() !== 'ui-page-slide')
					throw new Error('PageSlide can only be applied to <div> or <aside> or <ui-page-slide> elements');

				if (slider.children.length === 0)
					throw new Error('You have to content inside the <ui-page-slide>');

				content = angular.element(slider.children);

				if ($scope.join === 'outer')
					body.appendChild(slider);

				slider.style.zIndex = param.zindex;
				slider.style.position = 'fixed';
				slider.style.width = '0';
				slider.style.height = '0';
				slider.style.overflow = 'hidden';
				slider.style.transitionDuration = param.speed + 's';
				slider.style.transitionProperty = 'width, height';
				if (param.squeeze) {
					body.style.position = 'absolute';
					body.style.transitionDuration = param.speed + 's';
					body.style.transitionProperty = 'top, bottom, left, right';
				}

				switch (param.side) {
					case 'right':
						slider.style.height = attrs['offsetHeight'] || '100%';
						slider.style.top = attrs['offsetTop'] || '0px';
						slider.style.bottom = attrs['offsetBottom'] || '0px';
						slider.style.right = attrs['offsetRight'] || '0px';
						break;
					case 'left':
						slider.style.height = attrs['offsetHeight'] || '100%';
						slider.style.top = attrs['offsetTop'] || '0px';
						slider.style.bottom = attrs['offsetBottom'] || '0px';
						slider.style.left = attrs['offsetLeft'] || '0px';
						break;
					case 'top':
						slider.style.width = attrs['offsetWidth'] || '100%';
						slider.style.left = attrs['offsetLeft'] || '0px';
						slider.style.top = attrs['offsetTop'] || '0px';
						slider.style.right = attrs['offsetRight'] || '0px';
						break;
					case 'bottom':
						slider.style.width = attrs['offsetWidth'] || '100%';
						slider.style.bottom = attrs['offsetBottom'] || '0px';
						slider.style.left = attrs['offsetLeft'] || '0px';
						slider.style.right = attrs['offsetRight'] || '0px';
						break;
				}

				$scope.$watch('open', function (value) {
					switch (value) {
						case PageSlideState.STATE_ACTIVE:
							directive.onOpenEvent($scope, slider, param, body, content);
							break;

						case PageSlideState.STATE_DISABLED:
							directive.onCloseEvent($scope, slider, param, body, content);
							break;
					}
				});

				$scope.$on('$destroy', function () {
					document.body.removeChild(slider);
				});

				if ($scope.autoClose) {
					$scope.$on('$locationChangeStart', function () {
						directive.onCloseEvent($scope, slider, param, body, content);
					});

					$scope.$on('$stateChangeStart', function () {
						directive.onCloseEvent($scope, slider, param, body, content);
					});
				}
			}

			return directive;
		}

		private onOpenEvent($scope: IPageSlideScope, slider: HTMLElement, param: any, body: HTMLElement, content: any): void {
			if (slider.style.width !== '0' && slider.style.width !== '0') {
				switch (param.side) {
					case 'right':
						slider.style.width = param.size;

						if (param.squeeze) body.style.right = param.size;
						if (param.push) {
							body.style.right = param.size;
							body.style.left = '-' + param.size;
						}
						break;
					case 'left':
						slider.style.width = param.size;
						if (param.squeeze) body.style.left = param.size;
						if (param.push) {
							body.style.left = param.size;
							body.style.right = '-' + param.size;
						}
						break;
					case 'top':
						slider.style.height = param.size;
						if (param.squeeze) body.style.top = param.size;
						if (param.push) {
							body.style.top = param.size;
							body.style.bottom = '-' + param.size;
						}
						break;
					case 'bottom':
						slider.style.height = param.size;
						if (param.squeeze) body.style.bottom = param.size;
						if (param.push) {
							body.style.bottom = param.size;
							body.style.top = '-' + param.size;
						}
						break;
				}

				setTimeout(function () {
					if (param.cloak) content.css('display', 'block');
				}, (param.speed * 1000));

			}
		}

		private onCloseEvent($scope: IPageSlideScope, slider: HTMLElement, param: any, body: HTMLElement, content: any): void {
			if (slider && slider.style.width !== '0' && slider.style.width !== '0') {
				if (param.cloak) content.css('display', 'none');
				switch (param.side) {
					case 'right':
						slider.style.width = '0px';

						//$(slider).css({
						//    '-webkit-transition': 'all 10s ease-in-out',
						//    '-moz-transition': 'all 10s ease-in-out',
						//    '-o-transition': 'all 10s ease-in-out',
						//    'transition': 'all 10s ease-in-out',
						//    'transform': 'translate(-2000px, -1000px)'});
						//slider.classList.add('left');

						if (param.squeeze) body.style.right = '0px';
						if (param.push) {
							body.style.right = '0px';
							body.style.left = '0px';
						}
						break;
					case 'left':
						slider.style.width = '0px';
						if (param.squeeze) body.style.left = '0px';
						if (param.push) {
							body.style.left = '0px';
							body.style.right = '0px';
						}
						break;
					case 'top':
						slider.style.height = '0px';
						if (param.squeeze) body.style.top = '0px';
						if (param.push) {
							body.style.top = '0px';
							body.style.bottom = '0px';
						}
						break;
					case 'bottom':
						slider.style.height = '0px';
						if (param.squeeze) body.style.bottom = '0px';
						if (param.push) {
							body.style.bottom = '0px';
							body.style.top = '0px';
						}
						break;
				}
			}

			$scope.open = PageSlideState.STATE_DISABLED;
		}
	}

	Main.App.Directives.directive('uiPageSlide', [App.UI.PageSlideDirective.Create]);

}