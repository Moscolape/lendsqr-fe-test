import type { User } from "../../../globalTypes";

export const createMockUser = (overrides?: Partial<User>): User => ({
  id: "1",
  organization: "Test Organization",
  username: "graceeffiom",
  email: "grace@gmail.com",
  phoneNumber: "07060780922",
  dateJoined: "2023-09-05",
  status: "active",
  fullName: "Grace Effiom",
  bvn: "07060780922",
  gender: "Female",
  maritalStatus: "Single",
  children: "None",
  residence: "Parent's Apartment",
  education: {
    level: "B.Sc",
    employmentStatus: "Employed",
    sector: "FinTech",
    duration: "2 years",
    officeEmail: "grace@lendsqr.com",
    monthlyIncome: "₦200,000.00 - ₦400,000.00",
    loanRepayment: "40,000"
  },
  socials: {
    twitter: "@grace_effiom",
    facebook: "Grace Effiom",
    instagram: "@grace_effiom"
  },
  bank: {
    bankName: "Providus Bank",
    accountNumber: "9912345678",
    balance: 200000
  },
  guarantor: {
    fullName: "Debby Ogana",
    phoneNumber: "07060780922",
    email: "debby@gmail.com",
    relationship: "Sister"
  },
  tier: 2,
  ...overrides
});