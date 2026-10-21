/**
 * @file Gallery.jsx
 * @description React component providing a parallax-style gallery, backend-fetched
 * images, and an upload interface for user-submitted media.
 * Includes parallax headers and dynamic gallery grid rendering.
 * @author Mcgregor
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css'; // Custom CSS since no tailwind support for Parallax

// Parallax header images
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';

function Gallery() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // === Load images from backend ===
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8001/cms-api/v2/images/?fields=*') // ← your backend endpoint (adjust if needed)
      .then((res) => {
        setImages(res.data.items.filter((img) =>
  ["gallery", "allowed"].every(tag => (img.meta.tags || []).includes(tag))) || []);
      })
      .catch((err) => console.error('Failed to fetch images:', err));
  }, []);

  // === Upload to backend ===
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
// test
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('file', file));

      await axios.post('http://127.0.0.1:8001/api/upload-gallery-image/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Re-fetch images after upload
      const refreshed = await axios.get('/api/media/images');
      setImages(refreshed.data.items || []);
    } catch (error) {
      console.error('Image upload failed:', error);
    }

    setUploading(false);
    event.target.value = '';
  };

  return (
    <div className="Gallery">

      {/* PARALLAX HEADER 1 */}
      <div className="parallax-container" style={{ backgroundImage: `url(${image1})` }}>
        <div className="parallax-content">
          <h1 className="parallax-heading text-5xl font-bold text-white text-shadow-lg">
            Gallery
          </h1>
        </div>
      </div>

      {/* PARALLAX 2 */}
      <div className="parallax-container" style={{ backgroundImage: `url(${image2})` }}>
        <div className="parallax-content"></div>
      </div>

      {/* PARALLAX 3 */}
      <div className="parallax-container" style={{ backgroundImage: `url(${image3})` }}>
        <div className="parallax-content"></div>
      </div>

      {/* PARALLAX 4 */}
      <div className="parallax-container" style={{ backgroundImage: `url(${image4})` }}>
        <div className="parallax-content"></div>
      </div>

      {/* ADD IMAGE SECTION */}
      <section className="bg-gray-900 text-white p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Add Your Own Image</h2>
        <p className="mb-3 text-sm text-gray-300">
          Uploaded images are stored on the backend.
        </p>

        <label className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer">
          {uploading ? 'Uploading…' : 'Choose Image(s)'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </section>

      {/* GALLERY GRID */}
      <section className="bg-gray-100 p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Uploaded Images</h2>

        {images.length === 0 ? (
          <p className="text-center text-gray-500">No images found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg bg-white p-4"
              >
                <img
                  src={`http://127.0.0.1:8001${image.meta.download_url}`}
                  alt={`Uploaded ${index}`}
                  className="w-full h-auto rounded-lg transition-all duration-300 transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Gallery;
