/// <reference path='../../../Application/Reference.ts' />
/// <reference path='../../../Application/Main.ts' />
/// <reference path='../../../Application/Utils.ts' />

/// <reference path='../../../Assets/Typings/Jasmine/jasmine.d.ts' />

'use strict';

describe('TypeScript_App.UI.Autocomplete', function () {

	beforeEach(module('app.directives'));
	beforeEach(module('/Application/UI/Autocomplete/AutocompleteTemplate.html'));  /* Load the template module. */

	var triggerKeyDown = function (element: JQuery, keyCode: number) {
		var eventObject = angular.element.Event('keydown');
		eventObject.which = keyCode;

		element.trigger(eventObject);
	}
});