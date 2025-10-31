import { Button } from "../ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSortBy } from "../../store/slices/filterSlice";

interface SortButtonProps {
  column: string;
  label: string;
}

export const SortButton = ({ column, label }: SortButtonProps) => {
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder } = useAppSelector((state) => state.filters);
  const isActive = sortBy === column;

  const handleSort = () => {
    dispatch(setSortBy(column));
  };

  const SortIcon = () => {
    if (!isActive)
      return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4 text-blue-600" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-blue-600" />
    );
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSort}
      className={`font-semibold ${
        isActive ? "text-blue-600" : "text-gray-800"
      }`}
    >
      {label}
      <SortIcon />
    </Button>
  );
};
