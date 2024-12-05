export interface Location {
  title: string;
  coordinates: string;
  details: string;
  address: string;
  images: Image[];
}

export interface Image {
  url: string;
  caption: string;
}

export interface Activity extends Location {}

export interface Stop extends Location {
  activities: Activity[];
}

export interface TripResponse {
  stops: Stop[];
}

export type TripRequest = {
  startPoint: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  preferences?: string;
  groupType?: "family" | "couple" | "friends" | "alone";
  nbStops?: number;
  transportationMode?: "car" | "train" | "plane" | "mixed";
  activitiesType?: "romantic" | "adventurous" | "cultural";
};
