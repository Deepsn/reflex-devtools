import { store } from "../store"
import { shallowEqual } from "@rbxts/reflex"

const Plugin = plugin || script.FindFirstAncestorWhichIsA("Plugin")

export function listenForChanges() {
	store.subscribe(
		(state) => state.widget,
		(widget, lastWidget) => {
			const settings = { ...widget, open: undefined, selectedIndex: undefined }
			const lastSettings = { ...lastWidget, open: undefined, selectedIndex: undefined }

			if (shallowEqual(settings, lastSettings)) {
				return
			}

			for (const [key, setting] of pairs(settings)) {
				Plugin.SetSetting(`_REFLEX_DEVTOOLS_${key}`, setting)
			}
		},
	)
}

function getSetting<T extends boolean>(key: `_REFLEX_DEVTOOLS_${string}`) {
	return Plugin.GetSetting(key) as T
}

export function configureSettings() {
	if (!Plugin) {
		return
	}

	const autoSelectLatest = getSetting("_REFLEX_DEVTOOLS_autoSelectLatest")
	const enabled = getSetting("_REFLEX_DEVTOOLS_enabled")
	const diffMode = getSetting("_REFLEX_DEVTOOLS_diffMode")
	const showArgs = getSetting("_REFLEX_DEVTOOLS_showArgs")

	store.changeAutoSelectMode(autoSelectLatest)
	store.changeEnabled(enabled)
	store.changeDiffMode(diffMode)
	store.changeShowArgs(showArgs)
}
