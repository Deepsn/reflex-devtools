/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex"

export interface Widget {
	open: boolean
	enabled: boolean
	selectedIndex?: number
	autoSelectLatest: boolean
	showArgs: boolean
	diffMode: boolean
	filter: {
		match: string
		filterNot: boolean
	}
}

const initialState: Widget = {
	open: false,
	enabled: true,
	autoSelectLatest: true,
	showArgs: true,
	diffMode: false,
	filter: {
		match: "",
		filterNot: false,
	},
}

export const widget = createProducer(initialState, {
	toggled: (state, open?: boolean) => ({
		...state,
		open: open ?? !state.open,
	}),
	changeEnabled: (state, enabled: boolean) => ({
		...state,
		enabled,
	}),
	selectedAction: (state, index: number, manual?: boolean) => ({
		...state,
		selectedIndex: index,
		autoSelectLatest: !manual,
	}),
	changeAutoSelectMode: (state, mode: boolean) => ({
		...state,
		autoSelectLatest: mode,
	}),
	changeShowArgs: (state, show: boolean) => ({
		...state,
		showArgs: show,
	}),
	changeDiffMode: (state, mode: boolean) => ({
		...state,
		diffMode: mode,
	}),
	changeFilter: (state, match: string, filterNot: boolean) => ({
		...state,
		filter: {
			match,
			filterNot,
		},
	}),
})
