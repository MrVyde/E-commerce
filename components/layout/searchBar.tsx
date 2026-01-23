"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  suggestions: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (item: string) => void;
}

export default function SearchBar({query, suggestions, onChange, onSelect,}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md ">
  <input
    type="text"
    value={query}
    onChange={onChange}
    placeholder="Search products..."
   className="
      w-full h-10 pl-10 pr-4 py-2 rounded-full
      bg-white/70 backdrop-blur-md
      text-gray-900 placeholder-gray-500
      border border-white/30
      shadow-md shadow-black/20
      outline-none
      focus:outline-none
      focus:ring-0
      focus:border-cyan-300/60
      focus:shadow-[0_0_10px_rgba(34,211,238,0.45)]
      transition-all
    "
  />

  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />

  {suggestions.length > 0 && (
    <ul
      className="
        absolute mt-2 w-full z-50 max-h-60 overflow-y-auto
        rounded-xl border border-white/30
        bg-zinc-600 backdrop-blur-md
        shadow-lg shadow-black/30
      "
    >
      {suggestions.map((item, index) => (
        <li
          key={index}
          className="
            px-4 py-2 cursor-pointer
            hover:bg-cyan-200/40
            transition
          "
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
