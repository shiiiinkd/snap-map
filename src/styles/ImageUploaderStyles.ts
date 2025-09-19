// src/styles/ImageUploaderStyles.ts
export const ImageUploaderStyles = {
  container: {
    padding: "1rem",
    border: "2px dashed #ccc",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    backgroundColor: "#fafafa",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    marginBottom: "1rem",
  },
  previewContainer: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap" as const,
    justifyContent: "center" as const,
  },
  previewItem: {
    width: "90%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    background: "#fff",
    padding: "0.5rem",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  previewImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover" as const,
    borderRadius: "4px",
  },
  fileName: {
    marginTop: "0.25rem",
    fontSize: "0.875rem",
    color: "#555",
    wordBreak: "break-all" as const,
  },
};
