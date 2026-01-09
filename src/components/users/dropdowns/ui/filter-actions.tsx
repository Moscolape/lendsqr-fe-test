interface FilterActionsProps {
  onReset: () => void;
  onFilter: () => void;
}

const FilterActions: React.FC<FilterActionsProps> = ({
  onReset,
  onFilter,
}) => {
  return (
    <div className="actions">
      <button className="reset" onClick={onReset}>
        Reset
      </button>
      <button className="filter" onClick={onFilter}>
        Filter
      </button>
    </div>
  );
};

export default FilterActions;
