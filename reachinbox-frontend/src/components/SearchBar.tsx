import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-6">
      <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 w-full">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search emails..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none text-white px-3 flex-1"
        />
        <button
          type="submit"
          className="bg-indigo-600 px-4 py-1 rounded-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
