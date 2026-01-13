import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardWrapper from "../../components/dashboard/wrapper/wrapper";
import UserDetailsHeader from "../../components/user-details/user-details-header";
import UserDetailsTabContent from "../../components/user-details/user-details-tab-content";
import userService from "../../services/userService";
import type { User } from "../../../globalTypes";
import { usePageTitle } from "../../hooks/usePageTitle";

/**
 * UserDetails page fetches a single user's details and displays
 * a header with user info and tabs for different details sections.
 */
const UserDetails = () => {
  const [activeTabState, setActiveTabState] = React.useState("General Details");
  const { userId } = useParams<{ userId: string }>(); // Extract userId from URL
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Set dynamic page title
  usePageTitle("User | Lendsqr");

  /**
   * Fetch user data from API
   */
  const loadUser = React.useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const userData = await userService.getUserById(userId);

      if (userData) {
        setUser(userData);
      } else {
        setError("User not found");
      }
    } catch (err) {
      console.error("Failed to load user:", err);
      setError("Failed to load user details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadUser();
    }
  }, [loadUser, userId]);

  const handleBackToUsers = () => {
    navigate("/users");
  };

  // Show error if no userId provided
  if (!userId) {
    return (
      <DashboardWrapper>
        <div className="error-state">
          <h2>User ID not provided</h2>
          <button onClick={handleBackToUsers}>Back to Users</button>
        </div>
      </DashboardWrapper>
    );
  }

  // Show loading skeleton while fetching
  if (loading) {
    return (
      <DashboardWrapper>
        <div className="loading-state">
          <div className="skeleton-header">
            <div className="skeleton-back"></div>
            <div className="skeleton-title"></div>
          </div>
          <div className="skeleton-card">
            <div className="skeleton-profile"></div>
            <div className="skeleton-tabs"></div>
          </div>
        </div>
      </DashboardWrapper>
    );
  }

  // Show error if fetching fails
  if (error) {
    return (
      <DashboardWrapper>
        <div className="error-state">
          <h2>{error}</h2>
          <button onClick={loadUser}>Retry</button>
          <button onClick={handleBackToUsers}>Back to Users</button>
        </div>
      </DashboardWrapper>
    );
  }

  // Show error if user not found
  if (!user) {
    return (
      <DashboardWrapper>
        <div className="error-state">
          <h2>User not found</h2>
          <button onClick={handleBackToUsers}>Back to Users</button>
        </div>
      </DashboardWrapper>
    );
  }

  // Format user for display and get tier info
  const formattedUser = userService.formatUserForDisplay(user);
  const tierStars = userService.getTierStars(user.tier);

  return (
    <DashboardWrapper>
      {/* Header with tabs */}
      <UserDetailsHeader
        activeTab={activeTabState}
        onTabChange={setActiveTabState}
        userId={userId}
        userData={formattedUser}
        tierStars={tierStars}
      />

      {/* Tab content */}
      <UserDetailsTabContent
        activeTab={activeTabState}
        userData={formattedUser}
      />
    </DashboardWrapper>
  );
};

export default UserDetails;
