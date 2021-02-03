import { useState } from "react";
import { Editor } from "../editor/editor";
import { Explorer } from "../explorer/explorer";
import { Store } from "../store/store";

interface Props {
	store: Store;
}

export const App = (props: Props): JSX.Element => {
	const [file, setFile] = useState<string | null>(null);
	return (
		<div style={{ display: "flex" }}>
			<Explorer file={file} setFile={setFile} store={props.store} />
			{file !== null && <Editor file={file} store={props.store} />}
		</div>
	);
};
