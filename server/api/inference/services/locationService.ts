import getTripAdvisorLocationInfo from "~/utils/getTripAdvisorLocationInfo";
import { logger } from "@/server/utils/logger";
import type { Stop, Trip } from "~/types";

export async function enrichLocationData(tripData: string) {
  try {
    const tripInference = JSON.parse(tripData) as Pick<Trip, "stops" | "title">;
    const locationPromises = tripInference.stops.flatMap((stop: Stop) => {
      const promises = [
        enrichStopLocation(stop),
        // ...stop.activities.map((activity) =>
        //   getTripAdvisorLocationInfo(activity.address).then((locationInfo) => {
        //     activity.locationInfo = locationInfo;
        //   })
        // ),
      ];
      return promises;
    });

    await Promise.all(locationPromises);
    return tripInference;
  } catch (error) {
    logger.error("Error enriching location data:", error);
    throw error;
  }
}

async function enrichStopLocation(stop: Stop) {
  try {
    const locationInfo = await getTripAdvisorLocationInfo(stop.address);
    stop.locationInfo = locationInfo;
  } catch (error) {
    logger.error(`Error enriching stop location: ${stop.title}`, error);
    throw error;
  }
}
