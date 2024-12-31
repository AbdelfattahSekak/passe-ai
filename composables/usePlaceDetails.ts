export function usePlaceDetails() {
  const fetchPlaceDetails = async (address: string) => {
    const { Place } = (await google.maps.importLibrary(
      "places"
    )) as google.maps.PlacesLibrary;
    try {
      const request = {
        textQuery: address,
        fields: ["displayName", "location", "businessStatus", "photos"],
        language: "en-US",
        maxResultCount: 1,
      };
      const { places } = await Place.searchByText(request);
      const place = places?.[0] || null;
      return place;
    } catch (error) {
      console.error("Error fetching place details:", error);
      return null;
    }
  };

  return {
    fetchPlaceDetails,
  };
}
