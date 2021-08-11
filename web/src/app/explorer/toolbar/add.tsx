import { Button, TreeNode, TreeUtils } from "@moai/core";
import { BackendPath } from "backend/interface";
import { RiFileAddLine } from "react-icons/ri";
import { ExplorerToolbarProps } from "./toolbar";

type Props = ExplorerToolbarProps;

const getParents = (props: Props, path: string): [string, BackendPath][] => {
	let current = path;
	const dirs: [string, BackendPath][] = [];
	if (props.rootNode === null) throw Error("No folder is opened");
	while (current !== props.rootNode.id) {
		const parsed = props.backend.path.parse(current);
		dirs.push([current, parsed]);
		current = parsed.dir;
	}
	dirs.reverse();
	return dirs;
};

/**
 * Add a "base" as a node in "dir"'s children
 */
const addFileToTree = (props: Props, path: string): TreeNode => {
	if (props.rootNode === null) throw Error("No folder is opened");
	let node: TreeNode = props.rootNode;
	// File is outside of explorer
	if (path.startsWith(node.id) === false) return node;
	// Prepare dir
	const parents: [string, BackendPath][] = getParents(props, path);
	parents.forEach((parent, index) => {
		const [id, parsed] = parent;
		if (TreeUtils.isTreeNodeExist({ node, id })) return;
		const isLeaf = index === parents.length - 1;
		const children = isLeaf ? undefined : [];
		const addNode: TreeNode = { id, label: parsed.base, isLeaf, children };
		node = TreeUtils.addTreeNode({ node, id: parsed.dir, sort: true, addNode });
	});
	return node;
};

const addFile = async (props: Props): Promise<void> => {
	const { backend } = props;
	const path = await backend.storage.showSaveDialog();
	if (path === null) return;
	// Create the file on file system
	await backend.storage.write(path, "");
	// Add the file to our explorer
	const current = props.rootNode;
	if (current === null) throw Error("No folder is opened");
	const rootNode = addFileToTree(props, path);
	props.setRootNode(rootNode);
};

export const ExplorerToolbarAdd = (props: Props): JSX.Element | null => {
	if (props.rootPath === null) return null; // Not opened yet
	return (
		<Button
			style={Button.styles.flat}
			onClick={() => addFile(props)}
			icon={RiFileAddLine}
			iconLabel="New File"
		/>
	);
};
