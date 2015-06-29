/// <reference path='../../Reference.ts' />

'use strict';

module App.UI {

	export interface ITabsControllerScope extends angular.IScope {
		tabs: Array<any>;
		active: any;
		disabled: any;
	}

	export class TabsController {
		public static $inject: Array<string> = ['$scope'];
		public scope: ITabsControllerScope;

		public constructor(public $scope: ITabsControllerScope) {
			this.scope = $scope;
			this.scope.tabs = [];
		}

		public addTab(tab: any): void {
			this.scope.tabs.push(tab);

			if (this.scope.tabs.length === 1) {
				tab.active = true;
			}
		}

		public select(selectedTab: any): void {
			for (var i = 0; i < this.scope.tabs.length; i++) {
				if (this.scope.tabs[i] !== selectedTab) {
					this.scope.tabs[i].active = false;
				}
			}

			selectedTab.active = true;
		}
	}

	Main.App.Controllers.controller('TabsCtrl', TabsController);

}