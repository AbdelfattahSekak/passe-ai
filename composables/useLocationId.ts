import { ref } from "vue";

export interface LocationInfo {
  id: string | null;
  photos: google.maps.places.Photo[];
}

export default function useLocationId() {
  const getLocationInfo = async (query: string): Promise<LocationInfo> => {
    try {
      const { Place } = (await google.maps.importLibrary(
        "places"
      )) as google.maps.PlacesLibrary;

      const searchRequest = {
        textQuery: query,
        fields: ["displayName", "location", "businessStatus", "id"],
        language: "en-US",
        maxResultCount: 1,
      };

      const { places } = await Place.searchByText(searchRequest);

      if (places && places.length > 0) {
        const placeId = places[0].id;

        // Create a new Place instance to fetch photos
        const place = new Place({
          id: placeId,
        });

        // Fetch photos for the place
        await place.fetchFields({ fields: ["photos"] });
        // Get the photo URL if available
        return {
          id: placeId,
          photos: place.photos || [],
        };
      }

      return {
        id: null,
        photos: [],
      };
    } catch (error) {
      console.error("Error getting location info:", error);
      return {
        id: null,
        photos: [],
      };
    }
  };

  return {
    getLocationInfo,
  };
}
