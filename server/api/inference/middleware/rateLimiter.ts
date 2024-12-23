import { H3Event } from "h3";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logger } from "../../../utils/logger";

const config = useRuntimeConfig();

const redis = new Redis({
  url: config.server.UPSTASH_REDIS_URL,
  token: config.server.UPSTASH_REDIS_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "24 h"),
  analytics: true,
  prefix: "@upstash/ratelimit:inference",
});

export async function handleRateLimit(event: H3Event) {
  try {
    const clientIp = getRequestHeader(event, "x-forwarded-for") || "anonymous";
    const { success, limit, reset, remaining } = await ratelimit.limit(
      clientIp
    );

    if (!success) {
      logger.warn("Rate limit exceeded", { clientIp, limit, remaining, reset });
      return {
        success: false,
        response: new Response(
          JSON.stringify({
            error: "Too many requests",
            limit,
            remaining,
            reset,
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          }
        ),
      };
    }

    return { success: true };
  } catch (error) {
    logger.error("Rate limiter error:", error);
    throw error;
  }
}
