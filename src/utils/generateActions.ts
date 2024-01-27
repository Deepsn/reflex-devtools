import { Action } from "../store/game"

const RANDOM_STRINGS = [
	"Random gaming string",
	"I love reflex",
	"and I love roblox",
	"Two plus two is four",
	"Minus one that's three",
	"Quick maths",
]

export function generateAction(): Action {
	return {
		name: RANDOM_STRINGS[math.random(RANDOM_STRINGS.size() + 1)],
		args: table.create(10, 0).map(() => RANDOM_STRINGS[math.random(RANDOM_STRINGS.size() + 1)]),
		state: {
			buzz: "buzz",
			foo: "foo",
			bar: {
				nested: {
					things: "wow",
				},
				not_nested: "not wow",
				[1]: "interesting key",
				[2]: "interesting key 2",
			},
		},
		timestamp: tick(),
	}
}
