'use strict';

module Main.Controllers {

	export class BaseController<T> {
		public scope: angular.IScope;
		public viewModel: T;

		public constructor(
			public $scope: angular.IScope,
			public ModelType: { new (): T; }) {

			this.scope = $scope;
			this.viewModel = new ModelType();

			this.scope['viewModel'] = this.viewModel;
			this.scope['controller'] = this;
		}
	}

}