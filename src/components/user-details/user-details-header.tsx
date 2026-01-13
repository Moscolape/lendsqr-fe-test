import { useState } from "react";
import { ASSETS } from "../../constants/assets";
import UserTabs from "./user-details.tab";
import BlacklistUserModal from "../modals/blacklist-modal";
import ActivateUserModal from "../modals/activate-modal";
import "./user-details.scss";

/**
 * Data structure representing user information
 * required by the UserDetailsHeader component.
 */
interface UserData {
  fullName: string;
  phoneNumber: string;
  email: string;
  bvn: string;
  organization: string;
  status: string;
  bank: {
    balance: number;
    accountNumber: string;
    bankName: string;
  };
}

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userId: string;
  userData: UserData;
  tierStars: number;
  onStatusUpdate?: (status: string) => void;
}

/**
 * Displays user's avatar and identity information
 */
const UserProfile: React.FC<{ userData: UserData }> = ({ userData }) => (
  <div className="profile">
    <div className="avatar">
      <img src={ASSETS.avatarIcon} alt="avatar" />
    </div>
    <div className="identity">
      <h3>{userData.fullName}</h3>
      <p>{userData.bvn || "LSQFf587g90"}</p>
    </div>
  </div>
);

/**
 * Simple visual divider between sections
 */
const Divider: React.FC = () => <div className="divider" />;

/**
 * Displays user's tier rating using stars
 */
const UserTier: React.FC<{ stars: number }> = ({ stars }) => (
  <div className="tier">
    <p>User's Tier</p>
    <div className="stars">
      {Array.from({ length: 3 }, (_, i) => (
        <img
          key={i}
          src={i < stars ? ASSETS.starFilled : ASSETS.starEmpty}
          alt="star"
        />
      ))}
    </div>
  </div>
);

/**
 * Displays user's financial summary
 */
const UserFinance: React.FC<{ userData: UserData }> = ({ userData }) => {
  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(userData.bank.balance || 0);

  return (
    <div className="finance">
      <p>{formattedBalance}</p>
      <span>
        {userData.bank.accountNumber || "N/A"}/{userData.bank.bankName || "N/A"}
      </span>
    </div>
  );
};

/**
 * UserDetailsHeader
 *
 * Main header section for the user details page.
 * Handles user actions, status updates, and tab navigation.
 */
const UserDetailsHeader: React.FC<Props> = ({
  activeTab,
  onTabChange,
  userData,
  tierStars,
  onStatusUpdate,
}) => {
  const [blacklistModalOpen, setBlacklistModalOpen] = useState(false);
  const [activateModalOpen, setActivateModalOpen] = useState(false);

  // Handle user blacklist action
  const handleBlacklist = async () => {
    onStatusUpdate?.("blacklisted");
    setBlacklistModalOpen(false);
  };

  // Handle user activation action
  const handleActivate = async () => {
    onStatusUpdate?.("active");
    setActivateModalOpen(false);
  };

  return (
    <section className="user-details-header">
      {/* Back navigation */}
      <a href="/users" className="back">
        <img src={ASSETS.arrowback} alt="" /> Back to Users
      </a>

      {/* Header actions */}
      <div className="top">
        <h1>User Details</h1>

        <div className="actions">
          <button
            className="danger"
            onClick={() => setBlacklistModalOpen(true)}
            disabled={userData.status === "blacklisted"}
          >
            Blacklist User
          </button>
          <button
            className="primary"
            onClick={() => setActivateModalOpen(true)}
            disabled={userData.status === "active"}
          >
            Activate User
          </button>
        </div>
      </div>

      {/* User summary card */}
      <div className="card">
        <div className="highlighted-info">
          <UserProfile userData={userData} />
          <Divider />
          <UserTier stars={tierStars} />
          <Divider />
          <UserFinance userData={userData} />
        </div>

        <UserTabs activeTab={activeTab} onChange={onTabChange} />
      </div>

      {/* Modals */}
      {blacklistModalOpen && (
        <BlacklistUserModal
          isOpen={blacklistModalOpen}
          userName={userData.fullName}
          onConfirm={handleBlacklist}
          close={() => setBlacklistModalOpen(false)}
        />
      )}

      {activateModalOpen && (
        <ActivateUserModal
          isOpen={activateModalOpen}
          userName={userData.fullName}
          onConfirm={handleActivate}
          close={() => setActivateModalOpen(false)}
        />
      )}
    </section>
  );
};

export default UserDetailsHeader;
