import HeaderCell from "./users-table-header-cell";
import FilterDropdown from "../dropdowns/filter/filter-dropdown";
import type { ClientFilterValues } from "../../../../globalTypes";

interface Props {
  tempFilters: ClientFilterValues;
  onTempFilterChange: (field: keyof ClientFilterValues, value: string) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const UsersTableHeader: React.FC<Props> = ({
  tempFilters,
  onTempFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const handleFilterApply = () => {
    onApplyFilters();
  };

  return (
    <thead>
      <tr>
        <HeaderCell label="Organization">
          <FilterDropdown
            values={tempFilters}
            onChange={onTempFilterChange}
            onReset={onResetFilters}
            onFilter={handleFilterApply}
            onClose={() => {}}
          />
        </HeaderCell>

        <HeaderCell label="Username" />
        <HeaderCell label="Email" />
        <HeaderCell label="Phone Number" />
        <HeaderCell label="Date Joined" />
        <HeaderCell label="Status" />
        <th />
      </tr>
    </thead>
  );
};

export default UsersTableHeader;
