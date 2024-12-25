import axios, { AxiosError } from "axios";
import type { LocationInfo, Activity, LocationPhoto } from "~/types";

const config = useRuntimeConfig();

export default async function getTripAdvisorLocationInfo(
  query: string
): Promise<LocationInfo> {
  try {
    logger.info("Getting location info for", { query });
    const searchUrl = `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${encodeURIComponent(
      query
    )}&language=en&key=${config.server.TRIPADVISOR_API_KEY}`;
    const searchResponse = await axios.get(searchUrl, {
      headers: { accept: "application/json" },
    });

    if (searchResponse.data.data?.[0]) {
      const location = searchResponse.data.data[0];
      const locationId = location.location_id;

      const locationPhotos = await getLocationPhotos(locationId);
      return {
        id: locationId,
        photos: locationPhotos,
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

export async function getNearbyActivities(
  lat: number,
  lng: number
): Promise<Activity[]> {
  try {
    const url = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${lat}%2C${lng}&category=attractions&language=en&key=${config.server.TRIPADVISOR_API_KEY}`;
    const response = await axios.get(url, {
      headers: { accept: "application/json" },
    });

    if (!response.data.data) {
      return [];
    }

    const activities = await Promise.all(
      response.data.data.map(async (item: any) => {
        const photos = await getLocationPhotos(item.location_id);
        return {
          title: item.name,
          address: item.address_obj.address_string,
          details: item.description,
          lat: item.latitude,
          lng: item.longitude,
          locationInfo: {
            id: item.location_id,
            photos,
          },
        } satisfies Activity;
      })
    );

    return activities;
  } catch (error) {
    console.error("Error getting nearby activities:", error);
    return [];
  }
}

async function getLocationPhotos(locationId: string): Promise<LocationPhoto[]> {
  try {
    const photosUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?language=en&key=${config.server.TRIPADVISOR_API_KEY}`;
    const photosResponse = await axios.get(photosUrl, {
      headers: { accept: "application/json" },
    });

    return photosResponse.data.data
      .filter((photo: any) => photo.images?.original?.url)
      .map((photo: any) => ({
        id: photo.id.toString(),
        url: photo.images.original.url,
      }));
  } catch (error) {
    console.error("Error getting location photos:", error);
    return [];
  }
}
