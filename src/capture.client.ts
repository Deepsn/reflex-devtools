import { t } from "@rbxts/t"
import { event } from "event"
import { store } from "store"

const guard = t.interface({
	name: t.string,
	args: t.array(t.any),
	state: t.keys(t.string) as unknown as t.check<{ [key: string]: unknown }>,
})

event?.Event.Connect((payload) => {
	if (!guard(payload)) return warn("[reflex-devtools] payload didnt pass type guard")

	const timestamp = DateTime.now().UnixTimestampMillis

	store.dispatched(payload, timestamp)
})
