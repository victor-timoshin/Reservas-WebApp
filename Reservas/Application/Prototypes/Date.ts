interface Date {
	addDays: (days: number) => number;
}

Date.prototype.addDays = function (days: number): number {
	this.setDate(this.getDate() + days);
	return this.getTime();
}