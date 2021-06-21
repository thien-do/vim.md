import { TreeNode } from "../tree";

interface Params {
  /** Start from here */
  node: TreeNode;
  /** Id of the node to be removed */
  id: string;
}

/**
 * Remove a node from tree.
 */
export const removeTreeNode = (params: Params): TreeNode => {
  const { node, id } = params;
  if (node.children === undefined) {
    return node;
  } else {
    return {
      ...node,
      children: node.children
        // remove target file
        .filter(child => child.id !== id)
        // traverse children node to continue 
        .map(child => {
          return removeTreeNode({ node: child, id });
        })
    }
  }
}
