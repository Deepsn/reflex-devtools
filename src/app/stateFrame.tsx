import Roact, { Children, Element, useState } from "@rbxts/roact"
import { StateLabel } from "./stateLabel"

interface StateFrameProps {
	nestedLevel: number
	valueKey?: string
	isEmpty: boolean
}

export function StateFrame({
	[Children]: children,
	valueKey,
	nestedLevel,
	isEmpty,
}: StateFrameProps & { [Children]?: Element[] }) {
	const [collapsed, setCollapsed] = useState(true)

	const ArrowIcon = () => (
		<textbutton
			AutomaticSize={Enum.AutomaticSize.XY}
			Size={UDim2.fromScale(0.043, 0.027)}
			Text={collapsed ? "▶" : "▼"}
			Event={{
				MouseButton1Click: () => setCollapsed(!collapsed),
			}}
			FontFace={new Font("rbxasset://fonts/families/PressStart2P.json", Enum.FontWeight.Bold)}
			TextSize={15}
			TextColor3={Color3.fromHex("#fff")}
			BackgroundTransparency={0.5}
			BorderSizePixel={0}
		/>
	)

	return collapsed ? (
		<StateLabel Text={valueKey} nestedLevel={nestedLevel}>
			{!isEmpty && <ArrowIcon />}
			<StateLabel Text={isEmpty ? "{}" : "{ ... }"} />
		</StateLabel>
	) : (
		<frame
			BackgroundTransparency={1}
			BorderSizePixel={0}
			AutomaticSize={Enum.AutomaticSize.XY}
			Size={UDim2.fromScale(1, 0)}
		>
			<uilistlayout key={"layout"} SortOrder={Enum.SortOrder.Name} />

			<StateLabel key={0} Text={valueKey} nestedLevel={nestedLevel}>
				<ArrowIcon />
				<StateLabel Text={"{"} />
			</StateLabel>

			{children}

			<StateLabel Text={"}"} key={children ? children.size() + 1 : 1} nestedLevel={nestedLevel} />
		</frame>
	)
}
