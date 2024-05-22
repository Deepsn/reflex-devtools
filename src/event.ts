import { ReplicatedStorage } from "@rbxts/services"

export let event = ReplicatedStorage.FindFirstChild("REFLEX_DEVTOOLS_CLIENT") as BindableEvent | undefined

if (!event) {
	event = new Instance("BindableEvent")
	event.Name = "REFLEX_DEVTOOLS_CLIENT"
	event.Parent = ReplicatedStorage

	print(`[reflex-devtools] Client event created on ${event.GetFullName()}`)
}
