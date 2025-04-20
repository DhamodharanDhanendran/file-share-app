import React from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

function App() {
  return (
    <div>
      <h1>Wi-Fi File Share</h1>
      <FileUpload />
      <FileList />
    </div>
  );
}

export default App;
