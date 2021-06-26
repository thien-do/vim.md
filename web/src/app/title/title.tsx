import { background, Button } from "@moai/core";
import { File } from "app/file/file";
import { PrefsState } from "app/prefs/state/state";
import { Backend } from "backend/interface";
import { ToolbarToggle } from "../toolbar/toggle/toggle";
import s from "./title.module.css";

interface Props extends PrefsState {
	file: File;
	backend: Backend;
}

const getTitle = (props: Props): string => {
	const file = props.file;
	const path = props.backend.path;
	const title = file.path ? path.parse(file.path).base : "Untitled";
	const unsaved = file === null || file.saved === false;
	const prefix = unsaved ? "• " : "";
	return `${prefix}${title}`;
};

export const Title = (props: Props): JSX.Element => {
	const titleBar = props.backend.ui.titleBar;
	if (titleBar === null) throw Error("Backend does not have titleBar");

	return (
		<div
			className={[s.container, 
	props.prefs.toolbarVisible ? background.strong : "",
			].join(" ")}
			style={{ height: titleBar.height }}
		>
			<div className={s.toggle} style={{ left: titleBar.left }}>
				<ToolbarToggle
					size={Button.sizes.small}
					prefs={props.prefs}
					setPrefs={props.setPrefs}
				/>
			</div>
			<div className={s.title} children={getTitle(props)} />
		</div>
	);
};
