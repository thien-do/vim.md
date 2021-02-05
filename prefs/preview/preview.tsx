import * as React from "react";
import { PrefsSection } from "../../widget/section/section";
import { PrefTemplate } from "./template/template";

export const PrefsPreview = () => (
    <PrefsSection heading="Template">
        <PrefTemplate />
    </PrefsSection>
);
