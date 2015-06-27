/// <reference path="../../Reference.ts" />

'use strict';

module App.UI {

	export class AutocompleteScopeDeclaration {
		public placeholder: string;
	}

	export class AutocompleteDirective implements angular.IDirective {
		//#region Variables

		public HotKeys: Array<number> = [9/*Tab*/, 13/*Enter*/, 27/*Escape*/, 38/*Up arrow*/, 40/*Down arrow*/];

		//#endregion

		//#region Properties

		public restrict: string;
		public templateUrl: string;
		public replace: boolean;
		public require: string;
		public scope: AutocompleteScopeDeclaration;
		public link: angular.IDirectiveLinkFn;

		//#endregion

		public static Factory() {
			var directive = (dataService: Services.DataService, $compile: angular.ICompileService, _: UnderscoreStatic) => {
				return new AutocompleteDirective(dataService, $compile, _);
			}

			directive.$inject = ['dataService', '$compile', '_'];
			return directive;
		}

		public constructor(
			private dataService: Services.DataService,
			private $compile: angular.ICompileService,
			private _: UnderscoreStatic) {

			var self = this;

			self.restrict = 'A';
			self.templateUrl = '/Application/UI/Autocomplete/AutocompleteTemplate.html';
			self.replace = true;
			self.require = 'ngModel';
			self.scope = new AutocompleteScopeDeclaration();
			self.scope.placeholder = '@';
			self.link = (autocompleteScope: any, instanceElement: angular.IAugmentedJQuery, instanceAttributes: angular.IAttributes, controller: angular.INgModelController) => {
				autocompleteScope.popupId = 'ui-autocomplete-' + Math.floor(Math.random() * 10000);
				autocompleteScope.matches = [];
				autocompleteScope.activeIdx = 0/*focusFirst*/;
				autocompleteScope.selected = null;

				var waitTime = 1000;
				var $autocompleteTextInput = instanceElement.children('input[type="text"].search-form__text-input');
				var $preloader = instanceElement.children('.search-form__preloader');
				var $btnClear = instanceElement.children('.search-form__clear');

				var $popupElement = self.createPopUp(autocompleteScope.popupId);
				this.setPosition($popupElement, this.getPosition($autocompleteTextInput));

				$autocompleteTextInput.bind('keyup', _.debounce(function (eventObject: JQueryEventObject) {
					var target = <HTMLInputElement>(eventObject.target || eventObject.srcElement);
					var valueLength = target.value.length,
						minLength = 3;

					if (valueLength < minLength)
						return;

					self.sendRequest(autocompleteScope, dataService, target, $preloader, $btnClear, $popupElement);
				}, waitTime));

				$autocompleteTextInput.bind('click', function (eventObject: JQueryEventObject) {
					var target = <HTMLInputElement>(eventObject.target || eventObject.srcElement);
					target.select();
				});

				$btnClear.bind('click', function (eventObject: JQueryEventObject) {
					var $target = $(eventObject.target || eventObject.srcElement);
					$target.hide();

					$autocompleteTextInput.val('');
					$autocompleteTextInput.focus();
				});

				var $popupElementCompile = $compile($popupElement)(autocompleteScope);
				$('body').append($popupElementCompile);

				$popupElementCompile.bind('mouseleave', function () {
					var self = this;
					setTimeout(function () {
						$popupElementCompile.css({ 'display': 'none' });

						$btnClear.hide();

						$autocompleteTextInput.val('');
						$autocompleteTextInput.focus();
					}, 300);
				});
			}
		}

		private resetMatches(scope: any): void {
			scope.matches = [];
			scope.activeIdx = -1;
		}

		private getMatchId(scope: any, index: number): string {
			return scope.popupId + '-option-' + index;
		}

