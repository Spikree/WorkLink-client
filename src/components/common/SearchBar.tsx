import { FormEvent } from "react";
import Button from "./Button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
}

const SearchBar = ({
  placeholder = "",
  onSearch,
  className = "",
  searchQuery = "",
  setSearchQuery,
}: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery?.("");
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="w-full max-w-lg">
        <div className="relative flex items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-danger transition-all duration-200">
          <button
            type="button"
            onClick={searchQuery ? handleClear : undefined}
            className={`absolute w-5 h-5 left-3 transition-colors duration-200 ${
              searchQuery ? 'text-gray-600 hover:text-gray-800 cursor-pointer' : 'text-gray-400 cursor-default'
            }`}
          >
            {searchQuery ? <X className="w-5 text-gray-400 h-5" /> : <Search className="w-5 h-5" />}
          </button>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            className="flex-1 bg-transparent placeholder:text-gray-400 text-gray-700 text-sm pl-10 pr-3 py-3 focus:outline-none"
            placeholder={placeholder}
          />
          
          <Button
            className={`m-1 py-2 px-6 rounded-md text-sm font-medium transition-all duration-200 ${
              searchQuery.length === 0 
                ? 'bg-danger text-gray-600' 
                : 'bg-secondary text-white hover:bg-secondary'
            }`}
            type="submit"
            disableStyles={true}
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;