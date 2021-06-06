import { FileState, isGoodToGo } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { Tree, TreeNode } from "components/tree/tree";
import { TreeUtils } from "components/tree/utils";
import { useCallback, useEffect, useState } from "react";
import { Store, StoreFile } from "store/interface";
import s from "./tree.module.css";

interface Props extends FileState {
	store: Store;
	prefs: Prefs;
	rootPath: string;
}

const EXPANDED_KEY = "vdm-explorer-expanded";

const useSetSave = (key: string, set: Set<string>): void => {
	useEffect(() => {
		const array = Array.from(set);
		window.localStorage.setItem(key, JSON.stringify(array));
	}, [set, key]);
};

const getInitialSet = (key: string): Set<string> => {
	const stored = window.localStorage.getItem(key);
	if (stored === null) return new Set();
	const array = JSON.parse(stored);
	if (Array.isArray(array) === true) return new Set(array);
	throw Error(`Stored "${key}" is not an array`);
};

const toTreeNode = (parentPath: string) => (file: StoreFile): TreeNode => ({
	id: `${parentPath}/${file.name}`,
	label: file.name,
	isLeaf: file.isDirectory === false,
	children: undefined, // Don't know yet
});

const isMarkdown = (file: StoreFile): boolean =>
	file.isDirectory || file.name.endsWith("md") || file.name.endsWith("mdx");

export const ExplorerTree = (props: Props): JSX.Element | null => {
	const [rootNode, setRootNode] = useState<null | TreeNode>(null);
	const [expanded, setExpanded] = useState(() => getInitialSet(EXPANDED_KEY));

	const { rootPath, file, setFile } = props;
	const { list: _list } = props.store;
	const { fileType } = props.prefs;

	const list: typeof _list = useCallback(
		async (path) => {
			const files = await _list(path);
			return fileType === "all" ? files : files.filter(isMarkdown);
		},
		[_list, fileType]
	);

	// Save state to localStorage
	useSetSave(EXPANDED_KEY, expanded);

	// Reset state when rootPath is changed
	useEffect(() => {
		if (rootPath === null) return void setRootNode(null);
		(async () => {
			const files = await list(rootPath);
			setRootNode({
				id: rootPath,
				label: rootPath.split("/").slice(-1)[0],
				children: files.map(toTreeNode(rootPath)),
				isLeaf: false,
			});
			// Expand root by default
			setExpanded((prev) => {
				const next = new Set(prev);
				next.add(rootPath);
				return next;
			});
		})();
	}, [rootPath, list, setRootNode]);

	// Load children into a node
	const loadChildren = async (node: TreeNode): Promise<void> => {
		if (node.isLeaf === true) throw Error("Current node is a leaf");
		if (rootNode === null) throw Error("Root node is null");
		if (node.children !== undefined) return;
		const files = await list(node.id);
		const children = files.map(toTreeNode(node.id));
		const newRoot = TreeUtils.updateNode({
			node: rootNode,
			id: node.id,
			key: "children",
			value: children,
		});
		setRootNode(newRoot);
	};

	if (rootNode === null) return null;

	return (
		<div className={s.container}>
			<Tree
				expanded={expanded}
				setExpanded={setExpanded}
				selected={new Set(file.path === null ? [] : [file.path])}
				setSelected={async (set: Set<string>) => {
					if ((await isGoodToGo(file)) === false) return;
					const path = Array.from(set)[0];
					setFile({ path, saved: true });
				}}
				loadChildren={loadChildren}
				parentMode="expand"
				node={rootNode}
			/>
		</div>
	);
};
