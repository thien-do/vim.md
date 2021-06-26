import { Tooltip, Button, ButtonSize } from "@moai/core";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { PrefsState, PrefsUpdate } from "app/prefs/state/state";

interface Props extends PrefsState {
	size: ButtonSize;
}

const toggle: PrefsUpdate = (prefs) => ({
	...prefs,
	toolbarVisible: !prefs.toolbarVisible,
});

export const ToolbarToggle = (props: Props): JSX.Element => {
	const { prefs, setPrefs, size } = props;
	return (
		<Tooltip content="Toggle toolbar">
			<Button
				icon={prefs.toolbarVisible ? RiArrowUpSLine : RiArrowDownSLine}
				iconLabel="Toggle toolbar"
				onClick={() => void setPrefs(toggle)}
				size={size}
			/>
		</Tooltip>
	);
};
