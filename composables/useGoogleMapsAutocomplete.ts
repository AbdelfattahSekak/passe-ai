import { ref, onMounted } from "vue";
export function useGoogleMapsAutocomplete(elementId: string) {
  const place = ref<google.maps.places.PlaceResult | null>(null);
  const autocomplete = ref<google.maps.places.Autocomplete | null>(null);

  onMounted(() => {
    const element = document.getElementById(elementId) as HTMLInputElement;

    autocomplete.value = new google.maps.places.Autocomplete(element, {
      types: ["geocode"],
      fields: ["formatted_address", "geometry", "name"],
    });
    autocomplete.value.addListener("place_changed", () => {
      const selectedPlace = autocomplete.value?.getPlace();
      if (selectedPlace) {
        place.value = selectedPlace;
      }
    });
  });

  return {
    place,
    autocomplete,
  };
}
