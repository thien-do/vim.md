import { Button } from "@moai/core";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { PrefsState, PrefsUpdate } from "app/prefs/state/state";

interface Props extends PrefsState {}

const toggle: PrefsUpdate = (prefs) => ({
	...prefs,
	toolbarVisible: !prefs.toolbarVisible,
});

export const ToolbarToggle = ({ prefs, setPrefs }: Props): JSX.Element => (
	<Button
		icon={prefs.toolbarVisible ? RiArrowUpSLine : RiArrowDownSLine}
		iconLabel="Toggle toolbar"
		onClick={() => void setPrefs(toggle)}
	/>
);
