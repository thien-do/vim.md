import { Dialog, MenuItemAction } from "@moai/core";
import { FileState, isGoodToGo } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { BackendStorage } from "backend/interface";
import { Tree, TreeNode } from "components/tree/tree";
import { isTreeLeaf } from "components/tree/utils/leaf";
import { removeTreeNode } from "components/tree/utils/remove";
import { updateTreeNode } from "components/tree/utils/update";
import { useSetState } from "utils/set";
import { SetState } from "utils/state";
import { listFilesAsNodes } from "../file";
import s from "./body.module.css";

interface Props extends FileState {
	storage: BackendStorage;
	prefs: Prefs;
	rootNode: TreeNode;
	setRootNode: SetState<TreeNode | null>;
}

const EXPANDED_KEY = "vdm-explorer-expanded";

// Load children into a node
const loadChildren =
	(props: Props) =>
	async (node: TreeNode): Promise<void> => {
		const { rootNode, setRootNode } = props;
		const { fileType } = props.prefs;
		const { list } = props.storage;

		if (node.isLeaf === true) throw Error("Current node is a leaf");
		if (rootNode === null) throw Error("Root node is null");
		if (node.children !== undefined) return;
		const path = node.id;

		const newRoot = updateTreeNode({
			current: rootNode,
			id: node.id,
			key: "children",
			value: await listFilesAsNodes({ path, fileType, list }),
		});
		setRootNode(newRoot);
	};

const removeFile = async (props: Props, node: TreeNode): Promise<void> => {
	const { rootNode, file, storage, setFile, setRootNode } = props;
	const msg = `Are you sure you want to delete "${node.label}"?`;
	const yes = await Dialog.confirm(msg);
	if (yes === false) return;
	// Remove file from file system
	await storage.remove(node.id);
	// Remove file in our explorer
	const nextRoot = removeTreeNode({ tree: rootNode, deleteId: node.id });
	setRootNode(nextRoot);
	// If delete current file, set file path as null
	if (file.path !== node.id) return;
	setFile({ path: null, saved: true });
};

const getRowActions =
	(props: Props) =>
	(node: TreeNode): MenuItemAction[] => {
		if (isTreeLeaf(node) === false) return [];
		return [{ label: "Delete…", fn: () => removeFile(props, node) }];
	};

export const ExplorerBody = (props: Props): JSX.Element | null => {
	const { file, setFile, rootNode } = props;
	const [expanded, setExpanded] = useSetState(EXPANDED_KEY);

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
				loadChildren={loadChildren(props)}
				parentMode="expand"
				node={props.rootNode}
				getRowActions={getRowActions(props)}
			/>
		</div>
	);
};
