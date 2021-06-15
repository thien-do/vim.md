import { Button } from "@moai/core";
import { PaneHeading } from "components/pane/heading/heading";
import { RiFileAddLine, RiFolderLine } from "react-icons/ri";
import { Store } from "store/interface";
import { pathUtils } from "utils/path";
import { SetState } from "utils/state";
import s from "./toolbar.module.css";

interface Props {
	store: Store;
	path: string | null;
	setPath: SetState<string | null>;
}

const openFolder = async (props: Props): Promise<void> => {
	const open = props.store.showOpenDialog;
	if (typeof open === "string")
		throw Error("Store doesn't support opening a folder");
	const path = await open();
	if (typeof path === "string") props.setPath(path);
};

const createFile = async (props: Props): Promise<void> => {
	const path = await props.store.showSaveDialog();
	if (path === null) return;
	await props.store.write(path, "");
};

const Aside = (props: Props): JSX.Element => (
	<div className={s.aside}>
		{props.path !== null && (
			<Button
				style={Button.styles.flat}
				onClick={() => createFile(props)}
				icon={RiFileAddLine}
				iconLabel="New File"
			/>
		)}
		{typeof props.store.showOpenDialog !== "string" && (
			<Button
				style={Button.styles.flat}
				onClick={() => openFolder(props)}
				icon={RiFolderLine}
				iconLabel="Change Folder"
			/>
		)}
	</div>
);

export const ExplorerToolbar = (props: Props): JSX.Element => (
	<PaneHeading aside={<Aside {...props} />}>
		{props.path === null ? "No folder opened" : pathUtils.getLast(props.path)}
	</PaneHeading>
);
