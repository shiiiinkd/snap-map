//src/components/ImageUploader.tsx
import React, { useState } from "react";
import { ImageUploaderStyles as s } from "../styles/ImageUploaderStyles";
import { useFilePreviews } from "../hooks/useFilePreviews";
import type { PreviewItem } from "../hooks/useFilePreviews";
import {
  Box,
  Input,
  SimpleGrid,
  Text,
  Image as ChakraImage,
} from "@chakra-ui/react";
//propsの型をinterfaceで定義
interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFilesChange }) => {
  const [files, setFiles] = useState<File[]>([]); //選択されたファイルを配列管理するState
  const previews: PreviewItem[] = useFilePreviews(files); //プレビュー用URLを管理するState

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;

    //ファイルが未選択または0件ならreturnで閉じる
    if (!fileList || fileList.length === 0) {
      setFiles([]);
      onFilesChange([]);
      return;
    }

    const selectedFiles = Array.from(fileList);
    setFiles(selectedFiles);
    onFilesChange(selectedFiles);

    //ファイル名だけの配列namesを作成し、stateにセット
    const names = selectedFiles.map((file) => file.name);

    if (names.length > 0) {
      console.log("選択されたファイル:", names);
    } else {
      console.log("ファイルが選択されていません");
    }
  };

  return (
    <>
      <Box p={4} borderWidth="1px" borderRadius="md" style={s.container}>
        <label htmlFor="fileInput" style={s.label}>
          ファイルを選択:
        </label>
        <Input
          type="file"
          id="fileInput"
          accept="image/*" //画像のみ選択可
          multiple //複数選択可
          onChange={handleFileChange} //ハンドラ
          mb={4}
          style={s.input}
        />
        <SimpleGrid columns={[2, 3]} spacing={4} style={s.previewContainer}>
          {previews.map(({ src, name }, idx) => (
            <Box key={idx} textAlign="center" style={s.previewItem}>
              <Text fontSize="sm" mb={2} isTruncated style={s.fileName}>
                選択中のファイル名：{name}
              </Text>
              <ChakraImage
                src={src}
                alt={`preview-${idx}`}
                boxSize="80px"
                objectFit="cover"
                borderRadius="md"
                style={s.previewImage}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ImageUploader;
