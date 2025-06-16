import React, { useEffect, useState } from "react";

const Images: React.FC = () => {
  const [fileNames, setFileNames] = useState<string[]>([]); //選択したファイルの名前を管理するState
  const [files, setFiles] = useState<File[]>([]); //選択されたファイルを配列管理するState
  const [previews, setPreviews] = useState<string[]>([]); //プレビュー用URLを管理するState

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;

    //ファイルが未選択または0件ならreturnで閉じる
    if (!fileList || fileList.length === 0) {
      setFileNames([]);
      setFiles([]);
      return;
    }

    const selectedFiles = Array.from(fileList);
    setFiles(selectedFiles);

    //ファイル名だけの配列namesを作成し、stateにセット
    const names = selectedFiles.map((file) => file.name);
    setFileNames(names);

    if (names.length > 0) {
      setFileNames(names);
      console.log("選択されたファイル:", names);
    } else {
      setFileNames([""]);
      console.log("ファイルが選択されていません");
    }
  };

  //filesが変化したらpreviewURLを更新する
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
    <>
      <div>
        <label htmlFor="fileInput">ファイルを選択:</label>
        <input
          type="file"
          id="fileInput"
          accept="image/*" //画像のみ選択可
          multiple //複数選択可
          onChange={handleFileChange}
        />
        <div>
          {previews.map((src, idx) => (
            <div key={idx}>
              <p>選択中のファイル名：{fileNames[idx]}</p>
              <img src={src} alt={`preview-${idx}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Images;
