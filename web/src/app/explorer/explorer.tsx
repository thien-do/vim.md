import { Pane, Dialog } from "@moai/core";
import { FileState } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { Backend } from "backend/interface";
import { ExplorerBody } from "./body/body";
import s from "./explorer.module.css";
import { useExplorerRoot } from "./root";
import { ExplorerToolbar } from "./toolbar/toolbar";
import { removeTreeNode } from "components/tree/utils/remove";
import { TreeNode } from "components/tree/tree";

interface Props extends FileState {
	prefs: Prefs;
	backend: Backend;
}

export const Explorer = (props: Props): JSX.Element => {
	const { prefs, backend, file, setFile } = props;

	const root = useExplorerRoot({ prefs, backend });

	const removeFile = async (path: string): Promise<void> => {
		try {
			const yes = await Dialog.confirm("Do you want to delete this file?");
			if (yes) {
				// Remove file from file system
				await props.backend.storage.remove(path);
				// Remove file in our explorer
				root.setNode(removeTreeNode({ node: root.node as TreeNode, id: path }));
				// If delete current file, set file path as null
				if (file.path === path) {
					setFile({ path: null, saved: true });
				}
			};
		} catch (error) {
			Dialog.alert("Error while deleting file!");
		}
	}

	const container = (
		<div className={s.container}>
			<ExplorerToolbar
				rootNode={root.node}
				setRootNode={root.setNode}
				rootPath={root.path}
				setRootPath={root.setPath}
				backend={backend}
				fileType={prefs.fileType}
			/>
			{root.node !== null && (
				<ExplorerBody
					prefs={props.prefs}
					file={props.file}
					setFile={props.setFile}
					rootNode={root.node}
					setRootNode={root.setNode}
					removeFile={removeFile}
					storage={backend.storage}
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
