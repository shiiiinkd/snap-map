//useRecords.ts
import { useState } from "react";

type LatLng = { lat: number; lng: number };
type Record = { place: LatLng; photos: File[] };

export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);

  //新しいレコードを末尾追加(...スプレッド構文で以前の配列に新しい要素を追加できる)
  const addRecord = (place: LatLng, photos: File[]) => {
    setRecords((prev) => {
      //既存を確認
      const idx = prev.findIndex(
        (r) => r.place.lat === place.lat && r.place.lng === place.lng
      );
      if (idx !== -1) {
        //既存レコード発見、photosをマージ
        return prev.map((r, i) =>
          i === idx ? { ...r, photos: [...r.photos, ...photos] } : r
        );
      } else {
        return [...prev, { place, photos: photos }];
      }
    });
  };

  //既存のレコードを削除
  const deleteRecord = (place: LatLng) => {
    setRecords((prev) =>
      prev.filter(
        (r) => !(r.place.lat === place.lat && r.place.lng === place.lng)
      )
    );
  };

  //指定したplaceに対してphotos(選択した画像)を取得する
  const getPhotosFor = (place: LatLng): File[] => {
    const match = records.find(
      (r) => r.place.lat === place.lat && r.place.lng === place.lng
    );
    console.log("現在のrecords:", records);
    return match ? match.photos : [];
  };

  return {
    records,
    addRecord,
    deleteRecord,
    getPhotosFor,
  };
};
