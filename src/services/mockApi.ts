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

// Endpoint configuration pulled from environment variables
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

/**
 * Mock API service that simulates multiple endpoints.
 * - Supports caching, pagination, filtering, and statistics calculation.
 */
class MultiMockAPIService {
  private cache: User[] | null = null; // In-memory cache of fetched users
  private lastFetch: number | null = null; // Timestamp of last fetch
  private readonly cacheDuration = 5 * 60 * 1000; // Cache duration: 5 minutes

  /**
   * Flatten all configured endpoints into full URLs
   */
  private getAllEndpointUrls(): string[] {
    const urls: string[] = [];
    ENDPOINT_CONFIGS.forEach((config) => {
      config.endpoints.forEach((endpoint) => {
        urls.push(`${config.baseUrl}/${endpoint}`);
      });
    });
    return urls;
  }

  /**
   * Fetch users from all endpoints in parallel
   * Returns combined array of users
   */
  async fetchAllUsers(): Promise<User[]> {
    const urls = this.getAllEndpointUrls();

    try {
      const promises = urls.map((url) =>
        fetch(url)
          .then(async (res): Promise<User[]> => {
            if (!res.ok)
              throw new Error(`Failed to fetch ${url}: ${res.status}`);
            return (await res.json()) as User[];
          })
          .catch((error) => {
            console.warn(`Failed to fetch from ${url}:`, error.message);
            return []; // Return empty array on failure
          })
      );

      const results = await Promise.all(promises);
      return results.flat(); // Flatten all arrays into one
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

  /**
   * Fetch users with in-memory caching
   */
  private async fetchWithCache(): Promise<User[]> {
    const now = Date.now();

    if (
      this.cache &&
      this.lastFetch &&
      now - this.lastFetch < this.cacheDuration
    ) {
      return this.cache; // Return cached data if still valid
    }

    const users = await this.fetchAllUsers();
    this.cache = users;
    this.lastFetch = now;
    return users;
  }

  /**
   * Get paginated, filtered users
   */
  async getUsers(
    page: number = 1,
    limit: number = 20,
    filters: ApiFilterOptions = {}
  ): Promise<PaginationResult> {
    const allUsers = await this.fetchWithCache();
    let filteredUsers = allUsers;

    // Apply filters (status, tier, search, organization, etc.)
    if (filters.status)
      filteredUsers = filteredUsers.filter((u) => u.status === filters.status);
    if (filters.tier)
      filteredUsers = filteredUsers.filter(
        (u) => u.tier.toString() === filters.tier
      );
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.fullName?.toLowerCase().includes(searchLower) ||
          u.email?.toLowerCase().includes(searchLower) ||
          u.organization?.toLowerCase().includes(searchLower) ||
          u.username?.toLowerCase().includes(searchLower)
      );
    }
    if (filters.organization)
      filteredUsers = filteredUsers.filter((u) =>
        u.organization
          ?.toLowerCase()
          .includes(filters.organization!.toLowerCase())
      );
    if (filters.username)
      filteredUsers = filteredUsers.filter((u) =>
        u.username?.toLowerCase().includes(filters.username!.toLowerCase())
      );
    if (filters.email)
      filteredUsers = filteredUsers.filter((u) =>
        u.email?.toLowerCase().includes(filters.email!.toLowerCase())
      );
    if (filters.phoneNumber)
      filteredUsers = filteredUsers.filter((u) =>
        u.phoneNumber?.includes(filters.phoneNumber!)
      );
    if (filters.dateJoined) {
      const filterDate = new Date(filters.dateJoined);
      filteredUsers = filteredUsers.filter((u) => {
        try {
          const userDate = new Date(u.dateJoined);
          return filterDate.toDateString() === userDate.toDateString();
        } catch {
          return false;
        }
      });
    }

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      users: filteredUsers.slice(startIndex, endIndex),
      totalCount: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limit),
      currentPage: page,
    };
  }

  /**
   * Get a single user by ID
   */
  async getUserById(id: string): Promise<User | null> {
    if (this.cache) {
      const cachedUser = this.cache.find((u) => u.id === id);
      if (cachedUser) return cachedUser;
    }

    // Try all endpoints sequentially
    for (const config of ENDPOINT_CONFIGS) {
      for (const endpoint of config.endpoints) {
        try {
          const url = `${config.baseUrl}/${endpoint}/${id}`;
          const res = await fetch(url);
          if (res.ok) {
            const user = (await res.json()) as User;
            if (this.cache && !this.cache.find((u) => u.id === id))
              this.cache.push(user);
            return user;
          }
        } catch {
          continue; // Skip failed endpoint
        }
      }
    }

    return null; // Not found
  }

  /**
   * Get stats for each endpoint (user count)
   */
  async getStats(): Promise<Record<string, EndpointStats>> {
    const urls = this.getAllEndpointUrls();
    const stats: Record<string, EndpointStats> = {};

    for (const url of urls) {
      try {
        const res = await fetch(url);
        const data = res.ok ? ((await res.json()) as User[]) : [];
        const endpointName = url.split("/").pop() || "unknown";
        stats[endpointName] = { count: data.length, url };
      } catch (error) {
        const endpointName = url.split("/").pop() || "unknown";
        stats[endpointName] = {
          count: 0,
          url,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }

    return stats;
  }

  /**
   * Calculate aggregated stats from all users
   */
  async calculateStats(): Promise<UserStats> {
    const users = await this.fetchWithCache();
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "active").length;
    const usersWithLoans = users.filter(
      (u) => this.extractNumberFromCurrency(u.education.loanRepayment) > 0
    ).length;
    const usersWithSavings = users.filter(
      (u) => (u.bank.balance || 0) > 0
    ).length;

    return { totalUsers, activeUsers, usersWithLoans, usersWithSavings };
  }

  /**
   * Return stats formatted as strings for display
   */
  async getFormattedStats(): Promise<FormattedUserStats> {
    const stats = await this.calculateStats();
    return {
      totalUsers: this.formatNumber(stats.totalUsers),
      activeUsers: this.formatNumber(stats.activeUsers),
      usersWithLoans: this.formatNumber(stats.usersWithLoans),
      usersWithSavings: this.formatNumber(stats.usersWithSavings),
    };
  }

  // Convert currency string like "₦1,000" to number
  private extractNumberFromCurrency(currencyString: string): number {
    if (!currencyString) return 0;
    const numericString = currencyString.replace(/[₦$, ]/g, "");
    return parseInt(numericString) || 0;
  }

  // Format number with commas
  private formatNumber(num: number): string {
    return num.toLocaleString("en-US");
  }

  // Clear cached data
  invalidateCache(): void {
    this.cache = null;
    this.lastFetch = null;
  }
}

export default new MultiMockAPIService();
export type { User, PaginationResult, FilterOptions, EndpointStats };
