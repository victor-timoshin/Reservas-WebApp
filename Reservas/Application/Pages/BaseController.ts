'use strict';

module Main.Controllers {

	export class BaseController<T> {
		public scope: angular.IScope;
		public viewModel: T;

		public constructor(scope: angular.IScope, ModelType: { new (): T; }) {
			this.scope = scope;
			this.viewModel = new ModelType();

			this.scope['viewModel'] = this.viewModel;
			this.scope['controller'] = this;
		}
	}

}