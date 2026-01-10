import React from "react";
import DashboardWrapper from "../../components/dashboard/wrapper/wrapper";

import UserDetailsHeader from "../../components/user-details/user-details-headers";
import UserDetailsTabContent from "../../components/user-details/user-details-tab-content";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [activeTabState, setActiveTabState] = React.useState("General Details");
  const { userId } = useParams<{ userId: string }>();

  if (!userId) return null;

  return (
    <DashboardWrapper>
      <UserDetailsHeader
        activeTab={activeTabState}
        onTabChange={setActiveTabState}
        userId={userId}
      />

      <UserDetailsTabContent activeTab={activeTabState} />
    </DashboardWrapper>
  );
};

export default UserDetails;
