import { Dispatch, SetStateAction, useState } from "react";
import { Store, StoreFile } from "../../store/store";

interface Props {
	store: Store;
	file: string | null;
	setFile: Dispatch<SetStateAction<string | null>>;
}

export const DummyExplorer = (props: Props): JSX.Element => {
	const [files, setFiles] = useState<StoreFile[]>([]);
	const [folder, setFolder] = useState("");
	const open = async () => void setFolder(await props.store.openFolder());
	const load = async () => void setFiles(await props.store.list(folder));
	const renderFile = (file: StoreFile): JSX.Element => {
		const full = `${folder}/${file.name}`;
		const button = (
			<button
				onClick={() => void props.setFile(full)}
				children={`${file}${full === props.file ? " <-" : ""}`}
			/>
		);
		return <li key={full} children={button} />;
	};
	return (
		<div>
			<div>
				<button onClick={open} children="1. Open folder" />
				<button onClick={load} children="2. Load files" />
			</div>
			<ul>{files.map(renderFile)}</ul>
		</div>
	);
};
