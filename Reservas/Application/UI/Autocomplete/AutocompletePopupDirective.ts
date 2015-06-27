/// <reference path="../../Reference.ts" />

'use strict';

module App.UI {

	export class AutocompletePopupDirective implements angular.IDirective {
		public restrict: string;
		public replace: boolean;
		public templateUrl: string;
		public scope: any;
		public link: angular.IDirectiveLinkFn;

		public static Factory() {
			var directive = () => {
				return new AutocompletePopupDirective();
			}

			return directive;
		}

		public constructor() {
			var self = this;

			self.restrict = 'A';
			self.replace = false;
			self.templateUrl = '/Application/UI/Autocomplete/AutocompletePopupTemplate.html';
			self.scope = {
				matches: '='
			}
			self.link = (originalScope: any, instanceElement: angular.IAugmentedJQuery, instanceAttributes: angular.IAttributes, controller: angular.INgModelController) => {}
		}
	}

	Main.App.Directives.directive('uiAutocompletePopup', AutocompletePopupDirective.Factory());
}