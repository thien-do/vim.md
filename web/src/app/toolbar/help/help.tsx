import { Dialog, text, Paragraph, Tag, DivEm, Icon, border } from "@moai/core"
import { RiQuestionLine } from "react-icons/ri";
import { data, Part as PartProps, PartItem } from "./data";
import s from "./help.module.css";

const Divider = (): JSX.Element => (
  <div className={[s.divider, border.strong].join(" ")} />
);

const Part = (part: PartProps): JSX.Element => {
  return (
    <>
      {part.type === "link" && <Divider />}
      <div className={s.part}>
        <Paragraph>{part.description}</Paragraph>
        {part.items.map((item: any) => <Line key={item.keyword} {...item} type={part.type} />)}
      </div>
    </>

  )
}

interface LineProps extends PartItem {
  type: string;
}

const formatLink = (link: string): string => {
  return link.includes("mailto") ? link.replace("mailto:", "") : link;
}

const Line = (props: LineProps): JSX.Element => {
  const { keyword, description, type } = props;
  const head = type === "operation"
    ? <Tag color={type === "operation" ? Tag.colors.green : Tag.colors.blue}>{keyword}
    </Tag>
    : <span>{keyword}</span>
  const tail = type === "link"
    ? <a href={description} target="_blank" rel="noreferrer">{formatLink(description)}</a>
    : <span className={text.muted}>{description}</span>;
  return (
    <div className={[s.line, type === "link" && s.lineLink].join(" ")}>
      {head}<DivEm />{tail}
    </div>
  )
}

export interface HelpProps {
  visible: boolean
  toggle: (val: boolean) => void
}

export const Help = (props: HelpProps): JSX.Element | null => {
  const { visible, toggle } = props;
  if (!visible) return null;
  return (
    <Dialog onEsc={() => toggle(false)} width="content">
      <Dialog.Body>
        <Dialog.Title><Icon component={RiQuestionLine} /><span className={s.title}>Help</span></Dialog.Title>
        <div>
          {
            data.map(part => <Part key={part.description} {...part} />)
          }
        </div>
      </Dialog.Body>
    </Dialog>
  )
}
