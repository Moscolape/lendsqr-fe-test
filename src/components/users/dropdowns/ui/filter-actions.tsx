interface FilterActionsProps {
  // Clears all active filters
  onReset: () => void;

  // Applies current filter values
  onFilter: () => void;
}

// Stateless action buttons for filter dropdown
const FilterActions: React.FC<FilterActionsProps> = ({
  onReset,
  onFilter,
}) => {
  return (
    <div className="actions">
      {/* Resets filter values to defaults */}
      <button className="reset" onClick={onReset}>
        Reset
      </button>

      {/* Applies filters and triggers parent logic */}
      <button className="filter" onClick={onFilter}>
        Filter
      </button>
    </div>
  );
};

export default FilterActions;
