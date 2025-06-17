// hooks/useRateLimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limit configurations
export const RATE_LIMIT_CONFIGS = {
  // API routes - 5 requests per day
  api: {
    limiter: Ratelimit.fixedWindow(5, "1d"),
    enableProtection: true,
  },
  // User actions - 100 requests per hour
  user: {
    limiter: Ratelimit.fixedWindow(100, "1h"),
    enableProtection: true,
  },
  // Auth attempts - 10 requests per 15 minutes
  auth: {
    limiter: Ratelimit.fixedWindow(10, "15m"),
    enableProtection: true,
  },
  // Heavy operations - 10 requests per hour
  heavy: {
    limiter: Ratelimit.fixedWindow(10, "1h"),
    enableProtection: true,
  },
} as const;

// Singleton pattern to reuse rate limit instances
const rateLimitInstances = new Map<string, Ratelimit>();

function getRateLimitInstance(
  configKey: keyof typeof RATE_LIMIT_CONFIGS,
): Ratelimit {
  if (!rateLimitInstances.has(configKey)) {
    const config = RATE_LIMIT_CONFIGS[configKey];
    const instance = new Ratelimit({
      redis: Redis.fromEnv(),
      ...config,
    });
    rateLimitInstances.set(configKey, instance);
  }
  return rateLimitInstances.get(configKey)!;
}

// Custom hook for rate limiting
export function useRateLimit(
  configKey: keyof typeof RATE_LIMIT_CONFIGS = "api",
) {
  const ratelimit = getRateLimitInstance(configKey);

  const checkLimit = async (identifier: string, options?: { ip?: string }) => {
    try {
      const result = await ratelimit.limit(identifier, options);
      return {
        success: result.success,
        remaining: result.remaining,
        reset: result.reset,
        limit: result.limit,
        pending: result.pending,
      };
    } catch (error) {
      console.error("Rate limit check failed:", error);
      // Return success: true in case of rate limit service failure
      // You might want to change this behavior based on your needs
      return {
        success: true,
        remaining: 0,
        reset: Date.now(),
        limit: 0,
        pending: Promise.resolve(),
      };
    }
  };

  return {
    checkLimit,
    ratelimit, // Expose the instance if needed for advanced usage
  };
}

// Utility function for Next.js API routes
export async function checkRateLimit(
  identifier: string,
  configKey: keyof typeof RATE_LIMIT_CONFIGS = "api",
  options?: { ip?: string },
) {
  const { checkLimit } = useRateLimit(configKey);
  return await checkLimit(identifier, options);
}

// Response helper for API routes
export function createRateLimitResponse(remaining: number, response: Response) {
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set(
    "Set-Cookie",
    `X-RateLimit-Remaining=${remaining}; Path=/; SameSite=Strict`,
  );
  return response;
}
