import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to articles page with search query
      navigate(`/articles?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative flex items-center bg-background/95 backdrop-blur-sm border-2 border-border hover:border-primary/50 rounded-full shadow-lg transition-all duration-300 focus-within:border-primary focus-within:shadow-xl">
          <Search className="w-5 h-5 text-muted-foreground ml-5 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, regulations..."
            className="flex-1 bg-transparent px-4 py-4 text-base outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="mr-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex-shrink-0"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
