import { Switcher, SwitcherOption } from "@moai/core";
import { PrefLabel } from "app/prefs/widget/label/label";
import React from "react";
import { useRecoilState } from "recoil";
import { prefsState } from "state/pref/pref";
import s from "./indent.module.css";

const options: SwitcherOption<boolean>[] = [
    { value: true, label: "Tab" },
    { value: false, label: "Space" },
];

export const PrefIndent = () => {
    const [prefs, setPrefs] = useRecoilState(prefsState);
    const setValue = (useTab: boolean) => {
        setPrefs((prev) => ({ ...prev, useTab }));
    };
    return (
        <fieldset>
            <div className={s.container}>
                <PrefLabel>Indentation:</PrefLabel>
                <div className={s.input}>
                    <Switcher
                        isFullWidth={true}
                        value={prefs.useTab}
                        setValue={setValue}
                        options={options}
                    />
                </div>
                <div className={s.space} />
            </div>
        </fieldset>
    );
};
