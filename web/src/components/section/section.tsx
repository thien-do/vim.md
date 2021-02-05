import { Background, Border, DivPx, MutedDiv } from "@moai/core";
import s from "./section.module.scss";

interface Props {
    heading: string;
    children: React.ReactNode;
}

export const PrefsSection = (props: Props) => (
    <div>
        <Background color="weak">
            <Border color="weak" />
            <DivPx size={8} />
            <MutedDiv>
                <h2 className={s.heading}>{props.heading}</h2>
            </MutedDiv>
            <DivPx size={8} />
            <Border color="weak" />
        </Background>
        <div className={s.body}>
            {props.children}
        </div>
    </div>
);
