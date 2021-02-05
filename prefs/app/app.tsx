import { DivPx } from "@moai/core";
import { PrefsSection } from "../../widget/section/section";
import { PrefFontFamily } from "./family/family";
import { PrefIndent } from "./indent/indent";
import { PrefLineLength } from "./length/length";
import { PrefFontSize } from "./size/size";
import { PrefTheme } from "./theme/theme";

export const PrefsApp = () => (
    <PrefsSection heading="Editor">
        <PrefTheme />
        <DivPx size={32} />
        <PrefFontFamily />
        <DivPx size={32} />
        <PrefFontSize />
        <DivPx size={12} />
        <PrefLineLength />
        <DivPx size={32} />
        <PrefIndent />
    </PrefsSection>
);
