import SidebarItem from "../sidebar/item";
import SidebarSection from "../sidebar/section";

import "./sidebar.scss";

import { ASSETS } from "../../constants/assets";
import { ChevronDown } from "lucide-react";

export default function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="switch-org">
        <img src={ASSETS.organization1} alt="organization-icon" />
        <span>Switch Organization</span>
        <ChevronDown size={14} />
      </div>

      <SidebarItem
        icon={<img src={ASSETS.dashboard} alt="dashboard-icon" />}
        label="Dashboard"
      />

      <SidebarSection title="Customers">
        <SidebarItem
          icon={<img src={ASSETS.users} alt="users-icon" />}
          label="Users"
          active
        />
        <SidebarItem
          icon={<img src={ASSETS.guarantors} alt="guarantors-icon" />}
          label="Guarantors"
        />
        <SidebarItem icon={<img src={ASSETS.money} alt="money-icon" />} label="Loans" />
        <SidebarItem
          icon={<img src={ASSETS.handshake} alt="handshake-icon" />}
          label="Decision Models"
        />
        <SidebarItem
          icon={<img src={ASSETS.piggybank} alt="piggybank-icon" />}
          label="Savings"
        />
        <SidebarItem
          icon={<img src={ASSETS.loanRequest} alt="loan-request-icon" />}
          label="Loan Requests"
        />
        <SidebarItem
          icon={<img src={ASSETS.whitelist} alt="whitelist-icon" />}
          label="Whitelist"
        />
        <SidebarItem
          icon={<img src={ASSETS.blacklist} alt="blacklist-icon" />}
          label="Karma"
        />
      </SidebarSection>

      <SidebarSection title="Businesses">
        <SidebarItem
          icon={<img src={ASSETS.organization2} alt="organization-icon" />}
          label="Organization"
        />
        <SidebarItem
          icon={<img src={ASSETS.loanRequest} alt="loan-request-icon" />}
          label="Loan Products"
        />
        <SidebarItem
          icon={<img src={ASSETS.bank} alt="bank-icon" />}
          label="Savings Products"
        />
        <SidebarItem
          icon={<img src={ASSETS.coins} alt="coins-icon" />}
          label="Fees and Charges"
        />
        <SidebarItem
          icon={<img src={ASSETS.transaction} alt="transaction-icon" />}
          label="Transactions"
        />
        <SidebarItem
          icon={<img src={ASSETS.services} alt="services-icon" />}
          label="Services"
        />
        <SidebarItem
          icon={<img src={ASSETS.settings} alt="settings-icon" />}
          label="Service Account"
        />
        <SidebarItem
          icon={<img src={ASSETS.settlement} alt="settlement-icon" />}
          label="Settlements"
        />
        <SidebarItem
          icon={<img src={ASSETS.reports} alt="reports-icon" />}
          label="Reports"
        />
      </SidebarSection>

      <SidebarSection title="Settings">
        <SidebarItem
          icon={<img src={ASSETS.preferences} alt="preferences-icon" />}
          label="Preferences"
        />
        <SidebarItem
          icon={<img src={ASSETS.pricing} alt="pricing-icon" />}
          label="Fees and Pricing"
        />
        <SidebarItem
          icon={<img src={ASSETS.audit} alt="audit-icon" />}
          label="Audit Logs"
        />
        <SidebarItem
          icon={<img src={ASSETS.systems} alt="systems-icon" />}
          label="Systems Messages"
        />
      </SidebarSection>

      <section className="logout-section">
        <div className="logout-item">
          <img src={ASSETS.logout} alt="logout-icon" />
          <span>Logout</span>
        </div>
        <span className="lendsqr-version">v1.2.0</span>
      </section>
    </aside>
  );
}
