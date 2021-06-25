import { FileType } from "app/prefs/state/state";
import { Backend } from "backend/interface";
import { PaneHeading } from "components/pane/heading/heading";
import { TreeNode } from "components/tree/tree";
import { SetState } from "utils/state";
import { ExplorerToolbarAdd } from "./add";
import { ExplorerToolbarOpen } from "./open";
import { ExplorerToolbarRefresh } from "./refresh";
import s from "./toolbar.module.css";

export interface ExplorerToolbarProps {
	backend: Backend;
	fileType: FileType;
	rootPath: string | null;
	setRootPath: null | SetState<string | null>;
	rootNode: TreeNode | null;
	setRootNode: SetState<TreeNode | null>;
}

const Aside = (props: ExplorerToolbarProps): JSX.Element => (
	<div className={s.aside}>
		<ExplorerToolbarAdd {...props} />
		<ExplorerToolbarOpen {...props} />
		<ExplorerToolbarRefresh {...props} />
	</div>
);

export const ExplorerToolbar = (props: ExplorerToolbarProps): JSX.Element => (
	<PaneHeading aside={<Aside {...props} />}>
		{props.rootPath === null
			? "No folder opened"
			: props.backend.path.parse(props.rootPath).base}
	</PaneHeading>
);
