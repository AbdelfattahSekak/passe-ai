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
  id: string | null;
  photos?: LocationPhoto[];
  details?: LocationDetails;
}

export interface LocationDetails {
  location_id: string;
  name: string;
  description: string;
  web_url: string;
  address_obj: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
    address_string: string;
  };
  latitude: string;
  longitude: string;
  rating: string;
  website: string;
  phone: string;
  photos: LocationPhoto[];
}
