import { Pane } from "@moai/core";
import { FileState } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { Backend } from "backend/interface";
import { ExplorerBody } from "./body/body";
import s from "./explorer.module.css";
import { useExplorerRoot } from "./root";
import { ExplorerToolbar } from "./toolbar/toolbar";

interface Props extends FileState {
	prefs: Prefs;
	backend: Backend;
}

export const Explorer = (props: Props): JSX.Element => {
	const { prefs, backend } = props;

	const root = useExplorerRoot({ prefs, backend });

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
