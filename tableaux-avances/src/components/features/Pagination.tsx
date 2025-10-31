import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPageSize, setCurrentPage } from "../../store/slices/filterSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  totalItems: number;
}

export const Pagination = ({ totalItems }: PaginationProps) => {
  const dispatch = useAppDispatch();
  const { currentPage, pageSize } = useAppSelector((state) => state.filters);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      {/* Page size selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Lignes par page:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => dispatch(setPageSize(Number(value)))}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          Page {currentPage} sur {totalPages}
        </span>

        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
