/// <reference path='../../Application/Reference.ts' />
/// <reference path='../../Application/Main.ts' />
/// <reference path='../../Application/Utils.ts' />
/// <reference path='../../Application/Services/DataService.ts' />

/// <reference path='../../Application/Pages/Home/Models/SpecialOfferModel.ts' />

/// <reference path='../../Assets/Typings/Jasmine/jasmine.d.ts' />

'use strict';

describe('TypeScript_Services.DataService', function () {

	var serverUrl = 'http://localhost:6350';
	var limit = 2;

	var httpBackendService: angular.IHttpBackendService;
	var injectorService: angular.auto.IInjectorService;

	beforeEach(module('app.services'));
	beforeEach(inject(function ($httpBackend: angular.IHttpBackendService, $injector: angular.auto.IInjectorService) {
		httpBackendService = $httpBackend;
		injectorService = $injector;

		httpBackendService.whenGET('/Api/Flights/GetSpecialOffers?airlineCode=&limit=' + limit).respond([
			{
				id: 1,
				airline: '',
				airlineCode: '',
				conditions: '',
				title: '',
				description: '',
				saleDateBegin: 1,
				saleDateEnd: 1,
				flightDateBegin: 1,
				flightDateEnd: 1,
				href: '',
				link: '',
				route: {
					tripClass: '',
					from_iata: '',
					from_name: '',
					onewayPrice: '',
					roundtripPrice: '',
					to_iata: '',
					to_name: ''
				}
			},
			{
				id: 2,
				airline: '',
				airlineCode: '',
				conditions: '',
				title: '',
				description: '',
				saleDateBegin: 1,
				saleDateEnd: 1,
				flightDateBegin: 1,
				flightDateEnd: 1,
				href: '',
				link: '',
				route: {
					tripClass: '',
					from_iata: '',
					from_name: '',
					onewayPrice: '',
					roundtripPrice: '',
					to_iata: '',
					to_name: ''
				}
			}
		]);
	}));

	afterEach(function () {
		httpBackendService.verifyNoOutstandingExpectation();
		httpBackendService.verifyNoOutstandingRequest();
	});

	describe('when getSpecialOffers method is called', function () {
		it('should returns offers data', function () {
			var offers = new Array<SpecialOfferModel>();
			injectorService.get('dataService').getSpecialOffers('', limit, function (response: Array<SpecialOfferModel>) {
				offers = response;
			});

			httpBackendService.flush();

			expect(offers.length).toBe(limit);
		});
	});

});