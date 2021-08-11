import { TreeNode } from "@moai/core";
import { Prefs } from "app/prefs/state/state";
import { Backend } from "backend/interface";
import { useEffect, useState } from "react";
import { SetState, useStorageState } from "utils/state";
import { listFilesAsNodes } from "./file";

interface Params {
	backend: Backend;
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
	const { backend, prefs } = params;
	const open = backend.storage.showOpenDialog;
	const fixedPath = typeof open === "string" ? open : null;

	const [_path, _setPath] = useStorageState<string>(STORAGE_PATH_KEY);
	const [node, setNode] = useState<null | TreeNode>(null);

	const path = fixedPath ?? _path;
	const setPath = fixedPath ? null : _setPath;

	// Reset node when path is changed
	const list = backend.storage.list;
	const fileType = prefs.fileType;
	const parse = backend.path.parse;
	useEffect(() => {
		if (path === null) return void setNode(null);
		listFilesAsNodes({ path, fileType, list }).then((children) => {
			const label = parse(path).name;
			setNode({ id: path, label, children, isLeaf: false });
		});
	}, [path, parse, list, setNode, fileType]);

	return { path, setPath, node, setNode };
};
