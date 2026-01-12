import mockapi from "./mockApi";
import userCache from "./userCache";
import type { User } from "../../globalTypes";

class UserService {
  async getUserById(id: string): Promise<User | null> {
    const cachedUser = userCache.getCachedUser(id);
    if (cachedUser) {
      console.log("User found in cache:", id);
      return cachedUser;
    }

    console.log("Fetching user from API:", id);
    const user = await mockapi.getUserById(id);

    if (user) {
      userCache.cacheUser(user);
    }

    return user;
  }

  async updateUserStatus(
    userId: string,
    status: User["status"]
  ): Promise<boolean> {
    try {
      const user = await this.getUserById(userId);

      if (user) {
        const updatedUser = { ...user, status };

        userCache.cacheUser(updatedUser);

        mockapi.invalidateCache();

        return true;
      }

      return false;
    } catch (error) {
      console.error("Error updating user status:", error);
      return false;
    }
  }

  formatUserForDisplay(user: User) {
    return {
      id: user.id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      bvn: user.bvn,
      gender: user.gender,
      maritalStatus: user.maritalStatus,
      children: user.children,
      residence: user.residence,
      organization: user.organization,
      username: user.username,
      dateJoined: user.dateJoined,
      tier: user.tier,
      status: user.status,

      education: {
        level: user.education?.level || "Not specified",
        employmentStatus: user.education?.employmentStatus || "Not specified",
        sector: user.education?.sector || "Not specified",
        duration: user.education?.duration || "Not specified",
        officeEmail: user.education?.officeEmail || "Not specified",
        monthlyIncome: user.education?.monthlyIncome || "₦0",
        loanRepayment: user.education?.loanRepayment || "₦0",
      },

      socials: {
        twitter: user.socials?.twitter || "Not specified",
        facebook: user.socials?.facebook || "Not specified",
        instagram: user.socials?.instagram || "Not specified",
      },

      bank: {
        bankName: user.bank?.bankName || "Not specified",
        accountNumber: user.bank?.accountNumber || "Not specified",
        balance: user.bank?.balance || 0,
      },

      guarantor: {
        fullName: user.guarantor?.fullName || "Not specified",
        phoneNumber: user.guarantor?.phoneNumber || "Not specified",
        email: user.guarantor?.email || "Not specified",
        relationship: user.guarantor?.relationship || "Not specified",
      },
    };
  }

  getTierStars(tier: number): number {
    return Math.min(Math.max(tier, 1), 3);
  }
}

export default new UserService();
