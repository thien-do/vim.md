import * as React from "react";
import { PrefsSection } from "../../widget/section/section";
import { PrefFileType } from "./filetype/filetype";

export const PrefsLibrary = () => (
    <PrefsSection heading="Library">
        <PrefFileType />
    </PrefsSection>
);
