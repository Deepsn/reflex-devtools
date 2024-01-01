import Roact, { useState } from "@rbxts/roact"
import Object from "@rbxts/object-utils"

export function StateFrame(props: JSX.IntrinsicElement<Frame> & { nestedLevel: number }) {
	const propBlacklist = ["nestedLevel"]
	const otherProps = Object.fromEntries(
		Object.entries(props).filter(([key]) => !propBlacklist.includes(key as string)) as [string, unknown][]
	)

	const [collapsed, setCollapsed] = useState(true)

	return collapsed ? (
		<textbutton
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Event={{
				MouseButton1Click: () => setCollapsed(false)
			}}
			Size={new UDim2(0, 40, 0, 20)}
			Text={"{ ... }"}
			TextColor3={Color3.fromRGB(255, 255, 255)}
		>
			<uipadding PaddingLeft={new UDim(0, props.nestedLevel * 10)} />
		</textbutton>
	) : (
		<textbutton
			{...otherProps}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Event={{
				MouseButton1Click: () => setCollapsed(true)
			}}
			Size={UDim2.fromScale(1, 0)}
			Text={""}
		/>
	)
}
