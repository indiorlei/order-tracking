"use client";

import { Marker } from "react-leaflet";
import { markerProps } from "./types";

export function MapMarker({ location, icon }: markerProps) {
  if (!location) return null;

  const { latitude, longitude } = location;

  return <Marker position={[latitude, longitude]} icon={icon} />;
}
