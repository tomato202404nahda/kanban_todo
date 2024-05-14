import { Dispatch, SetStateAction, useState } from "react";
import { Card } from "../globals/globals";
import ColumnCard from "./ColumnCard";
import AddCard from "./AddCard";
import DropIndicator from "./DropIndicator";

type Props = {
  title: string;
  headingColor: string;
  column: string;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
};

export default function KanbanColumn(props: Props) {
  const [active, setActive] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };
  const filteredCards = props.cards.filter((c) => {
    return c.column === props.column;
  });

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${props.headingColor}`}>{props.title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        className={`h-full w-full transition-all ${
          active ? "bg-neutral-800/50" : "bg-neutral-800"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <>
              <ColumnCard
                card={{ ...c }}
                key={c.id}
                handleDragStart={handleDragStart}
              />
            </>
          );
        })}
        <DropIndicator beforeId={"-1"} column={props.column} />
        <AddCard column={props.column} setCards={props.setCards} />
      </div>
    </div>
  );
}
