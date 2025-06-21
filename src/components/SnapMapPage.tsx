//src\components\SnapMapPage.tsx
import { useState } from "react";
import MapView from "./MapView";
import ImageUploader from "./ImageUploader";
import { useRecords } from "../hooks/useRecords";
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import { useMapApiLoader } from "../hooks/useMapsApi";
import { Link } from "react-router-dom";

//const extraMapOptions: google.maps.MapOptions = {};

//オブジェクトを返すものは{}、配列を返すものは[]で定義
const SnapMapPage: React.FC = () => {
  const { isLoaded, loadError } = useMapApiLoader();
  const { currentPosition, loading, error } = useCurrentPosition();
  const { addRecord, getPhotosFor } = useRecords();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  if (!isLoaded) return <div>読み込み中です...</div>;
  if (loadError) return <div>読み込みに失敗しました。</div>;
  if (loading) return <div>現在地を取得中...</div>;
  if (error) return <div>位置情報の取得に失敗しました。</div>;
  if (!currentPosition) return null;

  const handleMapClick = (latLng: google.maps.LatLngLiteral) => {
    console.log("クリック座標", latLng);
    setSelectedPlace(latLng);
  };
  const handleAdd = () => {
    if (selectedPlace && files.length > 0) {
      addRecord(selectedPlace, files);
      setFiles([]);
    }
  };
  const photos = selectedPlace ? getPhotosFor(selectedPlace) : [];

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <MapView
          center={currentPosition}
          markers={[
            { position: currentPosition, label: "現在地" },
            ...(selectedPlace
              ? [{ position: selectedPlace, label: "選択" }]
              : []),
          ]}
          onMapClick={handleMapClick}

          //options={extraMapOptions}
        />
        <div style={{ width: "300px" }}>
          <ImageUploader onFilesChange={setFiles} />
          {/* onFilesChange={setFiles } */}
          {/* 次のステップで選択地の写真一覧を出す */}
          <button
            onClick={handleAdd}
            disabled={!selectedPlace || files.length === 0}
            style={{ marginTop: "0.5rem", width: "100%" }}
          >
            追加
          </button>

          {/* 選択地の写真ギャラリー */}
          {selectedPlace && (
            <div style={{ marginTop: "1rem" }}>
              <h2>この場所の写真</h2>
              {photos.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  {photos.map((file, idx) => (
                    <div key={idx} style={{ textAlign: "center" }}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                      <div style={{ fontSize: 12, wordBreak: "break-all" }}>
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>この場所にはまだ写真がありません</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Link to="/">Back to Home</Link>
    </>
  );
};

export default SnapMapPage;
