import "../tabs.scss";
import { InfoGroup } from "../ui/info-group";

const GeneralDetails = () => {
  return (
    <div className="tab-card">
      <InfoGroup
        title="Personal Information"
        items={[
          { label: "Full Name", value: "Grace Effiom" },
          { label: "Phone Number", value: "07060780922" },
          { label: "Email Address", value: "grace@gmail.com" },
          { label: "BVN", value: "07060780922" },
          { label: "Gender", value: "Female" },
          { label: "Marital Status", value: "Single" },
          { label: "Children", value: "None" },
          { label: "Type of Residence", value: "Parent’s Apartment" },
        ]}
      />

      <InfoGroup
        title="Education and Employment"
        items={[
          { label: "Level of Education", value: "B.Sc" },
          { label: "Employment Status", value: "Employed" },
          { label: "Sector of Employment", value: "FinTech" },
          { label: "Duration of Employment", value: "2 years" },
          { label: "Office Email", value: "grace@lendsqr.com" },
          {
            label: "Monthly Income",
            value: "₦200,000.00 - ₦400,000.00",
          },
          { label: "Loan Repayment", value: "40,000" },
        ]}
      />

      <InfoGroup
        title="Socials"
        items={[
          { label: "Twitter", value: "@grace_effiom" },
          { label: "Facebook", value: "Grace Effiom" },
          { label: "Instagram", value: "@grace_effiom" },
        ]}
      />

      <InfoGroup
        title="Guarantor"
        items={[
          { label: "Full Name", value: "Debby Ogana" },
          { label: "Phone Number", value: "07060780922" },
          { label: "Email Address", value: "debby@gmail.com" },
          { label: "Relationship", value: "Sister" },
        ]}
      />
    </div>
  );
};

export default GeneralDetails;
