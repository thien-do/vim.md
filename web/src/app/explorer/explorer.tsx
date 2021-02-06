import { Button, Pane } from "@moai/core";
import { PaneHeading } from "components/pane/heading/heading";
import { useEffect, useState } from "react";
import { Store } from "store/store";
import s from "./explorer.module.css";
import { ExplorerTree } from "./tree/tree";

interface Props {
	store: Store;
}

const ROOT_PATH_KEY = "vdm-explorer-root-path";

export const Explorer = (props: Props): JSX.Element => {
	const [path, setPath] = useState<null | string>(() => {
		return window.localStorage.getItem(ROOT_PATH_KEY);
	});

	useEffect(() => {
		if (path === null) {
			window.localStorage.removeItem(ROOT_PATH_KEY);
		} else {
			window.localStorage.setItem(ROOT_PATH_KEY, path);
		}
	}, [path]);

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
			<ExplorerTree rootPath={path} store={props.store} />
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
