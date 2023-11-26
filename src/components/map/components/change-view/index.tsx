import { useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";
import { mapProps } from "../../types";

export function ChangeView({ sender, receiver }: mapProps) {
  if (!sender || !receiver) return null;

  const map = useMap();
  const markers = [sender, receiver];
  const hasMarkers = markers.length;
  let markerBounds = latLngBounds([]);

  if (hasMarkers) {
    markers.forEach((marker) => {
      markerBounds.extend([marker.latitude, marker.longitude]);
    });

    markerBounds.isValid() && map.fitBounds(markerBounds);
  }

  return null;
}
