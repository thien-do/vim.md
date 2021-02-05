import { DivPx, RangeInput, Select, SelectOption } from "@moai/core";
import { PrefLabel } from "app/prefs/widget/label/label";
import { FontSize } from "state/pref/pref";
import React from "react";
import { useRecoilState } from "recoil";
import { prefsState } from "state/pref/pref";
import s from "./size.module.scss";

const indexToSize: FontSize[] = [
    "4xs", "3xs", "2xs", "xs", "s", "m",
    "l", "xl", "2xl", "3xl", "4xl", "5xl",
    "6xl", "7xl", "8xl", "9xl", "10xl",
]; // prettier-ignore
const sizeToIndex = {} as Record<FontSize, number>;
indexToSize.forEach((size, index) => void (sizeToIndex[size] = index));

const recommendations: number[] = [sizeToIndex["xl"]];

const options: SelectOption<FontSize>[] = indexToSize.map((size) => {
    return { value: size, label: size.toUpperCase() };
});

export const PrefFontSize = () => {
    const [prefs, setPrefs] = useRecoilState(prefsState);
    return (
        <div className={s.container}>
            <PrefLabel>Text size:</PrefLabel>
            <div className={s.value}>
                <Select
                    fullWidth
                    value={prefs.fontSize}
                    setValue={(fontSize) => {
                        setPrefs((prev) => ({ ...prev, fontSize }));
                    }}
                    options={options}
                />
            </div>
            <DivPx size={16} />
            <div className={s.input}>
                <RangeInput
                    value={sizeToIndex[prefs.fontSize]}
                    setValue={(index) => {
                        const fontSize = indexToSize[index];
                        setPrefs((prev) => ({ ...prev, fontSize }));
                    }}
                    min={0}
                    max={indexToSize.length - 1}
                    step={1}
                    list={{ id: "pref-font-size", numbers: recommendations }}
                />
            </div>
        </div>
    );
};
