//MapView.tsx
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { InterfaceMap } from "../styles/GoogleMapStyles";
import currentIconURL from "../assets/current_marker.png";

const containerStyle = {
  width: "100%",
  height: "550px",
};

//propsの型をinterfaceで定義
interface MapViewProps {
  center: google.maps.LatLngLiteral;
  markers?: Array<{ position: google.maps.LatLngLiteral; label?: string }>;
  options?: google.maps.MapOptions;
  onMapClick?: (latLng: google.maps.LatLngLiteral) => void;
}

const MapView: React.FC<MapViewProps> = ({
  center,
  markers = [],
  options = {},
  onMapClick,
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
      onClick={(e) => {
        if (e.latLng && onMapClick) {
          onMapClick(e.latLng.toJSON());
        }
      }}
    >
      {markers.map((m, idx) => (
        <MarkerF
          key={idx}
          position={m.position}
          label={m.label ? { text: m.label } : defaultLabel}
          onLoad={(marker) => {
            marker.setIcon({
              url: currentIconURL,
              scaledSize: new window.google.maps.Size(28, 28),
              anchor: new window.google.maps.Point(14, 14),
            });
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;
