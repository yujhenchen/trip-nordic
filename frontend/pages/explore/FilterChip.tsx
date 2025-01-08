export default function FilterChip({
  ref,
}: {
  ref: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className="flex flex-wrap gap-2" ref={ref}>
      <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full shadow-sm border border-blue-400">
        <span>Selected</span>
        <svg
          className="w-4 h-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

{
  /* <button class="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-full shadow-sm border border-gray-300 hover:bg-gray-200">
      <span>Unselected</span>
    </button> */
}
