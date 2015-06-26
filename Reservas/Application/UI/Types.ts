'use strict';

module App.UI {

	export enum FocusStates {
		STATE_UNFOCUSED = 0,
		STATE_FOCUSED = 1
	}

	export enum CommonStates {
		STATE_NORMAL = 0,
		STATE_MOUSEOVER = 1,
		STATE_PRESSED = 2,
		STATE_DISABLED = 3
	}

	export enum ValidationStates {
		STATE_VALID = 0,
		STATE_INVALID_UNFOCUSED = 1,
		STATE_INVALID_FOCUSED = 2
	}

	export enum CheckStates {
		STATE_UNCHECKED = 0,
		STATE_CHECKED = 1,
		STATE_INDETERMINATE = 2
	}

}