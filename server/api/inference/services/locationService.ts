import {
  getNearbyActivities,
  getLocationInfo,
} from "~/server/utils/tripAdvisor";
import { logger } from "@/server/utils/logger";
import type { Stop, Trip } from "~/types";

export async function enrichLocationData(tripData: string) {
  try {
    const tripInference = JSON.parse(tripData) as Pick<Trip, "stops" | "title">;
    const locationPromises = tripInference.stops.map((stop: Stop) =>
      enrichStopLocation(stop)
    );
    await Promise.all(locationPromises);
    return tripInference;
  } catch (error) {
    logger.error("Error enriching location data:", error);
    throw error;
  }
}

async function enrichStopLocation(stop: Stop) {
  try {
    const [locationInfo, nearbyActivities] = await Promise.all([
      getLocationInfo(stop.address),
      getNearbyActivities(stop.lat, stop.lng),
    ]);
    if (locationInfo) {
      stop.locationInfo = locationInfo;
      stop.activities = nearbyActivities;
    }
  } catch (error) {
    logger.error(`Error enriching stop location: ${stop.title}`, error);
    throw error;
  }
}
