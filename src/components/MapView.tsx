//MapView.tsx
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { InterfaceMap } from "../styles/GoogleMapStyles";

const containerStyle = {
  width: "100%",
  height: "550px",
};

//propsの型をinterfaceで定義
interface MapViewProps {
  center: google.maps.LatLngLiteral;
  markers?: Array<{ position: google.maps.LatLngLiteral; label?: string }>;
  options?: google.maps.MapOptions;
}

const MapView: React.FC<MapViewProps> = ({
  center,
  markers = [],
  options = {},
}) => {
  //マーカーを定義
  const defaultLabel: google.maps.MarkerLabel = {
    text: "現在地",
    fontFamily: "sans-serif",
    fontSize: "7px",
    fontWeight: "bold",
  };
  //マップのスタイル(マージ)
  const googleMapOptions: google.maps.MapOptions = {
    styles: InterfaceMap,
    ...options, //Homeから渡されたすべてのoption
  };

  return (
    <GoogleMap
      options={googleMapOptions}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
    >
      {markers.map((m, idx) => (
        <MarkerF
          key={idx}
          position={m.position}
          label={m.label ? { text: m.label } : defaultLabel}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;
