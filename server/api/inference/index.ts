import { defineEventHandler } from "h3";
import { handleRateLimit } from "./middleware/rateLimiter";
import { processInference } from "./controllers/inferenceController";
import { logger } from "@/server/utils/logger";
import { supabase } from "~/server/supabase";


export default defineEventHandler(async (event) => {
  try {
    const rateLimitResult = await handleRateLimit(event);
    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    const trip = await processInference(event);
    const { data, error: dbError } = await supabase
      .from("trips")
      .insert([trip])
      .select("*");
    if (dbError) {
      logger.error("Database save error:", dbError);
    }
    if (data?.[0]) {
      logger.info("Successfully saved trip to database", {
        tripId: data[0].id,
      });
      return data[0];
    }
    return new Response("Failed to save trip to database", { status: 500 });
  } catch (error) {
    logger.error("Inference API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
