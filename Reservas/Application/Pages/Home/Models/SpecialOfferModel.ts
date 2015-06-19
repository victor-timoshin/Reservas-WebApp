/// <reference path='SpecialOfferRouteModel.ts' />

'use strict';

class SpecialOfferModel {
	public id: number; /* Unique identifier. */
	public airline: string;
	public airlineCode: string;
	public conditions: string;
	public title: string;
	public description: string;
	public saleDateBegin: number;
	public saleDateEnd: number;
	public flightDateBegin: number;
	public flightDateEnd: number;
	public href: string
	public link: string;

	public route: SpecialOfferRouteModel;
}