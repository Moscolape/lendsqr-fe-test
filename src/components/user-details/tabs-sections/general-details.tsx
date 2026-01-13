import "../tabs.scss";
import { InfoGroup } from "../ui/info-group";
import { type User } from "../../../../globalTypes";

/**
 * Props definition for GeneralDetails component
 */
interface Props {
  userData: User;
}

/**
 * GeneralDetails
 *
 * Displays grouped personal, educational, social,
 * and guarantor information for a user.
 */
const GeneralDetails: React.FC<Props> = ({ userData }) => {
  return (
    // Wrapper card for General Details tab
    <div className="tab-card">
      <InfoGroup
        title="Personal Information"
        items={[
          { label: "Full Name", value: userData.fullName },
          { label: "Phone Number", value: userData.phoneNumber },
          { label: "Email Address", value: userData.email },
          { label: "BVN", value: userData.bvn },
          { label: "Gender", value: userData.gender },
          { label: "Marital Status", value: userData.maritalStatus },
          { label: "Children", value: userData.children },
          { label: "Type of Residence", value: userData.residence },
        ]}
      />

      <InfoGroup
        title="Education and Employment"
        items={[
          { label: "Level of Education", value: userData.education.level },
          {
            label: "Employment Status",
            value: userData.education.employmentStatus,
          },
          { label: "Sector of Employment", value: userData.education.sector },
          {
            label: "Duration of Employment",
            value: userData.education.duration,
          },
          { label: "Office Email", value: userData.education.officeEmail },
          { label: "Monthly Income", value: userData.education.monthlyIncome },
          { label: "Loan Repayment", value: userData.education.loanRepayment },
        ]}
      />

      <InfoGroup
        title="Socials"
        items={[
          { label: "Twitter", value: userData.socials.twitter },
          { label: "Facebook", value: userData.socials.facebook },
          { label: "Instagram", value: userData.socials.instagram },
        ]}
      />

      <InfoGroup
        title="Guarantor"
        items={[
          { label: "Full Name", value: userData.guarantor.fullName },
          { label: "Phone Number", value: userData.guarantor.phoneNumber },
          { label: "Email Address", value: userData.guarantor.email },
          { label: "Relationship", value: userData.guarantor.relationship },
        ]}
      />
    </div>
  );
};

export default GeneralDetails;
