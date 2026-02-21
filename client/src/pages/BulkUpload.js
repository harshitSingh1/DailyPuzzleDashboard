import { useState } from "react";
import API from "../api";

export default function BulkUpload() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    setFiles(fileArray);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    if (!files.length) return alert("Add images first");

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    setLoading(true);

    try {
      await API.post("/puzzles/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("All solutions uploaded 🚀");
      setFiles([]);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <h1>Bulk Upload Solutions</h1>

      <div
  className={`drop-zone ${dragActive ? "active" : ""}`}
  onDragOver={(e) => {
    e.preventDefault();
    setDragActive(true);
  }}
  onDragLeave={() => setDragActive(false)}
  onDrop={handleDrop}
>
  <div className="drop-content">
    <h3>Drag & Drop Puzzle Screenshots</h3>
    <p>or</p>
    <label className="custom-file-upload">
      Browse Files
      <input
        type="file"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        hidden
      />
    </label>
  </div>
</div>

      <div className="preview-grid">
        {files.map((file, index) => (
          <div key={index} className="preview-card">
            <img src={URL.createObjectURL(file)} alt="preview" />
            <p>{file.name}</p>
          </div>
        ))}
      </div>

      <button
        className="submit-btn"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Add All Solutions 🚀"}
      </button>
    </div>
  );
}