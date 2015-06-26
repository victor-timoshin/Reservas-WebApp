/// <reference path='../Reference.ts' />

'use strict';

module App.Directives {

	Main.App.Directives.directive('includeReplace', function (): angular.IDirective {
		return {
			require: 'ngInclude',
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.replaceWith(element.children());
			}
		};
	});

}