import { background } from "@moai/core";
import { File } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { pathUtils } from "utils/path";
import s from "./title.module.css";

interface Props {
	file: File;
	prefs: Prefs;
}

const getTitle = (file: File): string => {
	const title = file.path ? pathUtils.getLast(file.path) : "Untitled";
	const unsaved = file === null || file.saved === false;
	const prefix = unsaved ? "• " : "";
	return `${prefix}${title}`;
};

export const Title = (props: Props): JSX.Element => (
	<div
		className={[
			s.container,
			props.prefs.toolbarVisible ? background.strong : "J",
		].join(" ")}
	>
		<div className={s.title} children={getTitle(props.file)} />
	</div>
);
