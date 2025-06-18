//useMapsApi.ts
import { useJsApiLoader } from "@react-google-maps/api";

const googleMapLibraries: "places"[] = ["places"];

export const useMapApiLoader = () => {
  // Google Maps API の読み込み状態
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GMAP_KEY!,
    libraries: googleMapLibraries,
  });

  return {
    isLoaded,
    loadError,
  };
};
