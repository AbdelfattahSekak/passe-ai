import axios, { AxiosError } from "axios";
import type { LocationInfo } from "~/types";

const config = useRuntimeConfig();

export default async function getTripAdvisorLocationInfo(
  query: string
): Promise<LocationInfo> {
  try {
    logger.info("Getting location info for", { query });
    // First, search for the location to get the location_id
    const searchUrl = `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${encodeURIComponent(
      query
    )}&language=en&key=${config.server.TRIPADVISOR_API_KEY}`;
    const searchResponse = await axios.get(searchUrl, {
      headers: { accept: "application/json" },
    });

    if (searchResponse.data.data?.[0]) {
      const location = searchResponse.data.data[0];
      const locationId = location.location_id;

      // Get photos for the location
      const photosUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?language=en&key=${config.server.TRIPADVISOR_API_KEY}`;
      const photosResponse = await axios.get(photosUrl, {
        headers: { accept: "application/json" },
      });

      return {
        id: locationId,
        photos:
          photosResponse.data.data
            .filter((photo: any) => photo.images?.original?.url)
            .map((photo: any) => ({
              id: photo.id.toString(),
              url: photo.images.original.url,
            })) || [],
      };
    }

    return {
      id: null,
      photos: [],
    };
  } catch (error) {
    console.error("Error getting location info:", error);
    if (error instanceof AxiosError) {
      console.error("Error getting location info:", error.response?.data);
    }
    return {
      id: null,
      photos: [],
    };
  }
}
