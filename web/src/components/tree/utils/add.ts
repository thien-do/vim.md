import { pathUtils } from "utils/path";
import { TreeNode } from "../tree";
import { isTreeLeaf } from "./leaf";

const ERRORS = {
	addToLeaf: (id: string) =>
		`"${id}" is a leaf. It should be a branch to receive new node.`,
	parentIsLeaf: (id: string) =>
		`"${id}" is a leaf. It should be a branch to go further.`,
};

interface Params {
	current: TreeNode;
	parentId: string;
	target: TreeNode;
}

const compareNode = (a: TreeNode, b: TreeNode): number =>
	a.id.localeCompare(b.id);

const handleParent = ({ current, target }: Params): TreeNode => {
	// Can't add to leaf
	if (isTreeLeaf(current)) throw Error(ERRORS.addToLeaf(current.id));
	// Branch is not expanded. We intentionally return a clone here to
	// indicate that we did handle but choose to skip it, to avoid the
	// parent creating new child
	if (current.children === undefined) return { ...current };
	// Branch is expanded
	const children = [...current.children, target];
	children.sort(compareNode);
	return { ...current, children };
};

const handleGrandParent = ({ current, target, parentId }: Params): TreeNode => {
	// Can't go further if it's a leaf
	if (isTreeLeaf(current)) throw Error(ERRORS.parentIsLeaf(current.id));
	// Branch is not expanded. We intentionally return a clone here to
	// indicate that we did handle but choose to skip it, to avoid the
	// parent creating new child
	if (current.children === undefined) return { ...current };

	// Try with existing children
	const children = current.children.map((child) => {
		return addTreeChild({ current: child, parentId, target });
	});
	const olds = new Set(current.children); // Performance optimize
	const handled = children.some((child) => olds.has(child) === false);

	// None of the existing children handled us
	if (handled === false) {
		const label = pathUtils.oneStepCloser(parentId, current.id);
		const id = `${current.id}/${label}`;
		children.push({ id, label, children: [], isLeaf: false });
		children.sort(compareNode);
	}
	return { ...current, children };
};

/**
 * Add a "node" as children of "parent", starting from "current", recursively.
 */
export const addTreeChild = (params: Params): TreeNode => {
	const { current, parentId } = params;
	if (current.id === parentId) {
		return handleParent(params);
	} else if (parentId.startsWith(current.id)) {
		return handleGrandParent(params);
	} else {
		return current;
	}
};
