import { Button, TreeNode, TreeUtils } from "@moai/core";
import { useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { listFilesAsNodes } from "../file";
import { ExplorerToolbarProps } from "./toolbar";

type Props = ExplorerToolbarProps;

const loadChildren =
	(props: Props) =>
	async (node: TreeNode): Promise<TreeNode[]> => {
		if (TreeUtils.isTreeLeaf(node)) throw Error("Cannot load children of leaf");
		const children = await listFilesAsNodes({
			path: node.id,
			fileType: props.fileType,
			list: props.backend.storage.list,
		});
		return children;
	};

const refresh = async (props: Props): Promise<void> => {
	if (props.rootNode === null) throw Error("rootNode is null");
	const rootNode = await TreeUtils.refreshTree({
		node: props.rootNode,
		loadChildren: loadChildren(props),
	});
	props.setRootNode(rootNode);
};

export const ExplorerToolbarRefresh = (props: Props): JSX.Element | null => {
	const [busy, setBusy] = useState(false);

	if (props.setRootPath === null) return null; // Fixed path
	if (props.rootNode === null) return null; // No opened folder

	return (
		<Button
			style={Button.styles.flat}
			onClick={async () => {
				setBusy(true);
				await refresh(props);
				setBusy(false);
			}}
			busy={busy}
			icon={RiRefreshLine}
			iconLabel="Refresh"
		/>
	);
};
