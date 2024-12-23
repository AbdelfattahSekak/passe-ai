import axios, { AxiosError } from "axios";
import { LocationInfo } from "~/types";

const config = useRuntimeConfig();

export default async function getGoogleLocationInfo(
  query: string
): Promise<LocationInfo> {
  try {
    // First, search for the place to get the place_id
    const searchResponse = await axios.post(
      `https://places.googleapis.com/v1/places:searchText`,
      {
        textQuery: query,
      },
      {
        headers: {
          "X-Goog-Api-Key": config.server.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": "places.id,places.photos",
        },
      }
    );

    console.log("Search response:", searchResponse.data);

    if (searchResponse.data.places?.[0]) {
      const place = searchResponse.data.places[0];

      return {
        id: place.id || null,
        photos:
          place.photos?.map((photo: any) => ({
            id: photo.name,
            width: photo.widthPx,
            height: photo.heightPx,
          })) || [],
      };
    }

    return {
      id: null,
      photos: [],
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error getting location info:", error.response?.data);
    }
    return {
      id: null,
      photos: [],
    };
  }
}
