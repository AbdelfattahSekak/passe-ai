export interface Activity {
  title: string;
  coordinates: string;
  details: string;
  address: string;
  images: Array<{
    url: string;
    description: string;
  }>;
}

export interface Stop {
  title: string;
  coordinates: string;
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