import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [detections, setDetections] = useState([]);
    const [loading, setLoading] = useState(false);
    const imageRef = useRef(null);

    const handleImageChange = (file) => {
        setImage(file);
        setImageURL(URL.createObjectURL(file));
        setDetections([]); // Clear detections when a new image is uploaded
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) handleImageChange(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file) handleImageChange(file);
    };

    const handleClearImage = () => {
        setImage(null);
        setImageURL(null);
        setDetections([]);
    };

    const handleSubmit = async () => {
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/detect', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setDetections(response.data.detections);
        } catch (error) {
            console.error('Error processing the image:', error);
        }

        setLoading(false);
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>AIMonks Object Detection</h1>
            </header>

            <main className="main-content">
                <div
                    className={`image-container ${!imageURL ? 'placeholder' : ''}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {!imageURL ? (
                        <p className="upload-placeholder">
                            Drag & Drop or Click to Upload Image
                        </p>
                    ) : (
                        <img
                            ref={imageRef}
                            src={imageURL}
                            alt="Uploaded"
                            className="uploaded-image"
                        />
                    )}

                    {imageURL &&
                        detections.map((detection, index) => (
                            <div
                                key={index}
                                className="bounding-box"
                                style={{
                                    left: `${detection.x1}px`,
                                    top: `${detection.y1}px`,
                                    width: `${detection.x2 - detection.x1}px`,
                                    height: `${detection.y2 - detection.y1}px`,
                                }}
                            >
                                <span className="label">
                                    {`${detection.class_name} (${(detection.confidence * 100).toFixed(1)}%)`}
                                </span>
                            </div>
                        ))}
                </div>

                <div className="upload-buttons">
                    {!imageURL && (
                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileInput}
                        />
                    )}
                    {!imageURL && (
                        <label htmlFor="fileInput" className="upload-button">
                            Select Image
                        </label>
                    )}
                    {imageURL && (
                        <button
                            onClick={handleClearImage}
                            className="clear-button"
                        >
                            Clear Image
                        </button>
                    )}
                </div>
            </main>

            {imageURL && (
                <div className="action-buttons">
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !image}
                        className="inference-button"
                    >
                        {loading ? 'Processing...' : 'Detect Objects'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
