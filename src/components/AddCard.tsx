import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Card } from "../globals/globals";
import { motion } from "framer-motion";

export default function AddCard({
  column,
  setCards,
}: {
  column: string;
  setCards: Dispatch<SetStateAction<Card[]>>;
}) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={(e) => handleSubmit(e)}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-300 focus:outline-0"
            id=""
          ></textarea>
          <div className="mt-2 flex items-center justify-end gap-2">
            <motion.button
              layout
              onClick={() => setAdding(false)}
              className="px-3 py-2 text-xs text-neutral-400 transition-all hover:text-neutral-50"
            >
              Close
            </motion.button>
            <motion.button
              layout
              type="submit"
              className="px-3 py-2 text-xs bg-indigo-500 rounded text-neutral-400 transition-all hover:text-neutral-50"
            >
              Add
            </motion.button>
          </div>
        </motion.form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center
            gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-all hover:text-neutral-50
        "
        >
          <span>Add Card</span>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
    </>
  );
}
