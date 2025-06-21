import { useState } from "react";

type LatLng = { lat: number; lng: number };
type Record = { place: LatLng; photos: File[] };

export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);

  //新しいレコードを末尾追加(...スプレッド構文で以前の配列に新しい要素を追加できる)
  const addRecord = (place: LatLng, photos: File[]) => {
    const newRecord: Record = { place, photos };
    setRecords((prev) => [...prev, newRecord]);
    console.log("画像:", records);
  };

  //指定したplaceに対してphotos(選択した画像)を取得する
  const getPhotosFor = (place: LatLng): File[] => {
    const match = records.find(
      (r) => r.place.lat === place.lat && r.place.lng === place.lng
    );
    return match ? match.photos : [];
  };

  return {
    records,
    addRecord,
    getPhotosFor,
  };
};
