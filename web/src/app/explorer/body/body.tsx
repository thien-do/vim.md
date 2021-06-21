import { FileState, isGoodToGo } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { BackendStorage } from "backend/interface";
import { Tree, TreeNode } from "components/tree/tree";
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
	removeFile: (path: string) => void;
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
				removeFile={props.removeFile}
			/>
		</div>
	);
};
