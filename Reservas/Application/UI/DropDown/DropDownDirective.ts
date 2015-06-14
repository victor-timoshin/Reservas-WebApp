/// <reference path='../../Reference.ts' />
/// <reference path='DropDownScopeDeclaration.ts' />

'use strict';

module App.UI {

	export interface IDropDownScope extends angular.IScope {
	}

	export class DropDownDirective implements angular.IDirective {

		//#region Properties

		public templateUrl: any;
		public restrict: string;
		public transclude: boolean;
		public replace: boolean;
		public scope: DropDownScopeDeclaration;
		public link: angular.IDirectiveLinkFn;

		//#endregion

		public static Factory() {
			var directive = () => {
				return new DropDownDirective();
			}

			//directive.$inject = [];
			return directive;
		}

		public constructor() {
			var self = this;

			self.restrict = 'A';
			self.templateUrl = '/Application/UI/DropDown/DropDownTemplate.html';
			self.transclude = true;
			self.replace = true;
			self.scope = new DropDownScopeDeclaration();
			self.scope.title = '@';
			self.link = (originalScope: IDropDownScope, instanceElement: angular.IAugmentedJQuery, instanceAttributes: angular.IAttributes, controller: angular.INgModelController) => {
				instanceElement.bind('mouseenter', function () {
					instanceElement.addClass('open');
				});

				instanceElement.bind('mouseleave', function () {
					instanceElement.removeClass('open');
				});
			}
		}
	}

	Main.App.Directives.directive('uiDropdown', DropDownDirective.Factory());

}