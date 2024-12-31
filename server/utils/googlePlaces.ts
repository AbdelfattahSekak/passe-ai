import { logger } from "./logger";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PLACES_BASE_URL = "https://places.googleapis.com/v1/places";

interface PlaceSearchResponse {
  places: Array<{
    id: string;
    displayName: {
      text: string;
    };
    formattedAddress: string;
    priceLevel: string;
    photos?: Array<{
      name: string;
    }>;
  }>;
}

interface PlaceDetails {
  id: string;
  displayName: {
    text: string;
  };
  formattedAddress: string;
  photos?: Array<{
    name: string;
  }>;
}

export async function searchPlace(address: string) {
  try {
    const response = await fetch(`${PLACES_BASE_URL}:searchText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY!,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.photos'
      },
      body: JSON.stringify({
        textQuery: address
      })
    });
    
    const data = await response.json() as PlaceSearchResponse;
    return data.places[0];
  } catch (error) {
    logger.error('Error searching place:', error);
    return null;
  }
}

export async function getPlaceDetails(placeId: string) {
  try {
    const response = await fetch(`${PLACES_BASE_URL}/${placeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY!,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,photos'
      }
    });
    
    return await response.json() as PlaceDetails;
  } catch (error) {
    logger.error('Error fetching place details:', error);
    return null;
  }
}
