export default function DropIndicator({
  beforeId,
  column,
}: {
  beforeId: string;
  column: string;
}) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-1 h-1 w-full bg-violet-400 opacity-0"
    ></div>
  );
}
