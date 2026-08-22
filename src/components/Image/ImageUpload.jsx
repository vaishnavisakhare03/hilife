import { useState, useEffect } from "react";
import "./ImageUpload.css";

function ImageUpload({ onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    setFileName(file.name);

    onFileSelect(file);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="image-upload">
      <label className="upload-box">
        <input hidden type="file" accept="image/*" onChange={handleChange} />

        {preview ? (
          <>
            <img src={preview} alt="Preview" className="preview-image" />

            <span className="change-photo">Change Image</span>
          </>
        ) : (
          <>
            <div className="camera-icon">📷</div>

            <p>Select Image</p>
          </>
        )}
      </label>

      {fileName && <div className="selected-file">{fileName}</div>}
    </div>
  );
}

export default ImageUpload;
