export interface Activity {
  title: string;
  lat: number;
  lng: number;
  details: string;
  address: string;
  images: Array<{
    url: string;
    description: string;
  }>;
}

export interface Stop {
  title: string;
  lat: number;
  lng: number;
  address: string;
  details: string;
  activities: Activity[];
  images: Array<{
    url: string;
    description: string;
  }>;
}

export interface SavedTrip {
  id: string;
  name: string;
  createdAt: string;
  start: string;
  destination: string;
  stops: Stop[];
}

export interface SearchFormData {
  start: string;
  destination: string;
  nbStops: number;
}

export interface Location {
  formatted_address: string;
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
