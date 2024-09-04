import { useContext, useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import { Card } from "../globals/types";
import DeleteArea from "./DeleteArea";
import { UserContext } from "../App";
import { onValue, ref, set } from "firebase/database";
import { db } from "../config/firebase.config";

export default function Kanban() {
  const { user } = useContext(UserContext);
  const [cards, setCards] = useState<Card[]>([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (check) {
      try {
        set(ref(db, "todos/" + user.userId), {
          cards: cards,
        });
      } catch (error) {
        console.log(error);
      }
      // localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

  useEffect(() => {
    const cardDataRef = ref(db, "todos/" + user.userId);

    onValue(cardDataRef, (snapshot) => {
      const data = snapshot.val().cards;
      const cardData = Object.keys(data).map((key) => {
        return {
          id: key,
          title: data[key].title,
          column: data[key].column,
        };
      });
      console.log(cardData);
      setCards(cardData ? cardData : []);
    });

    // console.log(cardData);
    // setCards(cardData ? cardData : []);
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
