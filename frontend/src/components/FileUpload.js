import React, { useState } from "react";
import { uploadFile } from "../API";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("File type not allowed");
      return;
    }

    try {
      await uploadFile(selectedFile);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
