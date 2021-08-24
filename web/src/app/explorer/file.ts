import { TreeNode } from "@moai/core";
import { FileType } from "app/prefs/state/state";
import { BackendFile, BackendStorage } from "backend/interface";

const toTreeNode =
	(parentId: string) =>
	(file: BackendFile): TreeNode => ({
		id: `${parentId}/${file.name}`,
		label: file.name,
		isLeaf: file.isDirectory === false,
		children: undefined, // Don't know yet
	});

const fileNodesCompareFn = (a: TreeNode, b: TreeNode) => {
	if (!a.isLeaf && !b.isLeaf) {
		// they are both folders, then sort by alphabet
		return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
	}

	// folders should be displayed before files
	return a.isLeaf ? 1 : -1;
};

const MARKDOWN_EXTENSIONS: Set<string> = new Set(["md", "mdx"]);

export const listFilesAsNodes = async (params: {
	path: string;
	fileType: FileType;
	list: BackendStorage["list"];
}): Promise<TreeNode[]> => {
	const { path, fileType, list } = params;
	const extensions = fileType === "all" ? "all" : MARKDOWN_EXTENSIONS;
	const files = await list(path, extensions);
	const nodes = files.map(toTreeNode(path)).sort(fileNodesCompareFn);
	return nodes;
};
