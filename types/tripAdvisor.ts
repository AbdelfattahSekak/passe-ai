interface AddressObj {
  street1: string;
  street2: string;
  city: string;
  country: string;
  postalcode: string;
  address_string: string;
}

interface Ancestor {
  level: string;
  name: string;
  location_id: string;
}

interface RankingData {
  geo_location_id: string;
  ranking_string: string;
  geo_location_name: string;
  ranking_out_of: string;
  ranking: string;
}

interface ReviewRatingCount {
  [key: number]: string;
}

interface Subrating {
  name: string;
  localized_name: string;
  rating_image_url: string;
  value: string;
}

interface TripType {
  name: string;
  localized_name: string;
  value: string;
}

interface Photo {
  id: string;
  url: string;
}

interface Category {
  name: string;
  localized_name: string;
}

interface Subcategory extends Category {}

interface NeighborhoodInfo {
  location_id: string;
  name: string;
}

export interface TripAdvisorActvityDetails {
  location_id: string;
  name: string;
  description: string;
  web_url: string;
  address_obj: AddressObj;
  ancestors: Ancestor[];
  latitude: string;
  longitude: string;
  timezone: string;
  write_review: string;
  ranking_data: RankingData;
  rating: string;
  rating_image_url: string;
  num_reviews: string;
  review_rating_count: ReviewRatingCount;
  subratings: Record<string, Subrating>;
  photo_count: string;
  see_all_photos: string;
  price_level: string;
  amenities: string[];
  category: Category;
  subcategory: Subcategory[];
  styles: string[];
  neighborhood_info: NeighborhoodInfo[];
  trip_types: TripType[];
  awards: any[]; // Replace `any[]` with appropriate type if awards structure is known
}
