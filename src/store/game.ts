/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex"
import { RunService } from "@rbxts/services"
import { generateAction } from "../utils/generateActions"

const isRunning = RunService.IsRunning()
const DEV_MODE = false

export type State = { [key: string]: unknown }

interface DispatchedAction {
	name: string
	args: unknown[]
	state: State
}

export interface Action extends DispatchedAction {
	timestamp: number
}

export interface Game {
	actions: Action[]
}

const initialState: Game = {
	actions: !isRunning && DEV_MODE ? table.create(10, 0).map(() => generateAction()) : [],
}

export const _game = createProducer(initialState, {
	dispatched: (state, action: DispatchedAction, timestamp: number) => ({
		...state,
		actions: [...state.actions, { ...action, timestamp }],
	}),
	clear: (state) => ({
		...state,
		actions: [],
	}),
})
