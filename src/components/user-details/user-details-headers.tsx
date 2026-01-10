import { useState } from "react";
import { ASSETS } from "../../constants/assets";
import UserTabs from "./user-details-tabs";

import "./user-details.scss";
import BlacklistUserModal from "../modals/blacklist-modal";
import ActivateUserModal from "../modals/activate-modal";


interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userId?: string;
}

const UserProfile: React.FC = () => (
  <div className="profile">
    <div className="avatar">
      <img src={ASSETS.avatarIcon} alt="avatar" />
    </div>
    <div className="identity">
      <h3>Grace Effiom</h3>
      <p>LSQFf587g90</p>
    </div>
  </div>
);
const Divider: React.FC = () => <div className="divider" />;

const UserTier: React.FC<{ stars: number }> = ({ stars }) => (
  <div className="tier">
    <p>User’s Tier</p>
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

const UserFinance: React.FC = () => (
  <div className="finance">
    <p>₦200,000.00</p>
    <span>9912345678/Providus Bank</span>
  </div>
);

const UserDetailsHeader: React.FC<Props> = ({ activeTab, onTabChange, userId }) => {
  const [blacklistModalOpen, setBlacklistModalOpen] = useState(false);
  const [activateModalOpen, setActivateModalOpen] = useState(false);

  const userStars = 2;

  return (
    <section className="user-details-header">
      <a href="/users" className="back">
        <img src={ASSETS.arrowback} alt="" /> Back to Users
      </a>

      <div className="top">
        <h1>User Details</h1>

        <div className="actions">
          <button className="danger" onClick={() => setBlacklistModalOpen(true)}>Blacklist User</button>
          <button className="primary" onClick={() => setActivateModalOpen(true)}>Activate User</button>
        </div>
      </div>

      <div className="card">
        <div className="highlighted-info">
          <UserProfile />
          <Divider />
          <UserTier stars={userStars} />
          <Divider />
          <UserFinance />
        </div>

        <UserTabs activeTab={activeTab} onChange={onTabChange} />
      </div>

      {blacklistModalOpen && userId && (
        <BlacklistUserModal
          isOpen={blacklistModalOpen}
          userId={userId}
          close={() => setBlacklistModalOpen(false)}
        />
      )}

      {activateModalOpen && userId && (
        <ActivateUserModal
          isOpen={activateModalOpen}
          userId={userId}
          close={() => setActivateModalOpen(false)}
        />
      )}
    </section>
  );
};

export default UserDetailsHeader;
