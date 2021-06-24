import { Button } from "@moai/core";
import { FileType } from "app/prefs/state/state";
import { Backend } from "backend/interface";
import { PaneHeading } from "components/pane/heading/heading";
import { TreeNode } from "components/tree/tree";
import { RiFileAddLine, RiFolderLine } from "react-icons/ri";
import { SetState } from "utils/state";
import { addFileToTree } from "./add";
import { ExplorerToolbarRefresh } from "./refresh";
import s from "./toolbar.module.css";

export interface ExplorerToolbarProps {
	backend: Backend;
	fileType: FileType;
	rootPath: string | null;
	setRootPath: null | SetState<string | null>;
	rootNode: TreeNode | null;
	setRootNode: SetState<TreeNode | null>;
}

const openFolder = async (props: ExplorerToolbarProps): Promise<void> => {
	const open = props.backend.storage.showOpenDialog;
	if (typeof open === "string")
		throw Error("Store doesn't support opening a folder");

	const path = await open();
	if (path === null) return; // Cancel

	if (props.setRootPath === null)
		throw Error("setRootPath is null because of fixed root mode");
	props.setRootPath(path);
};

const createFile = async (props: ExplorerToolbarProps): Promise<void> => {
	const { backend } = props;
	const path = await backend.storage.showSaveDialog();
	if (path === null) return;
	// Create the file on file system
	await backend.storage.write(path, "");
	// Add the file to our explorer
	const current = props.rootNode;
	if (current === null) throw Error("No folder is opened");
	const pathUtils = backend.path;
	const rootNode = addFileToTree({ node: current, path, pathUtils });
	props.setRootNode(rootNode);
};

const Aside = (props: ExplorerToolbarProps): JSX.Element => (
	<div className={s.aside}>
		{props.rootPath !== null && (
			<Button
				style={Button.styles.flat}
				onClick={() => createFile(props)}
				icon={RiFileAddLine}
				iconLabel="New File"
			/>
		)}
		<ExplorerToolbarRefresh {...props} />
		{props.setRootPath !== null && (
			<Button
				style={Button.styles.flat}
				onClick={() => openFolder(props)}
				icon={RiFolderLine}
				iconLabel="Change Folder"
			/>
		)}
	</div>
);

export const ExplorerToolbar = (props: ExplorerToolbarProps): JSX.Element => (
	<PaneHeading aside={<Aside {...props} />}>
		{props.rootPath === null
			? "No folder opened"
			: props.backend.path.parse(props.rootPath).base}
	</PaneHeading>
);
