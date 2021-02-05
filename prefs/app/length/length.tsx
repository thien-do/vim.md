import { DivPx, Select, SelectOption } from "@moai/core";
import { PrefLabel } from "app/prefs/widget/label/label";
import React from "react";
import s from "./length.module.css";
import { useRecoilState } from "recoil";
import { prefsState } from "state/pref/pref";
import { LineLength } from "state/pref/pref";

const options: SelectOption<LineLength>[] = [
    { value: 64, label: "64" },
    { value: 72, label: "72" },
    { value: 80, label: "80" },
];

export const PrefLineLength = () => {
    const [prefs, setPrefs] = useRecoilState(prefsState);
    return (
        <div className={s.container}>
            <PrefLabel />
            <Select
                value={prefs.lineLength}
                setValue={(lineLength) => {
                    setPrefs((prev) => ({ ...prev, lineLength }));
                }}
                options={options}
            />
            <DivPx size={8} />
            <div className={s.label}>characters per line</div>
        </div>
    );
};
