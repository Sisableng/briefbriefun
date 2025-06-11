export default function ListItem({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <div className="grid size-8 place-content-center rounded-full border">
        {number}
      </div>
      <div className="flex-1">{children}</div>
    </li>
  );
}
