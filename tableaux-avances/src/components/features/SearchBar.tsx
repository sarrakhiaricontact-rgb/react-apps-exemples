import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Search, Loader2 } from "lucide-react";
import { setSearchTerm } from "../../store/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.filters.searchTerm);
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchTerm) {
        dispatch(setSearchTerm(localSearch));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, dispatch, searchTerm]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Rechercher... (debounce 500ms)"
        value={localSearch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLocalSearch(e.target.value)
        }
        className="pl-10 w-full"
      />
      {localSearch !== searchTerm && (
        <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-blue-600" />
      )}
    </div>
  );
};
