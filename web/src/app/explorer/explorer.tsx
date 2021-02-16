import { Button, Pane } from "@moai/core";
import { FileState } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { PaneHeading } from "components/pane/heading/heading";
import { Store } from "store/store";
import { pathUtils } from "utils/path";
import { useStorageState } from "utils/state";
import s from "./explorer.module.css";
import { ExplorerTree } from "./tree/tree";

interface Props extends FileState {
	prefs: Prefs;
	store: Store;
}

const ROOT_PATH_KEY = "vdm-explorer-root-path";

export const Explorer = (props: Props): JSX.Element => {
	const [path, setPath] = useStorageState<string>(ROOT_PATH_KEY);

	const openFolder = async (): Promise<void> => {
		const path = await props.store.showOpenDialog();
		if (typeof path === "string") setPath(path);
	};

	const aside = (
		<Button
			style={Button.styles.flat}
			onClick={openFolder}
			children="Change…"
		/>
	);

	const body = path ? (
		<div className={s.container}>
			<div style={{ marginTop: -1 }} />
			<PaneHeading children={pathUtils.getLast(path)} aside={aside} />
			<ExplorerTree
				prefs={props.prefs}
				rootPath={path}
				store={props.store}
				file={props.file}
				setFile={props.setFile}
			/>
		</div>
	) : (
		<div>
			<Button onClick={openFolder} children="Open folder…" />
		</div>
	);

	return (
		<div className={s.wrapper}>
			<Pane noPadding fullHeight children={body} />
		</div>
	);
};
