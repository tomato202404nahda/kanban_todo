import { Dispatch, SetStateAction, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../globals/types";

type Props = {
  setCards: Dispatch<SetStateAction<Card[]>>;
};

export default function DeleteArea(props: Props) {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    props.setCards((prev) => prev.filter((c) => c.id != cardId));
    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`mt-10 grid h-56 w-56 shrink-0 
      place-content-center rounded border text-3xl
      ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }
      `}
    >
      {active ? (
        <FontAwesomeIcon icon={faFire} className="animate-bounce" />
      ) : (
        <FontAwesomeIcon icon={faTrashAlt} className="animate-b" />
      )}
    </div>
  );
}
