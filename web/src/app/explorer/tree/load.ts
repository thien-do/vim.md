import { Prefs } from "app/prefs/state/state";
import { TreeNode } from "components/tree/tree";
import { Store, StoreFile } from "store/interface";

interface Params {
	list: Store["list"];
	fileType: Prefs["fileType"];
}

const toTreeNode =
	(parentPath: string) =>
	(file: StoreFile): TreeNode => ({
		id: `${parentPath}/${file.name}`,
		label: file.name,
		isLeaf: file.isDirectory === false,
		children: undefined, // Don't know yet
	});

const MD_EXTENSIONS = ["md", "mdx"];

const byFileType =
	(fileType: Prefs["fileType"]) =>
	(file: StoreFile): boolean => {
		if (fileType === "all") return true;
		if (file.isDirectory) return true;
		return MD_EXTENSIONS.some((ext) => file.name.endsWith(ext));
	};

export const loadPathNodes = async (
	path: string,
	{ fileType, list }: Params
): Promise<TreeNode[]> => {
	let all = await list(path);
	const files = all.filter(byFileType(fileType));
	const nodes = files.map(toTreeNode(path));
	return nodes;
};
