import { Dispatch, SetStateAction, useState } from "react";
import { Store } from "../store/store";
import { Button } from "@moai/core";

interface Props {
	store: Store;
	file: string | null;
	setFile: Dispatch<SetStateAction<string | null>>;
}

export const Explorer = (props: Props): JSX.Element => {
	const [files, setFiles] = useState<string[]>([]);
	const [folder, setFolder] = useState("");
	const open = async () => void setFolder(await props.store.openFolder());
	const load = async () => void setFiles(await props.store.list(folder));
	const renderFile = (file: string): JSX.Element => {
		const full = `${folder}/${file}`;
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
				<Button onClick={open} children="1. Open folder" />
				<Button onClick={load} children="2. Load files" />
			</div>
			<ul>{files.map(renderFile)}</ul>
		</div>
	);
};
