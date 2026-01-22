type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export default function SidebarFilter({ categories, selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onSelect(cat)}
              className={`block w-full text-left px-3 py-2 rounded ${
                selected === cat ? 'bg-black text-white' : 'hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}