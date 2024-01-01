import Roact from "@rbxts/roact"
import Object from "@rbxts/object-utils"

export function StateLabel(props: JSX.IntrinsicElement<TextLabel> & { nestedLevel: number }) {
	const propBlacklist = ["nestedLevel"]
	const otherProps = Object.fromEntries(
		Object.entries(props).filter(([key]) => !propBlacklist.includes(key as string)) as [string, unknown][]
	)

	return (
		<textlabel
			{...otherProps}
			AutomaticSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={UDim2.fromOffset(0, 20)}
			TextColor3={Color3.fromRGB(255, 255, 255)}
		>
			<uipadding PaddingLeft={new UDim(0, props.nestedLevel * 10)} />
		</textlabel>
	)
}
