import { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import { Card } from "../globals/types";
import DeleteArea from "./DeleteArea";

export default function Kanban() {
  const [cards, setCards] = useState<Card[]>([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (check) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);
  useEffect(() => {
    const cardData = localStorage.getItem("cards");

    setCards(cardData ? JSON.parse(cardData) : []);
    setCheck(true);
  }, []);
  return (
    <div className="h-full overflow-auto bg-indigo-950 text-slate-100">
      <div className="flex h-full w-full gap-3  p-12">
        <KanbanColumn
          title="Backlog"
          headingColor="text-slate-200"
          cards={cards}
          setCards={setCards}
          column="backlog"
        />
        <KanbanColumn
          title="TODO"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
          column="todo"
        />
        <KanbanColumn
          title="In Progress"
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
          column="doing"
        />
        <KanbanColumn
          title="Finished"
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
          column="done"
        />
        <DeleteArea setCards={setCards} />
      </div>
    </div>
  );
}
