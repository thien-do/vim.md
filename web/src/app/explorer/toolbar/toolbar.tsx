import { Button } from "@moai/core";
import { PaneHeading } from "components/pane/heading/heading";
import { TreeNode } from "components/tree/tree";
import { addTreeChild } from "components/tree/utils/add";
import { RiFileAddLine, RiFolderLine } from "react-icons/ri";
import { Store } from "store/interface";
import { pathUtils } from "utils/path";
import { SetState } from "utils/state";
import s from "./toolbar.module.css";

interface Props {
	store: Store;
	rootPath: string | null;
	setRootPath: null | SetState<string | null>;
	rootNode: TreeNode | null;
	setRootNode: SetState<TreeNode | null>;
}

const openFolder = async (props: Props): Promise<void> => {
	if (typeof props.store.showOpenDialog === "string")
		throw Error("Store doesn't support opening a folder");
	const path = await props.store.showOpenDialog();
	if (path === null) return; // Cancel
	if (props.setRootPath === null)
		throw Error("setRootPath is null because of fixed root mode");
	props.setRootPath(path);
};

const createFile = async (props: Props): Promise<void> => {
	const path = await props.store.showSaveDialog();
	if (path === null) return;
	// Create the file on file system
	await props.store.write(path, "");
	// Add the file to our explorer
	const current = props.rootNode;
	if (current === null) throw Error("No folder is opened");
	const { fullName, directory } = pathUtils.splitPath(path);
	const [label, parentId] = [fullName, directory];
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
			: pathUtils.splitPath(props.rootPath).fullName}
	</PaneHeading>
);
