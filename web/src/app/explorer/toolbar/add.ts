import { BackendPath, BackendPathUtils } from "backend/interface";
import { TreeNode } from "components/tree/tree";
import { addTreeNode } from "components/tree/utils/add";
import { isTreeNodeExist } from "components/tree/utils/exist";

interface Params {
	/** Start here */
	node: TreeNode;
	path: string;
	pathUtils: BackendPathUtils;
}

const getParents = (params: Params): [string, BackendPath][] => {
	const { pathUtils, path, node } = params;
	let current = path;
	const dirs: [string, BackendPath][] = [];
	while (current !== node.id) {
		const parsed = pathUtils.parse(current);
		dirs.push([current, parsed]);
		current = parsed.dir;
	}
	dirs.reverse();
	return dirs;
};

/**
 * Add a "base" as a node in "dir"'s children
 */
export const addFileToTree = (params: Params): TreeNode => {
	const { path } = params;
	let node = params.node;
	// File is outside of explorer
	if (path.startsWith(node.id) === false) return node;
	// Prepare dir
	const parents: [string, BackendPath][] = getParents(params);
	parents.forEach((parent, index) => {
		const [id, parsed] = parent;
		if (isTreeNodeExist({ node, id })) return;
		const isLeaf = index === parents.length - 1;
		const children = isLeaf ? undefined : [];
		const addNode: TreeNode = { id, label: parsed.base, isLeaf, children };
		node = addTreeNode({ node, id: parsed.dir, sort: true, addNode });
	});
	console.log(node);
	return node;
};
