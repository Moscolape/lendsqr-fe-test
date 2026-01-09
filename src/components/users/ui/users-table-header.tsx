import HeaderCell from "./users-table-header-cell";
import FilterDropdown from "../dropdowns/filter-dropdown";
import type { Filters } from "../../../hooks/useUserFilters";

interface Props {
  filters: Filters;
  onChange: (field: keyof Filters, value: string) => void;
  onReset: () => void;
}

const UsersTableHeader: React.FC<Props> = ({
  filters,
  onChange,
  onReset,
}) => {
  return (
    <thead>
      <tr>
        <HeaderCell label="Organization">
          <FilterDropdown
            values={filters}
            onChange={onChange}
            onReset={onReset}
            onFilter={() => {}}
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