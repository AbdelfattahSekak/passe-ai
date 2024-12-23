import { defineEventHandler } from "h3";
import { handleRateLimit } from "./middleware/rateLimiter";
import { processInference } from "./controllers/inferenceController";
import { logger } from "../../utils/logger";

export default defineEventHandler(async (event) => {
  try {
    // Rate limiting check
    const rateLimitResult = await handleRateLimit(event);
    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    // Process inference request
    // return await processInference(event);
  } catch (error) {
    logger.error("Inference API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
