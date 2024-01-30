import Roact from "@rbxts/roact"

export function StateLabel(props: JSX.IntrinsicElement<TextBox> & { nestedLevel?: number }) {
	const { nestedLevel, children } = props
	const otherProps = { ...props, nestedLevel: undefined, children: undefined }

	return (
		<frame AutomaticSize={Enum.AutomaticSize.XY} BackgroundTransparency={1} BorderSizePixel={0}>
			<textbox
				{...otherProps}
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ClearTextOnFocus={false}
				TextEditable={false}
				Size={UDim2.fromOffset(0, 20)}
				TextColor3={Color3.fromRGB(255, 255, 255)}
			>
				{nestedLevel !== undefined && nestedLevel !== 0 && (
					<uipadding PaddingLeft={new UDim(0, nestedLevel * 10)} />
				)}
			</textbox>

			<uilistlayout
				key={"layout"}
				FillDirection={Enum.FillDirection.Horizontal}
				SortOrder={Enum.SortOrder.Name}
				Padding={new UDim(0, 4)}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			{children}
		</frame>
	)
}
