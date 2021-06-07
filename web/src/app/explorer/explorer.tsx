import { Button, Pane } from "@moai/core";
import { FileState } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { PaneHeading } from "components/pane/heading/heading";
import { useEffect } from "react";
import { Store } from "store/interface";
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

	// See the comment at Store["showOpenDialog"]
	const open = props.store.showOpenDialog;
	const fixedPath: string | null = typeof open === "string" ? open : null;
	const isFixedPath = typeof fixedPath === "string";

	useEffect(() => {
		if (typeof fixedPath === "string") setPath(fixedPath);
	}, [fixedPath, setPath]);

	const openFolder = async (): Promise<void> => {
		const open = props.store.showOpenDialog;
		if (typeof open === "string")
			throw Error("Store doesn't support open a folder");
		const path = await open();
		if (typeof path === "string") setPath(path);
	};

	const heading =
		path === null ? (
			<PaneHeading children="No folder opened" />
		) : (
			<PaneHeading
				children={pathUtils.getLast(path)}
				aside={
					isFixedPath ? null : (
						<Button
							style={Button.styles.flat}
							onClick={openFolder}
							children="Change…"
						/>
					)
				}
			/>
		);

	const body =
		path === null ? (
			<div className={s.empty}>
				<Button highlight onClick={openFolder} children="Open folder…" />
			</div>
		) : (
			<ExplorerTree
				prefs={props.prefs}
				rootPath={path}
				store={props.store}
				file={props.file}
				setFile={props.setFile}
			/>
		);

	return (
		<div className={s.wrapper}>
			<Pane noPadding fullHeight>
				<div className={s.container}>
					<div style={{ marginTop: -1 }} />
					{heading}
					{body}
				</div>
			</Pane>
		</div>
	);
};
