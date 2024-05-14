import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import { Card, DEFAULT_CARDS } from "../globals/globals";
import DeleteArea from "./DeleteArea";

export default function Kanban() {
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);
  return (
    <div className="h-screen w-full bg-indigo-950 text-slate-100">
      <div className="flex h-full w-full gap-3 overflow-scroll p-12">
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
