// composables/useMapAnimations.ts

export function useMapAnimations() {
  function smoothZoom(
    map: google.maps.Map,
    targetZoom: number,
    currentZoom: number
  ) {
    const step = 0.5;
    const interval = 50; // milliseconds

    if (currentZoom < targetZoom) {
      const newZoom = Math.min(currentZoom + step, targetZoom);
      map.setZoom(newZoom);
      if (newZoom < targetZoom) {
        setTimeout(() => smoothZoom(map, targetZoom, newZoom), interval);
      }
    } else if (currentZoom > targetZoom) {
      const newZoom = Math.max(currentZoom - step, targetZoom);
      map.setZoom(newZoom);
      if (newZoom > targetZoom) {
        setTimeout(() => smoothZoom(map, targetZoom, newZoom), interval);
      }
    }
  }

  function getIdealZoomLevel(
    map: google.maps.Map,
    bounds: google.maps.LatLngBounds
  ): number {
    const mapDiv = map.getDiv();
    const width = mapDiv.offsetWidth;
    const height = mapDiv.offsetHeight;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const GLOBE_WIDTH = 256; // a constant in Google's map projection
    const latAngle = ne.lat() - sw.lat();
    const lngAngle = ne.lng() - sw.lng();

    const latZoom = Math.floor(
      Math.log((height * 360) / latAngle / GLOBE_WIDTH) / Math.LN2
    );
    const lngZoom = Math.floor(
      Math.log((width * 360) / lngAngle / GLOBE_WIDTH) / Math.LN2
    );

    return Math.min(latZoom, lngZoom) - 1; // Subtract 1 to add some padding
  }

  function animateViewToPosition(
    map: google.maps.Map,
    position: google.maps.LatLng | google.maps.LatLngLiteral,
    targetZoom: number = 15
  ) {
    map.panTo(position);
    const currentZoom = map.getZoom();
    if (currentZoom !== targetZoom) {
      smoothZoom(map, targetZoom, currentZoom!);
    }
  }

  function animateViewToBounds(
    map: google.maps.Map,
    bounds: google.maps.LatLngBounds
  ) {
    const center = bounds.getCenter();
    map.panTo(center);
    const targetZoom = getIdealZoomLevel(map, bounds);
    const currentZoom = map.getZoom();

    setTimeout(() => {
      smoothZoom(map, targetZoom, currentZoom!);
    }, 300);
  }

  return {
    smoothZoom,
    getIdealZoomLevel,
    animateViewToPosition,
    animateViewToBounds,
  };
}
