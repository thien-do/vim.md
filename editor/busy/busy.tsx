import { background, ProgressCircle } from "@moai/core";
import * as React from "react";
import { useRecoilValue } from "recoil";
import * as Doc from "state/doc/doc";
import s from "./busy.module.css";

export const EditorBusy = () => {
    const docDetail = useRecoilValue(Doc.docDetailState);
    const isLoading = docDetail.state === "loading";
    if (!isLoading) return null;
    return (
        <div className={[s.container, background.secondary].join(" ")}>
            <ProgressCircle value={null} size={16} />
        </div>
    );
};
