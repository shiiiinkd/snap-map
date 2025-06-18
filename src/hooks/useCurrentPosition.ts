//useCurrentPosition.ts
import { useEffect, useState } from "react";

export const useCurrentPosition = () => {
  // 現在地を保持
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | GeolocationPositionError | null>(
    null
  );

  // マウント時に一度だけ現在地を取得
  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error("Geolocation unsupported"));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentPosition({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, []);

  return {
    currentPosition,
    loading,
    error,
  };
};
