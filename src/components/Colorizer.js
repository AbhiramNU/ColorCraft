import React, { useState } from 'react';
import axios from 'axios';

function Colorizer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [colorizedImage, setColorizedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = e => {
    setSelectedFile(e.target.files[0]);
    setColorizedImage(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/api/colorize', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageBlob = response.data;
      const imageUrl = URL.createObjectURL(imageBlob);
      setColorizedImage(imageUrl);
    } catch (err) {
      setError('Failed to colorize image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Black & White Image Colorizer</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Colorizing...' : 'Colorize'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {colorizedImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>Colorized Image:</h3>
          <img src={colorizedImage} alt="Colorized result" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default Colorizer;
