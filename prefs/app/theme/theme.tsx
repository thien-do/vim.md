import { Switcher, SwitcherOption } from "@moai/core";
import { PrefLabel } from "app/prefs/widget/label/label";
import React from "react";
import { useRecoilState } from "recoil";
import s from "./theme.module.css";
import { Theme } from "state/pref/pref";
import { prefsState } from "state/pref/pref";

const options: SwitcherOption<Theme>[] = [
    { value: "light", label: "Light" },
    { value: "system", label: "System" },
    { value: "dark", label: "Dark" },
];

export const PrefTheme = () => {
    const [prefs, setPrefs] = useRecoilState(prefsState);
    return (
        <fieldset>
            <div className={s.container}>
                <PrefLabel>Theme:</PrefLabel>
                <div className={s.input}>
                    <Switcher
                        isFullWidth={true}
                        value={prefs.theme}
                        setValue={(theme) => {
                            setPrefs((prev) => ({ ...prev, theme }));
                        }}
                        options={options}
                    />
                </div>
            </div>
        </fieldset>
    );
};
