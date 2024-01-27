import Roact, { Element, useEffect, useState } from "@rbxts/roact"
import { t } from "@rbxts/t"
import { StateFrame } from "./stateFrame"
import { StateLabel } from "./stateLabel"
import { useRootSelector } from "../store"
import getDiff from "../utils/getDiff"
import { State } from "../store/game"

interface Props {
	state: State
	lastState: State
}

export function ActionState(props: Props) {
	const [elements, setElements] = useState<Element[]>([])
	const diffMode = useRootSelector((state) => state.widget.diffMode)

	useEffect(() => {
		function mapState(value: defined, key?: string, nestedLevel = 0) {
			if (t.table(value)) {
				const children: Element[] = []

				children.push(<StateLabel Text={"{"} nestedLevel={nestedLevel} />)

				for (const [nestedKey, nestedValue] of pairs(value)) {
					children.push(mapState(nestedValue, nestedKey as string, nestedLevel + 1))
				}

				children.push(<StateLabel Text={"}"} nestedLevel={nestedLevel} />)

				return (
					<StateFrame nestedLevel={nestedLevel}>
						<uilistlayout />
						{children}
					</StateFrame>
				)
			}

			return <StateLabel Text={(key !== undefined ? `['${key}'] = ` : "") + value} nestedLevel={nestedLevel} />
		}

		setElements([mapState(diffMode ? getDiff(props.state, props.lastState) : props.state)])
	}, [props.state, diffMode])

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
