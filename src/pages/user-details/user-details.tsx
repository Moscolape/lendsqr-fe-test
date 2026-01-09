// user-details.tsx
import React from "react";
import DashboardWrapper from "../../components/dashboard/wrapper";

import "./user-details.scss";
import { ASSETS } from "../../constants/assets";
import GeneralDetails from "../../components/user-details/tabs/general-details";
import Documents from "../../components/user-details/tabs/documents";
import BankDetails from "../../components/user-details/tabs/bank-details";
import Loans from "../../components/user-details/tabs/loans";
import Savings from "../../components/user-details/tabs/savings";
import AppAndSystem from "../../components/user-details/tabs/app-system";

const tabs = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
];

const UserDetails = () => {
  const [activeTabState, setActiveTabState] = React.useState("General Details");
  const userStars = 2;

  return (
    <DashboardWrapper>
      <section className="user-details-header">
        <a href="/users" className="back">
          <img src={ASSETS.arrowback} alt="go back" /> Back to Users
        </a>

        <div className="top">
          <h1>User Details</h1>

          <div className="actions">
            <button className="danger">Blacklist User</button>
            <button className="primary">Activate User</button>
          </div>
        </div>

        <div className="card">
          <div className="highlighted-info">
            <div className="profile">
              <div className="avatar">
                <img src={ASSETS.avatarIcon} alt="avatar" />
              </div>

              <div className="identity">
                <h3>Grace Effiom</h3>
                <p>LSQFf587g90</p>
              </div>
            </div>

            <div className="divider" />

            <div className="tier">
              <p>User’s Tier</p>
              <div className="stars">
                {Array.from({ length: 3 }, (_, i) => (
                  <img
                    key={i}
                    src={i < userStars ? ASSETS.starFilled : ASSETS.starEmpty}
                    alt="star"
                  />
                ))}
              </div>
            </div>

            <div className="divider" />

            <div className="finance">
              <h3>₦200,000.00</h3>
              <p>9912345678/Providus Bank</p>
            </div>
          </div>

          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={tab === activeTabState ? "active" : ""}
                onClick={() => setActiveTabState(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeTabState === "General Details" && <GeneralDetails />}
      {activeTabState === "Documents" && <Documents />}
      {activeTabState === "Bank Details" && <BankDetails />}
      {activeTabState === "Loans" && <Loans />}
      {activeTabState === "Savings" && <Savings />}
      {activeTabState === "App and System" && <AppAndSystem />}
    </DashboardWrapper>
  );
};

export default UserDetails;
