import type { TripAdvisorActvityDetails } from "./tripAdvisor";
export type { TripAdvisorActvityDetails } from "./tripAdvisor";

export type ActivityCatergory =
  | "hotels"
  | "restaurants"
  | "geos"
  | "attractions";

export interface Activity {
  id: string;
  title: string;
  lat: number;
  lng: number;
  details: string;
  address: string;
  locationInfo: LocationInfo;
  category: ActivityCatergory;
}

export interface Stop {
  id: string;
  title: string;
  lat: number;
  lng: number;
  address: string;
  details: string;
  activities: Activity[];
  placeDetails?: google.maps.places.Place
}

export interface Trip {
  id: string;
  createdAt: string;
  start: string;
  nbStops: number;
  destination: string;
  title: string;
  stops: Stop[];
}

export interface SearchFormData {
  start: string;
  destination: string;
  nbStops: number;
}

export type LocationPhoto = {
  id: string;
  url: string;
};

export interface LocationInfo {
  id: string;
  photos?: LocationPhoto[];
  details?: TripAdvisorActvityDetails;
}
