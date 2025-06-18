//Home.tsx
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import { useMapApiLoader } from "../hooks/useMapsApi";
import MapView from "./MapView";

//const extraMapOptions: google.maps.MapOptions = {};

const Home: React.FC = () => {
  const { isLoaded, loadError } = useMapApiLoader();
  const { currentPosition, loading, error } = useCurrentPosition();

  if (!isLoaded) return <div>読み込み中です...</div>;
  if (loadError) return <div>読み込みに失敗しました。</div>;
  if (loading) return <div>現在地を取得中...</div>;
  if (error) return <div>位置情報の取得に失敗しました。</div>;
  if (!currentPosition) return null;

  return (
    <MapView
      center={currentPosition}
      markers={[{ position: currentPosition, label: "現在地" }]}
      //options={extraMapOptions}
    />
  );
};

export default Home;
