import { Pane, Dialog } from "@moai/core";
import { FileState } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { Store } from "store/interface";
import { ExplorerBody } from "./body/body";
import s from "./explorer.module.css";
import { useExplorerRoot } from "./root";
import { ExplorerToolbar } from "./toolbar/toolbar";
import { removeTreeNode } from "components/tree/utils/remove";
import { TreeNode } from "components/tree/tree";

interface Props extends FileState {
	prefs: Prefs;
	store: Store;
}

export const Explorer = (props: Props): JSX.Element => {
	const { prefs, store } = props;
	const root = useExplorerRoot({ prefs, store });
	
	const removeFile = async (path: string | null): Promise<void> => {
		if (!path) return;
		try {
			const yes = await Dialog.confirm("Do you want to delete this file?");
			if (yes) {
				// Remove file from file system
				await props.store.remove(path);
				// Remove file in our explorere
				root.setNode(removeTreeNode({ current: root.node as TreeNode, id: path }))
				// TODO: Reset editor
			};
		} catch (error) {
			Dialog.alert("Error while deleting file!")
		}
	}

	const container = (
		<div className={s.container}>
			<ExplorerToolbar
				rootNode={root.node}
				setRootNode={root.setNode}
				rootPath={root.path}
				setRootPath={root.setPath}
				store={props.store}
			/>
			{root.node !== null && (
				<ExplorerBody
					prefs={props.prefs}
					store={props.store}
					file={props.file}
					setFile={props.setFile}
					rootNode={root.node}
					setRootNode={root.setNode}
					removeFile={removeFile}
				/>
			)}
		</div>
	);

	return (
		<div className={s.wrapper}>
			<Pane noPadding fullHeight children={container} />
		</div>
	);
};
