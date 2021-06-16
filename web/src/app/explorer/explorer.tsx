import { Pane } from "@moai/core";
import { FileState } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { Store } from "store/interface";
import { ExplorerBody } from "./body/body";
import s from "./explorer.module.css";
import { useExplorerRoot } from "./root";
import { ExplorerToolbar } from "./toolbar/toolbar";

interface Props extends FileState {
	prefs: Prefs;
	store: Store;
}

export const Explorer = (props: Props): JSX.Element => {
	const { prefs, store } = props;

	const root = useExplorerRoot({ prefs, store });

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
