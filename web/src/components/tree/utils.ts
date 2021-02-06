import { TreeNode } from "./tree";

const updateNode = <T extends keyof TreeNode>(params: {
	node: TreeNode;
	id: string;
	key: T;
	value: TreeNode[T];
}): TreeNode => {
	const { node, id, key, value } = params;

	if (node.id === id) {
		return { ...node, [key]: value };
	} else if (node.children !== undefined) {
		const children = node.children.map((child) => {
			return updateNode({ node: child, id, key, value });
		});
		return { ...node, children };
	} else {
		return node;
	}
};

export const TreeUtils = {
	updateNode,
};