		private sendRequest(scope: any, dataService: Services.DataService, target: HTMLInputElement, $preloaderElement: JQuery, $btnClearElement: JQuery, $popup: JQuery) {
			var self = this;
			var lang = 'ru';

			if (!/[а-яА-Я]/i.test(target.value))
				lang = 'en';

			self.showPreloader($preloaderElement, $btnClearElement);
			dataService.getAutocomplete(target.value, lang, function (responseData) {
				$popup.css({ 'display': 'block' });

				self.parseResponse(scope, responseData, $popup);
				self.hidePreloader($preloaderElement, $btnClearElement);
			});
		}

		private parseResponse(scope: any, responseData: Array<any>, $popup: JQuery): void {
			var uniqueList: Array<any> = [];
			var hasEmptyList: boolean = false;

			$popup.children('ul').html('');

			for (var i = 0; i < responseData.length; i += 1) {
				scope.matches.push(responseData[i]);
				$popup.children('ul').append(this.addItemToList(scope, uniqueList, responseData[i], i, $popup));
			}
		}

		private addItemToList(scope: any, uniqueList: Array<any>, responseItem: any, index: number, $popup: JQuery): JQuery {
			var $li = $('<li/>').addClass('ui-menu-item').attr({
				id: this.getMatchId(scope, index),
				role: 'presentation'
			});

			$li.html(
				'<span class="autocomplete-item-name">' + responseItem.name + '</span>' +
				'<span class="autocomplete-item-country">' + responseItem.countryName + '</span>' +
				'<span class="autocomplete-item-code">' + responseItem.code + '</span>');

			uniqueList.push({
				name: responseItem.name,
				countryName: responseItem.countryName,
				code: responseItem.code
			});

			this.menuItemListener(scope, $li);

			return $li;
		}

		private addEmptyItemToList(): void {
		}

		private menuItemListener($scope: any, $element: JQuery) {
			var self = this;
			$element.bind('mousedown', function (eventObject) {
				var target = eventObject.target || eventObject.srcElement;
				$scope.selected = $(target);

				var text = (<JQuery>$scope.selected).children('.autocomplete-item-code').text();
				console.log(text);

				$scope.selected = null;
			});

			$element.bind('mouseup', function (eventObject) {
				//console.log('mouseup');
			});

			$element.bind('mouseover', function (eventObject) {
				//console.log('mouseover');
			});
		}

		private showPreloader($element: JQuery, $btnClearElement: JQuery): void {
			this.hideClear($btnClearElement);
			$element.show();
		}

		private hidePreloader($element: JQuery, $btnClearElement: JQuery): void {
			$element.hide();
			this.showClear($btnClearElement);
		}

		private showClear($element: JQuery): void {
			$element.show();
		}

		private hideClear($element: JQuery): void {
			$element.hide();
		}

		private createPopUp(popupId: string): JQuery {
			var $popupElement = angular.element('<div ui-autocomplete-popup></div>').addClass('ui-autocomplete-popup').attr({
				id: popupId,
				matches: 'matches',
			});

			return $popupElement;
		}

		private getCoords(element: HTMLElement): any {
			var clientRect = element.getBoundingClientRect(),

				clientTop = document.documentElement.clientTop || document.body.clientTop || 0,
				clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0,

				scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop,
				scrollLeft = window.pageYOffset || document.documentElement.scrollLeft || document.body.scrollLeft,

				top = clientRect.top + scrollTop - clientTop,
				left = clientRect.left + scrollLeft - clientLeft;

			return { top: Math.round(top), left: Math.round(left) }
		}

		private getPosition($element: JQuery): any {
			var input = $element.get(0),
				inputCoords = this.getCoords(input);

			var offset: any = {};

			offset.x = inputCoords.left;
			offset.y = inputCoords.top + input.offsetHeight + 5;

			return offset;
		}

		private setPosition($element: JQuery, offset: any): void {
			$element.get(0).style.top = offset.y + 'px';
			$element.get(0).style.left = offset.x + 'px';
		}
	}

	Main.App.Directives.directive('uiAutocomplete', AutocompleteDirective.Factory());
}