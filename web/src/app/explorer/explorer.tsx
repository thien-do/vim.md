import { Button, Pane } from "@moai/core";
import { PaneHeading } from "components/pane/heading/heading";
import { Store } from "store/store";
import { SetState, useStorageState } from "utils/state";
import s from "./explorer.module.css";
import { ExplorerTree } from "./tree/tree";

interface Props {
	store: Store;
	filePath: string | null;
	setFilePath: SetState<string | null>;
}

const ROOT_PATH_KEY = "vdm-explorer-root-path";

export const Explorer = (props: Props): JSX.Element => {
	const [path, setPath] = useStorageState<string>(ROOT_PATH_KEY);

	const openFolder = async (): Promise<void> => {
		setPath(await props.store.openFolder());
	};

	const aside = (
		<Button
			style={Button.styles.flat}
			onClick={openFolder}
			children="Change…"
		/>
	);

	const body = path ? (
		<div className={s.container}>
			<div style={{ marginTop: -1 }} />
			<PaneHeading children={path.split("/").slice(-1)[0]} aside={aside} />
			<ExplorerTree
				rootPath={path}
				store={props.store}
				filePath={props.filePath}
				setFilePath={props.setFilePath}
			/>
		</div>
	) : (
		<div>
			<Button onClick={openFolder} children="Open folder…" />
		</div>
	);

	return (
		<div className={s.wrapper}>
			<Pane noPadding fullHeight children={body} />
		</div>
	);
};
