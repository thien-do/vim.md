import { Button, Pane, ButtonGroup } from "@moai/core";
import { AiOutlineFileAdd, AiOutlineFolder } from "react-icons/ai";
import { FileState } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { PaneHeading } from "components/pane/heading/heading";
import { useEffect } from "react";
import { pathUtils } from "utils/path";
import { useStorageState } from "utils/state";
import s from "./explorer.module.css";
import { ExplorerTree } from "./tree/tree";
import { storage as store } from "../../utils/storage";

interface Props extends FileState {
	prefs: Prefs;
}

const ROOT_PATH_KEY = "vdm-explorer-root-path";

export const Explorer = (props: Props): JSX.Element => {
	const [path, setPath] = useStorageState<string>(ROOT_PATH_KEY);

	// See the comment at Store["showOpenDialog"]
	const open = store.showOpenDialog;
	const fixedPath: string | null = typeof open === "string" ? open : null;
	const isFixedPath = typeof fixedPath === "string";

	useEffect(() => {
		if (typeof fixedPath === "string") setPath(fixedPath);
	}, [fixedPath, setPath]);

	const openFolder = async (): Promise<void> => {
		const open = store.showOpenDialog;
		if (typeof open === "string")
			throw Error("Store doesn't support opening a folder");
		const path = await open();
		if (typeof path === "string") setPath(path);
	};

	const addNewFile = async (): Promise<void> => {
		const save = store.showSaveDialog;
		if (typeof open === "string")
			throw Error("Store doesn't support saving a file");
		const newPath = await save();
		if (typeof newPath === "string") {
			await store.write(newPath, "");
		}
	}

	const changeFolderButton = <Button
		style={Button.styles.flat}
		onClick={openFolder}
		icon={AiOutlineFolder}
		iconLabel="Change Folder"
	/>
	const addFileButton = <Button
		style={Button.styles.flat}
		onClick={addNewFile}
		icon={AiOutlineFileAdd}
		iconLabel="New File"
	/>

	const heading =
		path === null ? (
			<PaneHeading children="No folder opened" />
		) : (
			<PaneHeading
				children={pathUtils.getLast(path)}
				aside={
					isFixedPath ? null : (
						<ButtonGroup>
							{[
								{ fill: false, element: addFileButton },
								{ fill: false, element: changeFolderButton }
							]}
						</ButtonGroup>
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
				store={store}
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
