import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "550px",
};

const Home: React.FC = () => {
  // 現在地を保持
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Google Maps API の読み込み状態
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GMAP_KEY!,
    libraries: ["places"],
  });

  // マウント時に一度だけ現在地を取得
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setCurrentPosition({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error", error);
        }
      );
    }
  }, []);

  // 読み込みエラー時
  if (loadError) return <div>読み込みに失敗しました</div>;
  // API 読み込み中 or 現在地取得中
  if (!isLoaded || !currentPosition) return <div>現在地を取得中...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={14}
    >
      {/* 必要に応じてマーカーなどを配置 */}
    </GoogleMap>
  );
};

export default Home;
