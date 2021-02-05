import { DivPx } from "@moai/core";
import s from "./label.module.scss";

interface Props {
    children?: React.ReactNode;
}

export const PrefLabel = (props: Props) => (
    <>
        <div className={s.container}>{props.children}</div>
        <DivPx size={16} />
    </>
);
