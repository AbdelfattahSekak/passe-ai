export interface Activity {
  title: string;
  lat: number;
  lng: number;
  details: string;
  address: string;
  locationInfo?: LocationInfo;
}

export interface Stop {
  title: string;
  lat: number;
  lng: number;
  address: string;
  details: string;
  activities: Activity[];
  locationInfo?: LocationInfo;
}

export interface SavedTrip {
  id: string;
  createdAt: string;
  start: string;
  locationId?: string;
  destination: string;
  stops: Stop[];
}

export interface SearchFormData {
  start: string;
  destination: string;
  nbStops: number;
}

export type PlacePhoto = {
  id: string;
  width: number;
  height: number;
  url: string;  // Added this field for TripAdvisor photo URLs
};

export interface LocationInfo {
  id: string | null;
  photos: PlacePhoto[];
}

export type InferenceResponse = {
  stops: Stop[];
};
