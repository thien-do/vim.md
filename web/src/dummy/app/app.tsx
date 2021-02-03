import { useState } from "react";
import { DummyEditor } from "../editor/editor";
import { DummyExplorer } from "../explorer/explorer";
import { Store } from "../../store/store";

interface Props {
	store: Store;
}

export const DummyApp = (props: Props): JSX.Element => {
	const [file, setFile] = useState<string | null>(null);
	return (
		<div style={{ display: "flex" }}>
			<DummyExplorer file={file} setFile={setFile} store={props.store} />
			{file !== null && <DummyEditor file={file} store={props.store} />}
		</div>
	);
};
