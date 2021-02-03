import { useState } from "react";
import { Store } from "../../store/store";

interface Props {
	store: Store;
	file: string;
}

export const DummyEditor = (props: Props): JSX.Element => {
	const [value, setValue] = useState("");
	const load = async () => void setValue(await props.store.read(props.file));
	const save = async () => void props.store.write(props.file, value);
	return (
		<div>
			<div>
				<button onClick={load} children="Load" />
				<button onClick={save} children="Save" />
			</div>
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				rows={5}
			/>
		</div>
	);
};
