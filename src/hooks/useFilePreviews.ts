//useFilePreviews.ts
import { useState, useEffect } from "react";

//ファイルの名前と生成URLをまとめて型管理
export type PreviewItem = {
  src: string; //URLを管理
  name: string; //ファイル名を管理
};

export const useFilePreviews = (files: File[]): PreviewItem[] => {
  const [previews, setPreviews] = useState<PreviewItem[]>([]); //プレビュー用URLと名前を管理するstate

  useEffect(() => {
    if (files.length === 0) {
      setPreviews((prev) => {
        prev.forEach((item) => URL.revokeObjectURL(item.src));
        return [];
      });
      return;
    }
    //古いURLの解放後、state更新
    //filesが変わったら一回だけ実行する
    setPreviews((prev) => {
      prev.forEach((item) => URL.revokeObjectURL(item.src));
      //新しいプレビューを返す
      return files.map((file) => ({
        src: URL.createObjectURL(file),
        name: file.name,
      }));
    });

    //アンマウント時のクリーンアップ（なくてもいい）
    return () => {};
  }, [files]);
  return previews;
};
