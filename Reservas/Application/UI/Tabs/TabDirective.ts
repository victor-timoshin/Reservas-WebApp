/// <reference path='../../Reference.ts' />
/// <reference path='TabsController.ts' />

'use strict';

module App.UI {

	export interface ITabScope extends angular.IScope {
	}

	export class TabScopeDecl {
		public id: string;
		public title: string;
	}

	export class TabDirective implements angular.IDirective {

		//#region Properties

		public restrict: string;
		public require: string;
		public transclude: boolean;
		public replace: boolean;
		public template: string;
		public scope: TabScopeDecl;
		public link: angular.IDirectiveLinkFn;

		//#endregion

		public static Factory() {
			var directive = () => {
				return new TabDirective();
			}

			return directive;
		}

		public constructor() {
			var self = this;

			self.restrict = 'A';
			self.require = '^uiTabs';
			self.transclude = true;
			self.replace = true;
			self.template = '<div data-ng-transclude data-ng-class="{\'active\': active}" class="ui-tab-panel" role="tabpanel"></div>';
			self.scope = new TabScopeDecl();
			self.scope.id = '@';
			self.scope.title = '@';
			self.link = (tabScope: ITabsScope, instanceElement: angular.IAugmentedJQuery, instanceAttributes: angular.IAttributes, controller: TabsController) => {

				controller.addTab(tabScope);

				tabScope.$watch('active', function (active) {
					if (active) {
						controller.select(tabScope);
					}
				});

			}
		}
	}

	Main.App.Directives.directive('uiTab', TabDirective.Factory());

}