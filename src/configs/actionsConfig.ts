import type { UserAction } from "../components/users/dropdowns/user-actions/UserActionsDropdown";
import { ASSETS } from "../constants/assets";

export const userActions: {
  key: UserAction;
  label: string;
  icon: string;
}[] = [
  {
    key: "view",
    label: "View Details",
    icon: ASSETS.viewUser,
  },
  {
    key: "blacklist",
    label: "Blacklist User",
    icon: ASSETS.blacklistUser,
  },
  {
    key: "activate",
    label: "Activate User",
    icon: ASSETS.activateUser,
  },
];
