import { background } from "@moai/core";
import { File } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { BackendPathUtils } from "backend/interface";
import s from "./title.module.css";

interface Props {
	file: File;
	prefs: Prefs;
	path: BackendPathUtils;
}

const getTitle = (props: Props): string => {
	const { file, path } = props;
	const title = file.path ? path.parse(file.path).base : "Untitled";
	const unsaved = file === null || file.saved === false;
	const prefix = unsaved ? "• " : "";
	return `${prefix}${title}`;
};

export const Title = (props: Props): JSX.Element => (
	<div
		className={[
			s.container,
			props.prefs.toolbarVisible ? background.strong : "",
		].join(" ")}
	>
		<div className={s.title} children={getTitle(props)} />
	</div>
);
