export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "active" | "inactive" | "blacklisted" | "pending";
  fullName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residence: string;
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  bank: {
    bankName: string;
    accountNumber: string;
    balance: number;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    relationship: string;
    email: string;
  };
  tier: number;
}

export interface EndpointConfig {
  baseUrl: string;
  endpoints: string[];
}

export interface PaginationResult {
  users: User[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface EndpointStats {
  count: number;
  url: string;
  error?: string;
}

export interface FilterOptions {
  status?: string;
  tier?: string;
  search?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export interface FormattedUserStats {
  totalUsers: string;
  activeUsers: string;
  usersWithLoans: string;
  usersWithSavings: string;
}

export interface ApiFilterOptions {
  status?: string;
  tier?: string;
  search?: string;
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  dateJoined?: string;
}

export interface ClientFilterValues {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: string;
}