import { background } from "@moai/core";
import { File } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { Backend } from "backend/interface";
import s from "./title.module.css";

interface Props {
	file: File;
	prefs: Prefs;
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
	const height = props.backend.ui.titleBarHeight;
	if (height === null) throw Error("Backend does not have titleBarHeight");
	return (
		<div
			className={[
				s.container,
				props.prefs.toolbarVisible ? background.strong : "",
			].join(" ")}
			style={{ height }}
		>
			<div className={s.title} children={getTitle(props)} />
		</div>
	);
};
