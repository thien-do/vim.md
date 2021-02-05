import { DivPx, MutedSpan, Radio } from "@moai/core";
import { PrefLabel } from "app/prefs/widget/label/label";
import React from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import s from "./family.module.scss";
import { FontFamily, Prefs } from "state/pref/pref";
import { prefsState } from "state/pref/pref";

interface Option {
    title: string;
    description: string;
    value: FontFamily;
}

const renderLabel = (option: Option) => (
    <span>
        <span>{option.title}</span>
        <MutedSpan> – {option.description}</MutedSpan>
    </span>
);

const options: Option[] = [
    { title: "Mono", description: "A classic choice", value: "mono" },
    { title: "Duo", description: "More room for W’s and M’s", value: "duo" },
    { title: "Quattro", description: "Propotional lovers", value: "quattro" },
];

const renderOption = (
    fontFamily: FontFamily,
    setPrefs: SetterOrUpdater<Prefs>
) => (option: Option, index: number) => (
    <div key={option.value}>
        {index !== 0 && <DivPx size={12} />}
        <Radio
            name="pref-font-family"
            value={option.value}
            setValue={() => {
                setPrefs((prev) => ({ ...prev, fontFamily: option.value }));
            }}
            checked={fontFamily === option.value}
            label={renderLabel(option)}
        />
    </div>
);

export const PrefFontFamily = () => {
    const [prefs, setPrefs] = useRecoilState(prefsState);
    return (
        <div className={s.container}>
            <PrefLabel>
                <div className={s.label}>Typeface:</div>
            </PrefLabel>
            <div className={s.input}>
                {options.map(renderOption(prefs.fontFamily, setPrefs))}
            </div>
        </div>
    );
};
