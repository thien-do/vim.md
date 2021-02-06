import { Button, Pane } from "@moai/core";
import { PaneHeading } from "components/pane/heading/heading";
import { Tree, TreeNode } from "components/tree/tree";
import { useEffect, useState } from "react";
import { Store, StoreFile } from "store/store";
import s from "./explorer.module.css";

interface Props {
	store: Store;
}

const getLast = (root: string): string => {
	const parts = root.split("/");
	return parts[parts.length - 1];
};

const PATH_KEY = "vdm-root-path";

const toTreeNode = (path: string) => (file: StoreFile): TreeNode => ({
	id: `${path}/${file.name}`,
	label: file.name,
	isLeaf: file.isDirectory === false,
	children: undefined, // Don't know yet
});

const getNode = (files: StoreFile[], path: string): TreeNode => ({
	id: path,
	label: getLast(path),
	isLeaf: false,
	children: files.map(toTreeNode(path)),
});

const updateChildren = (
	node: TreeNode,
	id: string,
	children: TreeNode["children"]
): TreeNode => {
	if (node.id === id) {
		return { ...node, children };
	} else if (node.children !== undefined) {
		const newChildren = node.children.map((child) => {
			return updateChildren(child, id, children);
		});
		return { ...node, children: newChildren };
	} else {
		return node;
	}
};

export const Explorer = (props: Props): JSX.Element => {
	const [path, setPath] = useState<null | string>(() => {
		return window.localStorage.getItem(PATH_KEY);
	});
	const [root, setRoot] = useState<null | TreeNode>(null);
	const [expanded, setExpanded] = useState(new Set<string>());
	const [selected, setSelected] = useState(new Set<string>());

	const { list } = props.store;
	useEffect(() => {
		if (path === null) return void setRoot(null);
		list(path).then((files) => {
			const node = getNode(files, path);
			setRoot(node);
		});
	}, [path, list, setRoot]);

	useEffect(() => {
		if (path === null) {
			window.localStorage.removeItem(PATH_KEY);
		} else {
			window.localStorage.setItem(PATH_KEY, path);
		}
	}, [path]);

	const openFolder = async (): Promise<void> => {
		setPath(await props.store.openFolder());
	};

	const aside = (
		<Button
			style={Button.styles.flat}
			onClick={openFolder}
			children="Change…"
		/>
	);

	const loadChildren = async (node: TreeNode): Promise<void> => {
		if (node.isLeaf === true) throw Error("Current node is a leaf");
		if (root === null) throw Error("Tree is not initialized (root is null)");
		if (node.children !== undefined) return;
		const files = await props.store.list(node.id);
		const children = files.map(toTreeNode(node.id));
		const newRoot = updateChildren(root, node.id, children);
		setRoot(newRoot);
	};

	const body = path ? (
		<div className={s.container}>
			<div style={{ marginTop: -1 }} />
			<PaneHeading children={getLast(path)} aside={aside} />
			{root !== null && (
				<Tree
					expanded={expanded}
					setExpanded={setExpanded}
					selected={selected}
					setSelected={setSelected}
					loadChildren={loadChildren}
					node={root}
				/>
			)}
		</div>
	) : (
		<div>
			<Button onClick={openFolder} children="Open folder…" />
		</div>
	);

	return (
		<div className={s.wrapper}>
			<Pane noPadding fullHeight children={body} />
		</div>
	);
};
