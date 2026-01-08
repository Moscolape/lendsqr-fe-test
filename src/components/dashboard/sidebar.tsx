import SidebarItem from "../sidebar/item";
import SidebarSection from "../sidebar/section";

import "./sidebar.scss";

import { ASSETS } from "../../constants/assets";
import { ChevronDown } from "lucide-react";

export default function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="switch-org">
        <img src={ASSETS.organization1} alt="" />
        <span>Switch Organization</span>
        <ChevronDown size={14} />
      </div>

      <SidebarItem
        icon={<img src={ASSETS.dashboard} alt="" />}
        label="Dashboard"
      />

      <SidebarSection title="Customers">
        <SidebarItem
          icon={<img src={ASSETS.users} alt="" />}
          label="Users"
          active
        />
        <SidebarItem
          icon={<img src={ASSETS.guarantors} alt="" />}
          label="Guarantors"
        />
        <SidebarItem icon={<img src={ASSETS.money} alt="" />} label="Loans" />
        <SidebarItem
          icon={<img src={ASSETS.handshake} alt="" />}
          label="Decision Models"
        />
        <SidebarItem
          icon={<img src={ASSETS.piggybank} alt="" />}
          label="Savings"
        />
        <SidebarItem
          icon={<img src={ASSETS.loanRequest} alt="" />}
          label="Loan Requests"
        />
        <SidebarItem
          icon={<img src={ASSETS.whitelist} alt="" />}
          label="Whitelist"
        />
        <SidebarItem
          icon={<img src={ASSETS.blacklist} alt="" />}
          label="Karma"
        />
      </SidebarSection>

      <SidebarSection title="Businesses">
        <SidebarItem
          icon={<img src={ASSETS.organization2} alt="" />}
          label="Organization"
        />
        <SidebarItem
          icon={<img src={ASSETS.loanRequest} alt="" />}
          label="Loan Products"
        />
        <SidebarItem
          icon={<img src={ASSETS.bank} alt="" />}
          label="Savings Products"
        />
        <SidebarItem
          icon={<img src={ASSETS.coins} alt="" />}
          label="Fees and Charges"
        />
        <SidebarItem
          icon={<img src={ASSETS.transaction} alt="" />}
          label="Transactions"
        />
        <SidebarItem
          icon={<img src={ASSETS.services} alt="" />}
          label="Services"
        />
        <SidebarItem
          icon={<img src={ASSETS.settings} alt="" />}
          label="Service Account"
        />
        <SidebarItem
          icon={<img src={ASSETS.settlement} alt="" />}
          label="Settlements"
        />
        <SidebarItem
          icon={<img src={ASSETS.reports} alt="" />}
          label="Reports"
        />
      </SidebarSection>

      <SidebarSection title="Settings">
        <SidebarItem
          icon={<img src={ASSETS.preferences} alt="" />}
          label="Preferences"
        />
        <SidebarItem
          icon={<img src={ASSETS.pricing} alt="" />}
          label="Fees and Pricing"
        />
        <SidebarItem
          icon={<img src={ASSETS.audit} alt="" />}
          label="Audit Logs"
        />
        <SidebarItem
          icon={<img src={ASSETS.systems} alt="" />}
          label="Systems Messages"
        />
      </SidebarSection>

      <section className="logout-section">
        <div className="logout-item">
          <img src={ASSETS.logout} alt="" />
          <span>Logout</span>
        </div>
        <span className="lendsqr-version">v1.2.0</span>
      </section>
    </aside>
  );
}
