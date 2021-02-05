import { DivPx, Radio } from "@moai/core";
import { PrefLabel } from "app/prefs/widget/label/label";
import * as React from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { Prefs, prefsState, Template } from "state/pref/pref";
import s from "./template.module.scss";

interface Option {
    label: string;
    value: Template;
}

const options: Option[] = [
    { label: "GitHub", value: "github" },
    { label: "Serif", value: "serif" },
    // { label: "__Blank", value: "blank" }, // DEBUG
];

const renderOption = (template: Template, setPrefs: SetterOrUpdater<Prefs>) => (
    option: Option,
    index: number
) => (
    <div key={option.value}>
        {index !== 0 && <DivPx size={12} />}
        <Radio
            name="pref-template"
            value={option.value}
            setValue={() => {
                setPrefs((prev) => ({ ...prev, template: option.value }));
            }}
            checked={template === option.value}
            label={option.label}
        />
    </div>
);

export const PrefTemplate = () => {
    const [prefs, setPrefs] = useRecoilState(prefsState);
    return (
        <div className={s.container}>
            <PrefLabel>
                <div className={s.label}>Template:</div>
            </PrefLabel>
            <div className={s.input}>
                {options.map(renderOption(prefs.template, setPrefs))}
            </div>
        </div>
    );
};
