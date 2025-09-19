// src/components/SnapMapPage.tsx
import { useState } from "react";
import MapView from "./MapView";
import ImageUploader from "./ImageUploader";
import { useRecords } from "../hooks/useRecords";
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import { useMapApiLoader } from "../hooks/useMapsApi";
import { Link } from "react-router-dom";
import { Flex, Box, Button } from "@chakra-ui/react";
import PhotoGallery from "./PhotoGallery";

//const extraMapOptions: google.maps.MapOptions = {};
//オブジェクトを返すものは{}, 配列を返すものは[]で定義
const SnapMapPage: React.FC = () => {
  const { isLoaded, loadError } = useMapApiLoader();
  const { currentPosition, loading, error } = useCurrentPosition();
  const { records, addRecord, deleteRecord, getPhotosFor } = useRecords();

  const [unsavedPlace, setUnsavedPlace] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const photos = unsavedPlace ? getPhotosFor(unsavedPlace) : [];

  if (!isLoaded) return <Box>読み込み中です...</Box>;
  if (loadError) return <Box>読み込みに失敗しました。</Box>;
  if (loading) return <Box>現在地を取得中...</Box>;
  if (error) return <Box>位置情報の取得に失敗しました。</Box>;
  if (!currentPosition) return null;

  const handleMapClick = (latLng: google.maps.LatLngLiteral) => {
    console.log("クリック座標", latLng);
    setUnsavedPlace(latLng);
  };

  const handleAdd = () => {
    if (unsavedPlace && files.length > 0) {
      //filesは今追加しようとしている未追加ファイル
      addRecord(unsavedPlace, files);

      setFiles([]);
    }
  };

  const handleDelete = () => {
    if (unsavedPlace && photos.length > 0) {
      //photosはすでに追加済みのファイル
      deleteRecord(unsavedPlace);
      //setFiles([]);
    }
  };

  const markers = [
    // 現在地マーカー
    { position: currentPosition, label: "現在地", kind: "current" as const },

    // 未保存マーカー（現在選択中のマーカー）
    ...(unsavedPlace
      ? [{ position: unsavedPlace, label: "選択中", kind: "unsaved" as const }]
      : []),

    // 保存済みマ―カー）
    ...records.map((record) => ({
      position: record.place,
      label: "保存済み",
      kind: "saved" as const,
    })),
  ];

  return (
    <>
      <Flex gap="1rem" height="100vh">
        <Box width="300px">
          <ImageUploader onFilesChange={setFiles} />

          {/* 追加機能 */}
          <Button
            onClick={handleAdd}
            isDisabled={!unsavedPlace || files.length === 0}
            mt="0.5rem"
            width="100%"
            colorScheme="teal"
          >
            追加
          </Button>

          {/* 選択地の写真ギャラリー */}
          {unsavedPlace && <PhotoGallery photos={photos} />}

          {/* 削除機能 */}
          <Button
            onClick={handleDelete}
            // 写真があるときに削除できるように変更する
            isDisabled={!unsavedPlace || photos.length === 0}
            mt="0.5rem"
            width="100%"
            colorScheme="teal"
          >
            削除
          </Button>
        </Box>
        <Box
          flex="1"
          height="100%"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
        >
          <MapView
            center={currentPosition}
            markers={markers}
            onMapClick={handleMapClick}
            //options={extraMapOptions}
          />
        </Box>
      </Flex>

      <Link to="/">Back to Home</Link>
    </>
  );
};

export default SnapMapPage;
