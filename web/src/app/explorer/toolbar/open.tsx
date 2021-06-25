import { ExplorerToolbarProps } from "./toolbar";
import { Button } from "@moai/core";
import { RiFolderLine } from "react-icons/ri";

type Props = ExplorerToolbarProps;

const open = async (props: Props): Promise<void> => {
	const open = props.backend.storage.showOpenDialog;
	if (typeof open === "string")
		throw Error("Store doesn't support opening a folder");

	const path = await open();
	if (path === null) return; // Cancel

	if (props.setRootPath === null)
		throw Error("setRootPath is null because of fixed root mode");
	props.setRootPath(path);
};

export const ExplorerToolbarOpen = (props: Props): JSX.Element | null => {
	if (props.setRootPath === null) return null; // Fixed path

	return (
		<Button
			style={Button.styles.flat}
			onClick={() => open(props)}
			icon={RiFolderLine}
			iconLabel="Change Folder"
		/>
	);
};
