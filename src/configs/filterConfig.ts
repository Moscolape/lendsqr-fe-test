import type { FilterValues } from "../components/users/dropdowns/filter/filter-dropdown";

export const filterConfig: {
  key: keyof FilterValues;
  label: string;
  type?: "text" | "email" | "date" | "tel";
  placeholder?: string;
  options?: { label: string; value: string }[];
}[] = [
  {
    key: "organization",
    label: "Organization",
    placeholder: "Organization",
  },
  { key: "username", label: "Username", placeholder: "User" },
  { key: "email", label: "Email", type: "email", placeholder: "Email" },
  { key: "dateJoined", label: "Date", type: "date" },
  {
    key: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "Phone Number",
  },
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" },
      { label: "Blacklisted", value: "blacklisted" },
    ],
  },
];
