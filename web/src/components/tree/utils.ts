import { TreeNode } from "./tree";

const isLeaf = (node: TreeNode): boolean => {
	if (node.isLeaf === undefined) {
		return node.children === undefined; // Sync
	} else {
		return node.isLeaf; // Async
	}
};

const addNode = (params: {
	current: TreeNode;
	id: string;
	node: TreeNode;
}): TreeNode => {
	// const { current, id, node } = params;
	return params.current;
}

const updateNode = <T extends keyof TreeNode>(params: {
	current: TreeNode;
	id: string;
	key: T;
	value: TreeNode[T];
}): TreeNode => {
	const { current, id, key, value } = params;
	if (current.id === id) {
		return { ...current, [key]: value };
	} else if (current.children !== undefined) {
		const children = current.children.map((child) => {
			return updateNode({ current: child, id, key, value });
		});
		return { ...current, children };
	} else {
		return current;
	}
};

export const TreeUtils = {
	isLeaf,
	addNode,
	updateNode,
};
