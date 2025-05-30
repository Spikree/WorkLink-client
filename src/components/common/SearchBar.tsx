import { FormEvent } from "react";
import Button from "./Button";
import { Search } from "lucide-react";

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
  // const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="w-full max-w-sm min-w-[200px]">
        <div className="relative flex items-center gap-2">
          <Search className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder={placeholder}
          />
          <Button
            className={`py-2 px-4 transition-colors duration-200 ${
              searchQuery.length === 0 
                ? 'bg-danger opacity-50' 
                : 'hover:bg-primary/5 cursor-pointer'
            }`}
            type="submit"
            disableStyles={false}
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
