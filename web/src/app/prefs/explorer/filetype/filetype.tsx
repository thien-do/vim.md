import { DivPx, Radio } from "@moai/core";
import { FileType, PrefsState } from "app/prefs/state/state";
import { PaneLabel } from "components/pane/label/label";
import s from "./filetype.module.css";

interface Props extends PrefsState {}

interface Option {
	label: string;
	value: FileType;
}

const options: Option[] = [
	{ label: "Show all files", value: "all" },
	{ label: "Show Markdown files only", value: "md" },
];

const renderOption = (props: Props) => (option: Option, index: number) => (
	<div key={option.value}>
		{index !== 0 && <DivPx size={12} />}
		<Radio
			name="pref-file-type"
			value={option.value}
			setValue={() => {
				props.setPrefs((prefs) => ({ ...prefs, fileType: option.value }));
			}}
			checked={props.prefs.fileType === option.value}
			children={option.label}
		/>
	</div>
);

export const PrefsFileType = (props: Props): JSX.Element => (
	<div className={s.container}>
		<PaneLabel>
			<div className={s.label}>File type:</div>
		</PaneLabel>
		<div className={s.input}>{options.map(renderOption(props))}</div>
	</div>
);
