import { FileType } from "app/prefs/state/state";
import { BackendFile, BackendStorage } from "backend/interface";
import { TreeNode } from "components/tree/tree";

const toTreeNode =
	(parentId: string) =>
	(file: BackendFile): TreeNode => ({
		id: `${parentId}/${file.name}`,
		label: file.name,
		isLeaf: file.isDirectory === false,
		children: undefined, // Don't know yet
	});

const MARKDOWN_EXTENSIONS: Set<string> = new Set(["md", "mdx"]);

export const listFilesAsNodes = async (params: {
	path: string;
	fileType: FileType;
	list: BackendStorage["list"];
}): Promise<TreeNode[]> => {
	const { path, fileType, list } = params;
	const extensions = fileType === "all" ? "all" : MARKDOWN_EXTENSIONS;
	const files = await list(path, extensions);
	const nodes = files.map(toTreeNode(path));
	return nodes;
};
