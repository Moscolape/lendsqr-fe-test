import type { User } from "../../globalTypes";

const USER_CACHE_PREFIX = 'user_';
const CACHE_DURATION = 30 * 60 * 1000;

interface CachedUser {
  user: User;
  timestamp: number;
}

class UserCacheService {
  cacheUser(user: User): void {
    const cached: CachedUser = {
      user,
      timestamp: Date.now()
    };
    localStorage.setItem(`${USER_CACHE_PREFIX}${user.id}`, JSON.stringify(cached));
  }

  getCachedUser(userId: string): User | null {
    const cached = localStorage.getItem(`${USER_CACHE_PREFIX}${userId}`);
    
    if (!cached) return null;
    
    try {
      const parsed: CachedUser = JSON.parse(cached);
      
      if (Date.now() - parsed.timestamp > CACHE_DURATION) {
        this.clearUserCache(userId);
        return null;
      }
      
      return parsed.user;
    } catch (error) {
      console.error('Error parsing cached user:', error);
      this.clearUserCache(userId);
      return null;
    }
  }

  clearUserCache(userId: string): void {
    localStorage.removeItem(`${USER_CACHE_PREFIX}${userId}`);
  }

  clearAllUserCache(): void {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(USER_CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
}

export default new UserCacheService();