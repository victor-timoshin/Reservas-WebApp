/// <reference path='../../Reference.ts' />

'use strict';

module App.UI {

	export interface IRadioBtnControllerScope extends angular.IScope {
		value: string;
		model: any;

		checked: () => boolean;
	}

	export class RadioBtnController {
		public static $inject: Array<string> = ['$scope'];
		public constructor(private $scope: IRadioBtnControllerScope) {
			$scope.checked = function () {
				return $scope.value === $scope.model;
			};

			var state;

			if (state === CommonStates.STATE_NORMAL) {
			}
			else if (state === CommonStates.STATE_MOUSEOVER) {
			}
			else if (state === CommonStates.STATE_PRESSED) {
			}
			else if (state === CommonStates.STATE_DISABLED) {
			}
			else if (state === CommonStates.STATE_DISABLED || state === FocusStates.STATE_FOCUSED) {
			}
		}
	}

	Main.App.Controllers.controller('RadioBtnCtrl', RadioBtnController);

}