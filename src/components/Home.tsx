//Home.tsx
import { useState } from "react";
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import { useMapApiLoader } from "../hooks/useMapsApi";
import MapView from "./MapView";

//const extraMapOptions: google.maps.MapOptions = {};

const Home: React.FC = () => {
  const { isLoaded, loadError } = useMapApiLoader();
  const { currentPosition, loading, error } = useCurrentPosition();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.LatLngLiteral | null>(null);

  if (!isLoaded) return <div>読み込み中です...</div>;
  if (loadError) return <div>読み込みに失敗しました。</div>;
  if (loading) return <div>現在地を取得中...</div>;
  if (error) return <div>位置情報の取得に失敗しました。</div>;
  if (!currentPosition) return null;

  // const handleMapClick = (latLng: google.maps.LatLngLiteral) => {
  //   console.log("Clicked at", latLng);
  //   setSelectedPlace(latLng);
  // };

  return (
    <MapView
      center={currentPosition}
      markers={[
        { position: currentPosition, label: "現在地" },
        ...(selectedPlace ? [{ position: selectedPlace, label: "選択" }] : []),
      ]}
      onMapClick={(latlng) => {
        console.log("クリック座標: ", latlng);
        setSelectedPlace(latlng);
      }}
      //options={extraMapOptions}
    />
  );
};

export default Home;
