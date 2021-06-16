import { Prefs } from "app/prefs/state/state";
import { TreeNode } from "components/tree/tree";
import { useEffect, useState } from "react";
import { Store } from "store/interface";
import { pathUtils } from "utils/path";
import { SetState, useStorageState } from "utils/state";
import { listFilesAsNodes } from "./file";

interface Params {
	store: Store;
	prefs: Prefs;
}

interface State {
	path: null | string;
	setPath: null | SetState<null | string>;
	node: null | TreeNode;
	setNode: SetState<null | TreeNode>;
}

const STORAGE_PATH_KEY = "vdm-explorer-root-path";

export const useExplorerRoot = (params: Params): State => {
	const { store, prefs } = params;
	const open = store.showOpenDialog;
	const fixedPath = typeof open === "string" ? open : null;

	const [path, setPath] = useStorageState<string>(STORAGE_PATH_KEY);
	const [node, setNode] = useState<null | TreeNode>(null);

	// Reset node when path is changed
	const [{ list }, { fileType }] = [store, prefs];
	useEffect(() => {
		if (path === null) return void setNode(null);
		listFilesAsNodes({ path, fileType, list }).then((children) => {
			const label = pathUtils.splitPath(path).fullName;
			setNode({ id: path, label, children, isLeaf: false });
		});
	}, [path, list, setNode, fileType]);

	return {
		path: fixedPath ?? path,
		setPath: fixedPath ? null : setPath,
		node,
		setNode,
	};
};
