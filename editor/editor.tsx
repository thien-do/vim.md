import React from "react";
import { useRecoilValue } from "recoil";
import { FontFamily, prefsState } from "state/pref/pref";
import { EditorBusy } from "./busy/busy";
import s from "./editor.module.scss";
import { useEditorInit } from "./init";
import "./style/style";

const fontFamilyClasses: Record<FontFamily, [string, string]> = {
    mono: ["mono", "mono-duo"],
    duo: ["duo", "mono-duo"],
    quattro: ["quattro", "quattro"],
};

export const Editor = () => {
    const containerRef = useEditorInit();
    const prefs = useRecoilValue(prefsState);
    const fontFamilyClass = fontFamilyClasses[prefs.fontFamily];
    return (
        <div className={s.container}>
            <EditorBusy />
            <div
                className={[
                    s.editor,
                    `font-family-${fontFamilyClass[0]}`,
                    `font-var-${fontFamilyClass[1]}`,
                    `font-size font-size-${prefs.fontSize}`,
                ].join(" ")}
                style={
                    {
                        "--line-length": prefs.lineLength,
                    } as React.CSSProperties
                }
                ref={containerRef}
            />
        </div>
    );
};
