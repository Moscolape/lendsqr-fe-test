import { useState } from "react";
import { ASSETS } from "../../constants/assets";
import UserTabs from "./user-details.tab";
import BlacklistUserModal from "../modals/blacklist-modal";
import ActivateUserModal from "../modals/activate-modal";
import "./user-details.scss";

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

const Divider: React.FC = () => <div className="divider" />;

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

const UserDetailsHeader: React.FC<Props> = ({
  activeTab,
  onTabChange,
  userData,
  tierStars,
  onStatusUpdate,
}) => {
  const [blacklistModalOpen, setBlacklistModalOpen] = useState(false);
  const [activateModalOpen, setActivateModalOpen] = useState(false);

  const handleBlacklist = async () => {
    if (onStatusUpdate) {
      console.log("blacklisted");
    }
    setBlacklistModalOpen(false);
  };

  const handleActivate = async () => {
    if (onStatusUpdate) {
      console.log("activated");
    }
    setActivateModalOpen(false);
  };

  return (
    <section className="user-details-header">
      <a href="/users" className="back">
        <img src={ASSETS.arrowback} alt="" /> Back to Users
      </a>

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
