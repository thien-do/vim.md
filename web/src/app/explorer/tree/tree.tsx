import { FileState, isGoodToGo } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { Tree, TreeNode } from "components/tree/tree";
import { TreeUtils } from "components/tree/utils";
import { useEffect, useState } from "react";
import { Store } from "store/interface";
import { useExpanded } from "./expanded";
import { loadPathNodes } from "./load";

interface Props extends FileState {
	store: Store;
	prefs: Prefs;
	rootPath: string;
}

const addItemToSet = (item: string) => (prev: Set<string>): Set<string> => {
	if (prev.has(item)) return prev;
	const next = new Set(prev);
	next.add(item);
	return next;
}

export const ExplorerTree = (props: Props): JSX.Element | null => {
	const [rootNode, setRootNode] = useState<null | TreeNode>(null);
	const { expanded, setExpanded } = useExpanded();

	const { rootPath, file, setFile } = props;
	const [{ list }, { fileType }] = [props.store, props.prefs];

	// Reset state when rootPath is changed
	useEffect(() => {
		if (rootPath === null) {
			setRootNode(null);
			setExpanded(new Set());
			return;
		}
		loadPathNodes(rootPath, { fileType, list }).then((children) => {
			const label = rootPath.split("/").slice(-1)[0];
			setRootNode({ id: rootPath, label, children, isLeaf: false });
			// Ensure root is expanded AND don't lost other expanded states
			setExpanded(addItemToSet(rootPath));
		});
	}, [rootPath, list, setRootNode, setExpanded, fileType]);

	if (rootNode === null) return null;

	const loadChildren = async (node: TreeNode): Promise<void> => {
		if (node.isLeaf === true) throw Error("Current node is a leaf");
		if (rootNode === null) throw Error("Root node is null");
		if (node.children !== undefined) return;
		const newRoot = TreeUtils.updateNode({
			node: rootNode,
			id: node.id,
			key: "children",
			value: await loadPathNodes(node.id, { list, fileType }),
		});
		setRootNode(newRoot);
	};

	const setSelected = async (set: Set<string>) => {
		if ((await isGoodToGo(file)) === false) return;
		const path = Array.from(set)[0];
		setFile({ path, saved: true });
	};

	return (
		<Tree
			expanded={expanded}
			setExpanded={setExpanded}
			selected={new Set(file.path === null ? [] : [file.path])}
			setSelected={setSelected}
			loadChildren={loadChildren}
			parentMode="expand"
			node={rootNode}
		/>
	);
};
