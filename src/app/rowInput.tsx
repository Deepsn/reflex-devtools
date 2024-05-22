import React from "@rbxts/react"

interface Props {
	text: string
	placeholder?: string
	order: number
	onType: (text: string) => void
}

export function RowInput(props: Props) {
	return (
		<textbox
			AutomaticSize={Enum.AutomaticSize.X}
			BackgroundColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.Button)}
			BorderSizePixel={1}
			BorderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ButtonText)}
			Change={{ Text: (rbx) => props.onType(rbx.Text) }}
			Font={Enum.Font.SourceSans}
			LayoutOrder={props.order}
			Size={UDim2.fromOffset(0, 20)}
			PlaceholderColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ButtonText)}
			PlaceholderText={props.placeholder}
			Text={props.text}
			TextColor3={settings().Studio.Theme.GetColor(Enum.StudioStyleGuideColor.ButtonText)}
			TextSize={15}
		>
			<uipadding PaddingLeft={new UDim(0, 5)} PaddingRight={new UDim(0, 5)} key="padding" />
		</textbox>
	)
}
