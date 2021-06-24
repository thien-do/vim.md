import { Button } from "@moai/core";
import { Backend } from "backend/interface";
import { PaneHeading } from "components/pane/heading/heading";
import { TreeNode } from "components/tree/tree";
import { RiFolderLine } from "react-icons/ri";
import { SetState } from "utils/state";
import { ExplorerToolbarAdd } from "./add";
import s from "./toolbar.module.css";

export interface ExplorerToolbarProps {
	backend: Backend;
	rootPath: string | null;
	setRootPath: null | SetState<string | null>;
	rootNode: TreeNode | null;
	setRootNode: SetState<TreeNode | null>;
}

const openFolder = async (props: ExplorerToolbarProps): Promise<void> => {
	const open = props.backend.storage.showOpenDialog;
	if (typeof open === "string")
		throw Error("Store doesn't support opening a folder");

	const path = await open();
	if (path === null) return; // Cancel

	if (props.setRootPath === null)
		throw Error("setRootPath is null because of fixed root mode");
	props.setRootPath(path);
};

const Aside = (props: ExplorerToolbarProps): JSX.Element => (
	<div className={s.aside}>
		<ExplorerToolbarAdd {...props} />
		{props.setRootPath !== null && (
			<Button
				style={Button.styles.flat}
				onClick={() => openFolder(props)}
				icon={RiFolderLine}
				iconLabel="Change Folder"
			/>
		)}
	</div>
);

export const ExplorerToolbar = (props: ExplorerToolbarProps): JSX.Element => (
	<PaneHeading aside={<Aside {...props} />}>
		{props.rootPath === null
			? "No folder opened"
			: props.backend.path.parse(props.rootPath).base}
	</PaneHeading>
);
