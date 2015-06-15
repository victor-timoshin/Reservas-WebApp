interface String {
	format: (str: string, ...args:any[]) => string;
}

String.prototype.format = function (str: string, ...args: any[]): string {
	var param = /^\{(\d+)\}$/;

	for (var i = 0; i < args.length; i++) {
		var regex = new RegExp('\\{' + i + '\\}', 'gm');
		str = str.replace(regex, args[i]);
	}

	return str;
}