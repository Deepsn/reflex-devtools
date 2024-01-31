/// <reference types="@rbxts/types/plugin" />

import { useProducer, UseProducerHook, useSelector, UseSelectorHook } from "@rbxts/react-reflex"
import { CombineProducers, combineProducers, InferState } from "@rbxts/reflex"
import { _game } from "./game"
import { widget } from "./widget"

const slices = { widget, game: _game }

export type Store = CombineProducers<typeof slices>

export type RootState = InferState<Store>

export const useRootProducer: UseProducerHook<Store> = useProducer
export const useRootSelector: UseSelectorHook<Store> = useSelector

export const store = combineProducers(slices)
