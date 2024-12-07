export interface SearchFormData {
  start: string
  destination: string
  stops: number
}

export interface Location {
  formatted_address: string
  place_id: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}