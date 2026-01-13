import HeaderCell from "./users-table-header-cell";
import FilterDropdown from "../dropdowns/filter/filter-dropdown";
import type { ClientFilterValues } from "../../../../globalTypes";

// Props for UsersTableHeader component
interface Props {
  tempFilters: ClientFilterValues; // Current filter values
  onTempFilterChange: (field: keyof ClientFilterValues, value: string) => void; // Callback for value change
  onApplyFilters: () => void; // Callback when applying filters
  onResetFilters: () => void; // Callback when resetting filters
}

const UsersTableHeader: React.FC<Props> = ({
  tempFilters,
  onTempFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const handleFilterApply = () => {
    onApplyFilters(); // Wrapper in case additional logic is needed
  };

  return (
    <thead>
      <tr>
        {/* Organization column has a filter dropdown */}
        <HeaderCell label="Organization">
          <FilterDropdown
            values={tempFilters}
            onChange={onTempFilterChange}
            onReset={onResetFilters}
            onFilter={handleFilterApply}
            onClose={() => {}} // Currently no extra logic on close
          />
        </HeaderCell>

        {/* Other static headers without dropdowns */}
        <HeaderCell label="Username" />
        <HeaderCell label="Email" />
        <HeaderCell label="Phone Number" />
        <HeaderCell label="Date Joined" />
        <HeaderCell label="Status" />
        <th /> {/* Empty header for spacing/actions */}
      </tr>
    </thead>
  );
};

export default UsersTableHeader;