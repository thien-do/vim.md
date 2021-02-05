import { Button } from "@moai/core";
import { ChevronDown, ChevronUp } from "@moai/icon/hrs";
import { PrefsState, PrefsUpdate } from "app/prefs/state/state";

interface Props extends PrefsState {}

const toggle: PrefsUpdate = (prefs) => ({
	...prefs,
	toolbarVisible: !prefs.toolbarVisible,
});

export const ToolbarToggle = ({ prefs, setPrefs }: Props): JSX.Element => (
	<Button
		icon={prefs.toolbarVisible ? ChevronUp : ChevronDown}
		iconLabel="Toggle toolbar"
		onClick={() => void setPrefs(toggle)}
	/>
);
