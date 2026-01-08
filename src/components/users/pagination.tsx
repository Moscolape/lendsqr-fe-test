import React from "react";
import "./pagination.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZES = [10, 20, 50, 100];

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) => {
  if (!totalItems) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        out of {totalItems}
      </div>

      <div className="pagination-controls">
        <button
          className="icon-btn"
          disabled={currentPage === 1}
          onClick={handlePrev}
        >
          <ChevronLeft size={18} />
        </button>

        {currentPage > 1 && (
          <button
            className="page-btn"
            onClick={() => onPageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}

        <button className="page-btn active">{currentPage}</button>

        {currentPage < totalPages && (
          <button
            className="page-btn"
            onClick={() => onPageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}

        <button
          className="icon-btn"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
