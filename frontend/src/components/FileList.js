import React, { useState, useEffect } from "react";
import { fetchFiles, downloadFile } from "../API";

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const response = await fetchFiles();
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  return (
    <div>
      <h2>Available Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file}>
            {file}{" "}
            <button onClick={() => downloadFile(file)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
