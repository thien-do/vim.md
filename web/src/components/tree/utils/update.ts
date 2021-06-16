import { TreeNode } from "../tree";

interface Params<T extends keyof TreeNode> {
	/** Start from here */
	current: TreeNode;
	/** Id of the node to be updated */
	id: string;
	/** The name of the property to be updated */
	key: T;
	/** The new value of the property */
	value: TreeNode[T];
}

/**
 * Update a property of a node
 */
export const updateTreeNode = <T extends keyof TreeNode>(
	params: Params<T>
): TreeNode => {
	const { current, id, key, value } = params;
	if (current.id === id) {
		return { ...current, [key]: value };
	} else if (current.children !== undefined) {
		const children = current.children.map((child) => {
			return updateTreeNode({ current: child, id, key, value });
		});
		return { ...current, children };
	} else {
		return current;
	}
};
