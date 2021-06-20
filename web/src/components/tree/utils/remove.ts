import { TreeNode } from "../tree";

interface Params {
	/** Start from here */
	current: TreeNode;
	/** Id of the node to be removed */
	id: string;
}

/**
 * Remove a node from tree.
 */
export const removeTreeNode = (
	params: Params
): TreeNode => {
  const { current, id } = params;
  if (current.children !== undefined) {
    const children = current.children
      .filter(child => child.id !== id)
      .map((child) => {
        return removeTreeNode({ current: child, id });
      });
		return { ...current, children };
	} else {
		return current;
  }
};
