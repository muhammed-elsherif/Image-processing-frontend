import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Upload.module.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !width || !height) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("width", width);
    formData.append("height", height);

    try {
      const response = await axios.post(
        "https://image-processing-l54l.onrender.com/api/processUpload",
        formData,
        {
          responseType: "blob",
        }
      );

      setPreview(URL.createObjectURL(response.data));
      alert("Image resized successfully!");
    } catch (error) {
      console.error("Error processing the image", error);
      alert("Error processing the image");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Resize Image from URL</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Choose file:
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Width:
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Height:
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.button}>
            Resize
          </button>
        </form>
      </div>
      <div>
        {preview && (
          <img src={preview} alt="Preview" className={styles.preview} />
        )}
      </div>
    </>
  );
};

export default Upload;
