/// <reference path='../../../Application/Reference.ts' />
/// <reference path='../../../Application/Main.ts' />
/// <reference path='../../../Application/Utils.ts' />

/// <reference path='../../../Assets/Typings/Jasmine/jasmine.d.ts' />

'use strict';

describe('TypeScript_UI.RadioBtn', function () {

	var scope: angular.IScope;
	var compileService: angular.ICompileService;
	var template: angular.IAugmentedJQuery;

	beforeEach(module('app.directives'));
	beforeEach(module('/Application/UI/RadioBtn/RadioBtnTemplate.html')); /* Load the template module. */
	beforeEach(inject(function ($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) {
		scope = $rootScope.$new();
		compileService = $compile;
	}));

});