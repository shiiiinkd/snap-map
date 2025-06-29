//src/components/PhotoGallery.tsx
import { Box, Flex } from "@chakra-ui/react";
import type React from "react";

//propsの型をinterfaceで定義
interface PhotoGalleryProps {
  photos: File[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  return (
    <>
      {/* 選択地の写真ギャラリー */}
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
    </>
  );
};
export default PhotoGallery;
