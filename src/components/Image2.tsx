import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

const Images2: React.FC = () => {
  // 選択したファイル名の配列を管理
  const [fileNames, setFileNames] = useState<string[]>([]);
  // 選択された File オブジェクトの配列を管理
  const [files, setFiles] = useState<File[]>([]);
  // プレビュー用 URL の配列を管理
  const [previews, setPreviews] = useState<string[]>([]);

  // ファイル選択時に呼ばれるハンドラ
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (!fileList || fileList.length === 0) {
      setFileNames([]);
      setFiles([]);
      return;
    }

    const selectedFiles = Array.from(fileList);
    setFiles(selectedFiles);

    // ファイル名だけ抽出して状態にセット
    const names = selectedFiles.map((file) => file.name);
    setFileNames(names);
  };

  // files が変化したらプレビュー URL を更新（古い URL は都度解放）
  useEffect(() => {
    // 0件ならプレビューをリセット
    if (files.length === 0) {
      setPreviews((prev) => {
        prev.forEach(URL.revokeObjectURL);
        return [];
      });
      return;
    }

    // 最新のプレビュー URL を生成
    setPreviews((prev) => {
      // 古い URL の解放
      prev.forEach(URL.revokeObjectURL);
      // 新しい URL の配列を返す
      return files.map((file) => URL.createObjectURL(file));
    });
  }, [files]);

  return (
    <div>
      <label htmlFor="fileInput">ファイルを選択:</label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
        {previews.map((src, idx) => (
          <div key={fileNames[idx] || idx} style={{ marginRight: 10 }}>
            <p>選択中のファイル名：{fileNames[idx]}</p>
            <img
              src={src}
              alt={`preview-${idx}`}
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images2;
