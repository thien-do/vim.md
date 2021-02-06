import { Button } from "@moai/core";
import { ChevronRight } from "@moai/icon/hrs";
import { SetState } from "utils/state";

export interface TreeNode {
	id: string;
	label: string;
	/**
	 * May be undefined when:
	 * - Node is a leaf
	 * - Node is not fetched in case of async Tree
	 */
	children?: TreeNode[];
	/**
	 * Required in case async Tree (i.e. props.loadChildren is defined) since
	 * parent nodes also have undefined children before loading
	 */
	isLeaf?: boolean;
}

interface Props {
	/**
	 * A tree's shape is completely controlled. The Tree component cannot
	 * change the tree shape (root) on its own.
	 */
	node: TreeNode;
	/**
	 * Because Tree is a controlled component, it can only ask the host to
	 * load children and update the root on their side.
	 *
	 * This returns "void" since it expects the "root" prop will be update and
	 * thus leads to a new render altogether.
	 */
	loadChildren?: (node: TreeNode) => Promise<void>;
	/** Controlled selected nodes */
	selected: Set<string>;
	setSelected: SetState<Set<string>>;
	/** Controlled expanded nodes */
	expanded: Set<string>;
	setExpanded: SetState<Set<string>>;
}

const isLeaf = (node: TreeNode): boolean => {
	if (node.isLeaf === undefined) {
		return node.children === undefined; // Sync
	} else {
		return node.isLeaf; // Async
	}
};

const toggle = async (props: Props): Promise<void> => {
	const expanded = new Set(props.expanded);
	if (expanded.has(props.node.id)) {
		expanded.delete(props.node.id);
	} else {
		await props.loadChildren?.(props.node);
		expanded.add(props.node.id);
	}
	props.setExpanded(expanded);
};

// Extract "node" here to ensure it would never be passed down (recursively)
export const Tree = ({ node, ...rest }: Props): JSX.Element => (
	<div>
		{isLeaf(node) === false && (
			<div>
				<Button
					icon={ChevronRight}
					iconLabel="Toggle folder"
					onClick={() => toggle({ node, ...rest })}
				/>
			</div>
		)}
		{rest.selected.has(node.id) && "Selected"}
		<div>{node.label}</div>
		{node.children && rest.expanded.has(node.id) && (
			<div>
				{node.children.map((child) => (
					<div key={child.id}>
						<Tree {...rest} node={child} />
					</div>
				))}
			</div>
		)}
	</div>
);
