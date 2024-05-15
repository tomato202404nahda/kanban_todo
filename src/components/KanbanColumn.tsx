import { Dispatch, DragEvent, SetStateAction, useState } from "react";
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

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll<HTMLElement>(`[data-column="${props.column}"]`)
    );
  };

  const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const clearHighlights = (i?: HTMLElement[]) => {
    const indicators = i || getIndicators();

    indicators.forEach((el) => {
      el.style.opacity = "0";
    });
  };
  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const element = getNearestIndicator(e, indicators);

    const before = element.element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...props.cards];

      let cardToTransfer = copy.find((c) => {
        return c.id === cardId;
      });
      console.log(cardId);
      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column: props.column };

      copy = copy.filter((c) => c.id !== cardId);
      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => {
          return el.id === before;
        });

        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      props.setCards(copy);
      console.log(props.cards);
    }
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
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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
