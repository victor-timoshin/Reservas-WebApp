/// <reference path='../../Reference.ts' />
/// <reference path='TabsController.ts' />

'use strict';

module App.UI {

	export interface ITabsScope extends angular.IScope {
		select: (selectedTab: any) => void;
	}

	export class TabsDirective implements angular.IDirective {

		//#region Properties

		public restrict: string;
		public transclude: boolean;
		public replace: boolean;
		public controller: string;
		public templateUrl: any;
		public link: angular.IDirectiveLinkFn;

		//#endregion

		public static Factory() {
			var directive = () => {
				return new TabsDirective();
			}

			return directive;
		}

		public constructor() {
			var self = this;

			self.restrict = 'A';
			self.transclude = true;
			self.replace = true;
			self.controller = 'TabsCtrl';
			self.templateUrl = '/Application/UI/Tabs/TabsTemplate.html';
			self.link = (tabsScope: ITabsScope, instanceElement: angular.IAugmentedJQuery, instanceAttributes: angular.IAttributes, controller: TabsController) => {

				tabsScope.select = function (selectedTab: any): void {
					controller.select(selectedTab);
				}

			}
		}
	}

	Main.App.Directives.directive('uiTabs', TabsDirective.Factory());

}