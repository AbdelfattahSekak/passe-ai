export interface Activity {
  title: string;
  lat: number;
  lng: number;
  details: string;
  address: string;
  locationInfo: LocationInfo;
}

export interface Stop {
  title: string;
  lat: number;
  lng: number;
  address: string;
  details: string;
  activities: Activity[];
  locationInfo: LocationInfo;
}

export interface Trip {
  id: string;
  createdAt: string;
  start: string;
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
  id: string | null;
  photos: LocationPhoto[];
}
