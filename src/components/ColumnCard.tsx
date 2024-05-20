import { motion } from "framer-motion";
import { Card } from "../globals/types";
import DropIndicator from "./DropIndicator";
type Props = {
  card: Card;
  handleDragStart: (e, card: Card) => void;
};
export default function ColumnCard(props: Props) {
  return (
    <>
      <DropIndicator beforeId={props.card.id} column={props.card.column} />
      <motion.div
        layout
        layoutId={props.card.id}
        draggable="true"
        onDragStart={(e) => props.handleDragStart(e, props.card)}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{props.card.title}</p>
      </motion.div>
    </>
  );
}
