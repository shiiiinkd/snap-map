// src/components/SnapMapPage.tsx
import { useState } from "react";
import MapView from "./MapView";
import ImageUploader from "./ImageUploader";
import { useRecords } from "../hooks/useRecords";
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import { useMapApiLoader } from "../hooks/useMapsApi";
import { Link } from "react-router-dom";
import { Flex, Box, Button } from "@chakra-ui/react";

//const extraMapOptions: google.maps.MapOptions = {};

//オブジェクトを返すものは{}, 配列を返すものは[]で定義
const SnapMapPage: React.FC = () => {
  const { isLoaded, loadError } = useMapApiLoader();
  const { currentPosition, loading, error } = useCurrentPosition();
  const { addRecord, getPhotosFor } = useRecords();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  if (!isLoaded) return <Box>読み込み中です...</Box>;
  if (loadError) return <Box>読み込みに失敗しました。</Box>;
  if (loading) return <Box>現在地を取得中...</Box>;
  if (error) return <Box>位置情報の取得に失敗しました。</Box>;
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
      <Flex gap="1rem">
        <Box
          flex="1"
          height="500px"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
        >
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
        </Box>
        <Box width="300px">
          <ImageUploader onFilesChange={setFiles} />
          {/* onFilesChange={setFiles } */}
          {/* 次のステップで選択地の写真一覧を出す */}
          <Button
            onClick={handleAdd}
            isDisabled={!selectedPlace || files.length === 0}
            mt="0.5rem"
            width="100%"
            colorScheme="teal"
          >
            追加
          </Button>

          {/* 選択地の写真ギャラリー */}
          {selectedPlace && (
            <Box mt="1rem">
              <h2>この場所の写真</h2>
              {photos.length > 0 ? (
                <Flex wrap="wrap" gap="0.5rem">
                  {photos.map((file, idx) => (
                    <Box key={idx} textAlign="center">
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
                      <Box fontSize="12px" wordBreak="break-all">
                        {file.name}
                      </Box>
                    </Box>
                  ))}
                </Flex>
              ) : (
                <p>この場所にはまだ写真がありません</p>
              )}
            </Box>
          )}
        </Box>
      </Flex>

      <Link to="/">Back to Home</Link>
    </>
  );
};

export default SnapMapPage;
