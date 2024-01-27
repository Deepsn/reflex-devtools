import Object from "@rbxts/object-utils"

type State = { [key: string]: unknown }

export default function getDiff(state: State, lastState: State) {
	const diff: { [key: string]: unknown } = {}

	for (const [key, value] of Object.entries(lastState)) {
		if (type(value) !== "table") {
			if (value !== state[key]) {
				diff[key] = "[[removed]]"
			}
		} else if (state[key] !== undefined) {
			const subDiff = getDiff(value as unknown as State, state[key] as unknown as State)

			if (Object.entries(subDiff).size() > 0) {
				diff[key] = subDiff
			}
		}
	}

	for (const [key, value] of Object.entries(state)) {
		if (type(value) !== "table") {
			if (value !== lastState[key]) {
				diff[key] = value
			}
		} else if (lastState[key] !== undefined) {
			const subDiff = getDiff(value as unknown as State, lastState[key] as unknown as State)

			if (Object.entries(subDiff).size() > 0) {
				diff[key] = subDiff
			}
		}
	}

	return diff
}
