import { Button } from "@moai/core";
import { Backend } from "backend/interface";
import { PaneHeading } from "components/pane/heading/heading";
import { TreeNode } from "components/tree/tree";
import { addTreeChild } from "components/tree/utils/add";
import { RiFileAddLine, RiFolderLine } from "react-icons/ri";
import { SetState } from "utils/state";
import s from "./toolbar.module.css";

interface Props {
	backend: Backend;
	rootPath: string | null;
	setRootPath: null | SetState<string | null>;
	rootNode: TreeNode | null;
	setRootNode: SetState<TreeNode | null>;
}

const openFolder = async (props: Props): Promise<void> => {
	const open = props.backend.storage.showOpenDialog;
	if (typeof open === "string")
		throw Error("Store doesn't support opening a folder");

	const path = await open();
	if (path === null) return; // Cancel

	if (props.setRootPath === null)
		throw Error("setRootPath is null because of fixed root mode");
	props.setRootPath(path);
};

const createFile = async (props: Props): Promise<void> => {
	const { backend } = props;
	const path = await backend.storage.showSaveDialog();
	if (path === null) return;
	// Create the file on file system
	await backend.storage.write(path, "");
	// Add the file to our explorer
	const current = props.rootNode;
	if (current === null) throw Error("No folder is opened");
	const { base: label, dir: parentId } = backend.path.parse(path);
	const target: TreeNode = { id: path, label, isLeaf: true };
	const rootNode = addTreeChild({ current, parentId, target });
	props.setRootNode(rootNode);
};

const Aside = (props: Props): JSX.Element => (
	<div className={s.aside}>
		{props.rootPath !== null && (
			<Button
				style={Button.styles.flat}
				onClick={() => createFile(props)}
				icon={RiFileAddLine}
				iconLabel="New File"
			/>
		)}
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

export const ExplorerToolbar = (props: Props): JSX.Element => (
	<PaneHeading aside={<Aside {...props} />}>
		{props.rootPath === null
			? "No folder opened"
			: props.backend.path.parse(props.rootPath).base}
	</PaneHeading>
);
