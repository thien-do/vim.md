import { background, Button } from "@moai/core";
import { File } from "app/file/file";
import { PrefsState } from "app/prefs/state/state";
import { Backend } from "backend/interface";
import { getDocumentTitle } from "../document/document";
import { TitleToolbar } from "../toolbar/toolbar";
import s from "./custom.module.css";

interface Props extends PrefsState {
	file: File;
	backend: Backend;
}

export const TitleCustom = (props: Props): JSX.Element => {
	const titleBar = props.backend.ui.titleBar;
	if (titleBar === null) throw Error("Backend does not have titleBar");

	return (
		<div
			className={[
				s.container,
				props.prefs.toolbarVisible ? background.strong : "",
			].join(" ")}
			style={{ height: titleBar.height }}
		>
			<div className={s.toggle} style={{ left: titleBar.left }}>
				<TitleToolbar
					size={Button.sizes.small}
					prefs={props.prefs}
					setPrefs={props.setPrefs}
				/>
			</div>
			<div className={s.title}>
				{getDocumentTitle({
					file: props.file,
					path: props.backend.path,
				})}
			</div>
		</div>
	);
};
