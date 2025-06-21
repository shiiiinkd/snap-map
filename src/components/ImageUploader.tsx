import React, { useEffect, useState } from "react";
import { ImageUploaderStyles as s } from "../styles/ImageUploaderStyles";

//propsの型をinterfaceで定義
interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFilesChange }) => {
  const [fileNames, setFileNames] = useState<string[]>([]); //選択したファイルの名前を管理するState
  const [files, setFiles] = useState<File[]>([]); //選択されたファイルを配列管理するState
  const [previews, setPreviews] = useState<string[]>([]); //プレビュー用URLを管理するState

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;

    //ファイルが未選択または0件ならreturnで閉じる
    if (!fileList || fileList.length === 0) {
      setFileNames([]);
      setFiles([]);
      onFilesChange([]); //returnのonChangeのときに同時に渡そうとしていたが悪手。handleFileChageに入れて一度に渡してしまう。
      return;
    }

    const selectedFiles = Array.from(fileList);
    setFiles(selectedFiles);
    onFilesChange(selectedFiles); //returnのonChangeのときに同時に渡そうとしていたが悪手。handleFileChageに入れて一度に渡してしまう。

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
      <div style={s.container}>
        <label htmlFor="fileInput" style={s.label}>
          ファイルを選択:
        </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*" //画像のみ選択可
          multiple //複数選択可
          onChange={handleFileChange} //一つのハンドラだけ渡す
          style={s.input}
        />
        <div style={s.previewContainer}>
          {previews.map((src, idx) => (
            <div key={idx} style={s.previewItem}>
              <p style={s.fileName}>選択中のファイル名：{fileNames[idx]}</p>
              <img src={src} alt={`preview-${idx}`} style={s.previewImage} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
