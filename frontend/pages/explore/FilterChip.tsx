import { cn } from "@/lib/utils";

export default function FilterChip({
  selected,
  value,
  selectedIcon,
  ref,
}: {
  selected: boolean;
  value: string;
  selectedIcon: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className="flex flex-wrap gap-4" ref={ref}>
      <button
        className={cn(
          "flex items-center px-4 py-2 rounded-full shadow-sm border space-x-2",
          selected
            ? "bg-blue-100 text-blue-800 border-blue-400"
            : "bg-gray-100 text-gray-800 border-gray-400 hover:bg-gray-200"
        )}
      >
        <span>{value}</span>
        {selected ? selectedIcon : null}
      </button>
    </div>
  );
}
