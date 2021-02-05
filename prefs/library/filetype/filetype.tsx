import { DivPx, Radio } from "@moai/core";
import { PrefLabel } from "app/prefs/widget/label/label";
import * as React from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { FileType, Prefs, prefsState } from "state/pref/pref";
import s from "./filetype.module.scss";

interface Option {
    label: string;
    value: FileType;
}

const options: Option[] = [
    { label: "Show all files", value: "all" },
    { label: "Show Markdown files only", value: "md" },
];

const renderOption = (fileType: FileType, setPrefs: SetterOrUpdater<Prefs>) => (
    option: Option,
    index: number
) => (
    <div key={option.value}>
        {index !== 0 && <DivPx size={12} />}
        <Radio
            name="pref-file-type"
            value={option.value}
            setValue={() => {
                setPrefs((prev) => ({ ...prev, fileType: option.value }));
            }}
            checked={fileType === option.value}
            label={option.label}
        />
    </div>
);

export const PrefFileType = () => {
    const [prefs, setPrefs] = useRecoilState(prefsState);
    return (
        <div className={s.container}>
            <PrefLabel>
                <div className={s.label}>File type:</div>
            </PrefLabel>
            <div className={s.input}>
                {options.map(renderOption(prefs.fileType, setPrefs))}
            </div>
        </div>
    );
};
