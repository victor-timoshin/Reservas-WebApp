/// <reference path='../../../Application/Reference.ts' />
/// <reference path='../../../Application/Main.ts' />
/// <reference path='../../../Application/Utils.ts' />

/// <reference path='../../../Assets/Typings/Jasmine/jasmine.d.ts' />

'use strict';

describe('TypeScript_UI.DropDown', function () {

	var scope: angular.IScope;
	var compileService: angular.ICompileService;
	var template: angular.IAugmentedJQuery;

	beforeEach(module('app.directives'));
	beforeEach(module('/Application/UI/DropDown/DropDownTemplate.html')); /* Load the template module. */
	beforeEach(inject(function ($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) {
		scope = $rootScope.$new();
		compileService = $compile;
	}));

	//#region Private methods.

	var onClick = function (element: angular.IAugmentedJQuery) {
		element = element || template;
		element.find('a[dropdown-toggle]').click();
	};

	//#endregion

	describe('', function () {
		template = compileService('<div data-ui-dropdown></div>')(scope);

		it('', function () {
		});
	});

});