import { Pane } from "@moai/core";
import { FileState } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { useEffect } from "react";
import { Store } from "store/interface";
import { useStorageState } from "utils/state";
import s from "./explorer.module.css";
import { ExplorerToolbar } from "./toolbar/toolbar";
import { ExplorerBody } from "./body/body";

interface Props extends FileState {
	prefs: Prefs;
	store: Store;
}

const ROOT_PATH_KEY = "vdm-explorer-root-path";

export const Explorer = (props: Props): JSX.Element => {
	const [path, setPath] = useStorageState<string>(ROOT_PATH_KEY);
	const open = props.store.showOpenDialog;

	// See the comment at Store["showOpenDialog"]
	useEffect(() => {
		const fixedPath: string | null = typeof open === "string" ? open : null;
		if (typeof fixedPath === "string") setPath(fixedPath);
	}, [open, setPath]);

	const container = (
		<div className={s.container}>
			<ExplorerToolbar path={path} setPath={setPath} store={props.store} />
			{path !== null && (
				<ExplorerBody
					prefs={props.prefs}
					rootPath={path}
					store={props.store}
					file={props.file}
					setFile={props.setFile}
				/>
			)}
		</div>
	);

	return (
		<div className={s.wrapper}>
			<Pane noPadding fullHeight children={container} />
		</div>
	);
};
