import type {
  User,
  PaginationResult,
  FilterOptions,
  EndpointStats,
  EndpointConfig,
  UserStats,
  FormattedUserStats,
  ApiFilterOptions,
} from "../../globalTypes";

const ENDPOINT_CONFIGS: EndpointConfig[] = [
  {
    baseUrl: import.meta.env.VITE_API_1_BASE_URL || "",
    endpoints: (import.meta.env.VITE_API_1_ENDPOINTS || "").split(","),
  },
  {
    baseUrl: import.meta.env.VITE_API_2_BASE_URL || "",
    endpoints: (import.meta.env.VITE_API_2_ENDPOINTS || "").split(","),
  },
  {
    baseUrl: import.meta.env.VITE_API_3_BASE_URL || "",
    endpoints: (import.meta.env.VITE_API_3_ENDPOINTS || "").split(","),
  },
];


class MultiMockAPIService {
  private cache: User[] | null = null;
  private lastFetch: number | null = null;
  private readonly cacheDuration = 5 * 60 * 1000;

  private getAllEndpointUrls(): string[] {
    const urls: string[] = [];
    ENDPOINT_CONFIGS.forEach((config) => {
      config.endpoints.forEach((endpoint) => {
        urls.push(`${config.baseUrl}/${endpoint}`);
      });
    });
    return urls;
  }

  async fetchAllUsers(): Promise<User[]> {
    const urls = this.getAllEndpointUrls();

    try {
      const promises = urls.map((url) =>
        fetch(url)
          .then(async (res): Promise<User[]> => {
            if (!res.ok) {
              throw new Error(`Failed to fetch ${url}: ${res.status}`);
            }
            return (await res.json()) as User[];
          })
          .catch((error) => {
            console.warn(`Failed to fetch from ${url}:`, error.message);
            return [];
          })
      );

      const results = await Promise.all(promises);
      return results.flat();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

  private async fetchWithCache(): Promise<User[]> {
    const now = Date.now();

    if (
      this.cache &&
      this.lastFetch &&
      now - this.lastFetch < this.cacheDuration
    ) {
      return this.cache;
    }

    const users = await this.fetchAllUsers();
    this.cache = users;
    this.lastFetch = now;
    return users;
  }

  async getUsers(
    page: number = 1,
    limit: number = 20,
    filters: ApiFilterOptions = {}
  ): Promise<PaginationResult> {
    const allUsers = await this.fetchWithCache();

    let filteredUsers = allUsers;

    if (filters.status) {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === filters.status
      );
    }

    if (filters.tier) {
      filteredUsers = filteredUsers.filter(
        (user) => user.tier.toString() === filters.tier
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower) ||
          user.organization?.toLowerCase().includes(searchLower) ||
          user.username?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.organization) {
      filteredUsers = filteredUsers.filter((user) =>
        user.organization
          ?.toLowerCase()
          .includes(filters.organization!.toLowerCase())
      );
    }

    if (filters.username) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username?.toLowerCase().includes(filters.username!.toLowerCase())
      );
    }

    if (filters.email) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email?.toLowerCase().includes(filters.email!.toLowerCase())
      );
    }

    if (filters.phoneNumber) {
      filteredUsers = filteredUsers.filter((user) =>
        user.phoneNumber?.includes(filters.phoneNumber!)
      );
    }

    if (filters.dateJoined) {
      const filterDate = new Date(filters.dateJoined);

      filteredUsers = filteredUsers.filter((user) => {
        try {
          const userDate = new Date(user.dateJoined);

          return filterDate.toDateString() === userDate.toDateString();
        } catch (error) {
          console.warn(`Failed to parse date: ${user.dateJoined}`, error);
          return false;
        }
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      users: filteredUsers.slice(startIndex, endIndex),
      totalCount: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limit),
      currentPage: page,
    };
  }

  async getUserById(id: string): Promise<User | null> {
    if (this.cache) {
      const cachedUser = this.cache.find((user) => user.id === id);
      if (cachedUser) return cachedUser;
    }

    for (const config of ENDPOINT_CONFIGS) {
      for (const endpoint of config.endpoints) {
        try {
          const url = `${config.baseUrl}/${endpoint}/${id}`;
          const res = await fetch(url);
          if (res.ok) {
            const user = (await res.json()) as User;

            if (this.cache && !this.cache.find((u) => u.id === id)) {
              this.cache.push(user);
            }
            return user;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error);
          continue;
        }
      }
    }
    return null;
  }

  async getStats(): Promise<Record<string, EndpointStats>> {
    const urls = this.getAllEndpointUrls();
    const stats: Record<string, EndpointStats> = {};

    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = (await res.json()) as User[];
          const endpointName = url.split("/").pop() || "unknown";
          stats[endpointName] = {
            count: data.length,
            url: url,
          };
        }
      } catch (error) {
        const endpointName = url.split("/").pop() || "unknown";
        stats[endpointName] = {
          count: 0,
          url: url,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }

    return stats;
  }

  async calculateStats(): Promise<UserStats> {
    const users = await this.fetchWithCache();

    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "active").length;

    const usersWithLoans = users.filter((user) => {
      const loanAmount = this.extractNumberFromCurrency(
        user.education.loanRepayment
      );
      return loanAmount > 0;
    }).length;

    const usersWithSavings = users.filter((user) => {
      const balance = user.bank.balance || 0;
      return balance > 0;
    }).length;

    return {
      totalUsers,
      activeUsers,
      usersWithLoans,
      usersWithSavings,
    };
  }

  async getFormattedStats(): Promise<FormattedUserStats> {
    const stats = await this.calculateStats();

    return {
      totalUsers: this.formatNumber(stats.totalUsers),
      activeUsers: this.formatNumber(stats.activeUsers),
      usersWithLoans: this.formatNumber(stats.usersWithLoans),
      usersWithSavings: this.formatNumber(stats.usersWithSavings),
    };
  }

  private extractNumberFromCurrency(currencyString: string): number {
    if (!currencyString) return 0;

    const numericString = currencyString.replace(/[₦$, ]/g, "");
    return parseInt(numericString) || 0;
  }

  private formatNumber(num: number): string {
    return num.toLocaleString("en-US");
  }

  invalidateCache(): void {
    this.cache = null;
    this.lastFetch = null;
  }
}

export default new MultiMockAPIService();
export type { User, PaginationResult, FilterOptions, EndpointStats };
