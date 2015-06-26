/// <reference path='../../Reference.ts' />
/// <reference path='RadioBtnController.ts' />

'use strict';

module App.UI {

	export interface IRadioBtnScope extends angular.IScope {
	}

	export class RadioBtnScopeDecl {
		public model: string;
		public label: string;
		public value: string;
		public required: string;
		public name: string;
	}

	export class RadioBtnDirective implements angular.IDirective {

		//#region Properties

		public restrict: string;
		public transclude: boolean;
		public replace: boolean;
		public controller: string;
		public templateUrl: any;
		public scope: RadioBtnScopeDecl;
		public link: angular.IDirectiveLinkFn;

		//#endregion

		public static Factory() {
			var directive = () => {
				return new RadioBtnDirective();
			}

			return directive;
		}

		public constructor() {
			var self = this;

			self.restrict = 'A';
			self.transclude = true;
			self.replace = true;
			self.controller = 'RadioBtnCtrl';
			self.templateUrl = '/Application/UI/RadioBtn/RadioBtnTemplate.html';
			self.scope = new RadioBtnScopeDecl();
			self.scope.model = '=';
			self.scope.label = '@';
			self.scope.value = '=';
			self.scope.required = '=';
			self.scope.name = '=';
			self.link = (radioBtnScope: IRadioBtnScope, instanceElement: angular.IAugmentedJQuery, instanceAttributes: angular.IAttributes, controller: angular.INgModelController) => {
			}
		}
	}

	Main.App.Directives.directive('uiRadioBtn', RadioBtnDirective.Factory());

}