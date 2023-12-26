/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex"
import { RunService } from "@rbxts/services"
import { generateAction } from "../utils/generateActions"

const isRunning = RunService.IsRunning()

interface DispatchedAction {
	name: string
	args: unknown[]
	state: {}
}

export interface Action extends DispatchedAction {
	timestamp: number
}

export interface Game {
	actions: Action[]
}

const initialState: Game = {
	actions: isRunning ? [] : table.create(10, 0).map(() => generateAction())
}

export const _game = createProducer(initialState, {
	dispatched: (state, action: DispatchedAction, timestamp: number) => ({
		...state,
		actions: [...state.actions, { ...action, timestamp }]
	}),
	clear: state => ({
		...state,
		actions: []
	})
})
