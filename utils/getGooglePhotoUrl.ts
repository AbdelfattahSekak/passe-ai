import type { PlacePhoto } from "~/types";

export default function getGooglePhotoUrl(
  photo: PlacePhoto,
  googleMapApiKey: string
): string {
  return `https://places.googleapis.com/v1/${photo.id}/media?key=${googleMapApiKey}&maxHeightPx=400`;
}
