type Props = {
  selected: string;
  onSelect: (category: string) => void;
};

const categories = [
  'Appliances',
  'Gaming',
  'Phone',
  'Smart Home',
  'Digital',
  'Electronic',
];

export default function MobileFilterBar({ selected, onSelect }: Props) {
  return (
    <div className="bg-white px-1 pb-5 md:p-4">
      {/* Filter Header */}
      <h2 className="text-lg font-semibold mb-3">Filter</h2>

      {/* Category Label */}
      <p className="text-sm font-medium text-gray-600 mb-2">Category</p>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`w-full px-4 py-2 text-sm border ${
              selected === cat
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}