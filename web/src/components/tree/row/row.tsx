import React from "react";
import { Button, Popover, Menu } from "@moai/core";
import { RiArrowDownSLine, RiArrowRightSLine, RiMoreFill } from "react-icons/ri";
import { TreeProps, TreeFileAction } from "../tree";
import { isTreeLeaf } from "../utils/leaf";
import s from "./row.module.css";

interface Props extends TreeProps<TreeFileAction> { }
interface ActionBarProps {
	onDeleteFile?: (e?: React.MouseEvent | undefined) => void;
}

// For indentation, like in source code
const Tab = () => (
	<div className={[Button.sizes.smallIcon.main, s.tab].join(" ")} />
);

const toggle = async (props: Props): Promise<void> => {
	const expanded = new Set(props.expanded);
	if (expanded.has(props.node.id)) {
		expanded.delete(props.node.id);
	} else {
		expanded.add(props.node.id);
	}
	props.setExpanded(expanded);
};

const ActionBar = (props: ActionBarProps) => {
	let popoverInst: any;
	return (
		<div className={s.action}>
			<Popover
				target={(popover) => {
					popoverInst = popover;
					return <Button
						onClick={(e) => {
							e.stopPropagation();
							popover.toggle()
						}}
						selected={popover.opened}
						icon={RiMoreFill}
						iconLabel="More"
						style={Button.styles.flat}
						size={Button.sizes.smallIcon}
					/>
				}}
				placement="bottom-start"
				content={() => <Menu items={[
					{
						label: "Delete", fn: () => {
							popoverInst.toggle();
							props.onDeleteFile?.()
						}
					}
				]} />}
			/>
		</div>
	)
}

export const TreeItem = (props: Props): JSX.Element => {
	const expanded = props.expanded.has(props.node.id);
	const selected = props.selected.has(props.node.id);
	const isLeaf = isTreeLeaf(props.node);
	const shouldShowHoverAction = isLeaf && selected;

	const onDeleteFileHandler = (): void => {
		props.actions?.find(action => action.type === "remove")?.handler(props.node.id);
	};

	return (
		<div
			className={[
				s.container,
				Button.styles.flat.main,
				selected ? Button.styles.flat.selected : "",
			].join(" ")}
			// @TODO: Handle a11y properly
			onClick={() => {
				if (isLeaf || props.parentMode === "select") {
					props.setSelected(new Set([props.node.id]));
				} else {
					toggle(props);
				}
			}}
		>
			{[...Array(props.level ?? 0)].map((_v, i) => (
				<Tab key={i} />
			))}
			<div className={s.toggle}>
				{isLeaf === false ? (
					<Button
						icon={expanded ? RiArrowDownSLine : RiArrowRightSLine}
						iconLabel={expanded ? "Collapse group" : "Expand group"}
						onClick={() => toggle(props)}
						style={Button.styles.flat}
						size={Button.sizes.smallIcon}
					/>
				) : (
					<Tab />
				)}
			</div>
			<div className={s.label}>{props.node.label}</div>
			{shouldShowHoverAction && <ActionBar onDeleteFile={onDeleteFileHandler} />}
		</div>
	);
};
