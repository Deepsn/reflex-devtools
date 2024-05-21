import React, { type Element, useMemo } from "@rbxts/react"
import { t } from "@rbxts/t"
import { useRootSelector } from "../store"
import type { State } from "../store/game"
import getDiff from "../utils/getDiff"
import { StateFrame } from "./stateFrame"
import { StateLabel } from "./stateLabel"

interface Props {
	state: State
	lastState: State | undefined
}

export function parseValueKey(key?: unknown) {
	return key ? `[${tonumber(key) === undefined ? `"${key}"` : key}] = ` : ""
}

function mapState(value: defined, key?: unknown, nestedLevel = 0, _index?: number) {
	const parsedKey = parseValueKey(key)

	if (!t.table(value)) {
		return (
			<StateLabel
				key={_index && string.format("%02d", _index)}
				Text={`${parsedKey}${value}`}
				nestedLevel={nestedLevel}
			/>
		)
	}

	const children: Element[] = []
	let index = 0

	for (const [nestedKey, nestedValue] of pairs(value)) {
		index++
		children.push(mapState(nestedValue, nestedKey, nestedLevel + 1, index))
	}

	return (
		<StateFrame
			key={_index && string.format("%02d", _index)}
			valueKey={parsedKey}
			nestedLevel={nestedLevel}
			isEmpty={index === 0}
		>
			{children}
		</StateFrame>
	)
}

export function ActionState(props: Props) {
	const diffMode = useRootSelector((state) => state.widget.diffMode)

	const elements = useMemo(
		() => mapState(diffMode && props.lastState ? getDiff(props.state, props.lastState) : props.state),
		[props.state, diffMode],
	)

	return (
		<scrollingframe
			AutomaticCanvasSize={Enum.AutomaticSize.Y}
			BackgroundTransparency={1}
			BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Border)}
			ScrollBarImageColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar)}
			ScrollBarThickness={6}
			Size={UDim2.fromScale(1, 1)}
		>
			{elements}
		</scrollingframe>
	)
}
