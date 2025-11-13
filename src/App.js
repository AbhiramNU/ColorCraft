import React, { useState } from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import DropZoneArea from './components/DropZoneArea';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

function App() {
  const [bwImage, setBwImage] = useState(null);
  const [colorizedImage, setColorizedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bwFile, setBwFile] = useState(null);

  const handleFileSelected = (file) => {
    setBwFile(file);
    setBwImage(URL.createObjectURL(file));
    setColorizedImage(null);
  };

  const colorizeImage = async () => {
    if (!bwImage) return;
    setLoading(true);
    try {
      const response = await fetch(bwImage);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('image', blob);

      const res = await fetch('http://localhost:8080/api/colorize', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Colorization failed');
      const colorizedBlob = await res.blob();
      setColorizedImage(URL.createObjectURL(colorizedBlob));
    } catch (err) {
      alert('Colorization failed.');
    }
    setLoading(false);
  };

  const downloadImage = () => {
    if (!colorizedImage) return;
    const link = document.createElement('a');
    link.href = colorizedImage;
    link.download = 'colorized_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #121212 0%, #1d1d1d 100%)',
        color: '#ccc',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          py: 2,
          borderBottom: '1px solid #2f2f2f',
          backgroundColor: '#181818',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <img src="/ICON.png" alt="ColorCraft Logo" style={{ height: 34, filter: 'drop-shadow(0 0 3px #7d5fff)' }} />
          <Typography variant="h4" sx={{ color: '#ffffff ', fontWeight: 700 }}>
            ColorCraft
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 10 }}>
          <Button color="inherit" sx={{ fontWeight: 600, fontSize: 16, textTransform: 'none' }}>
            Project
          </Button>
          <Button color="inherit" sx={{ fontWeight: 600, fontSize: 16, textTransform: 'none' }}>
            About
          </Button>
          <Button color="inherit" sx={{ fontWeight: 600, fontSize: 16, textTransform: 'none' }}>
            Contact
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{ flexGrow: 1, mt: 10, mb: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Title & Description */}
        <Typography variant="h2" mb={2} textAlign="center" sx={{ color: '#b19aff', fontWeight: 700, textShadow: '0 0 8px #7d5fff' }}>
          Restore Colors, Reignite Memories
        </Typography>
        <Typography variant="subtitle1" mb={6} textAlign="center" sx={{ color: '#aaa', maxWidth: 600 }}>
          Instantly bring your old black and white photos to life with AI-powered realistic colorization.
        </Typography>

        {/* Dropzone */}
        <Paper sx={{ p: 5, width: '100%', backgroundColor: '#222', borderRadius: 3, mb: 5, boxShadow: '0 0 15px rgba(125, 93, 255, 0.6)' }}>
          <DropZoneArea onFileSelected={handleFileSelected} />
          {bwFile && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
              Selected File: {bwFile.name} - {(bwFile.size / 1024).toFixed(2)} KB
            </Typography>
          )}
        </Paper>

        {/* Colorize Button */}
        <Button
          variant="contained"
          color="primary"
          disabled={!bwImage || loading}
          onClick={colorizeImage}
          sx={{
            width: '100%',
            maxWidth: 400,
            py: 1.5,
            fontSize: 18,
            fontWeight: 600,
            boxShadow: '0 6px 15px #7d5fff88',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#6a47f1',
              boxShadow: '0 6px 20px #7d5fffbb',
            },
            mb: 6,
          }}
        >
          {loading ? 'Colorizing...' : 'Colorize'}
        </Button>

        {/* Result Slider with Download */}
        {bwImage && colorizedImage && (
          <Box sx={{ width: '100%', maxWidth: 650, mb: 6 }}>
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={bwImage} alt="Black & White input" />}
              itemTwo={<ReactCompareSliderImage src={colorizedImage} alt="Colorized output" />}
              style={{ width: '100%', height: 400, borderRadius: 6, overflow: 'hidden' }}
            />
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button variant="outlined" color="primary" onClick={downloadImage} sx={{ fontWeight: 600 }}>
                Download Colorized Image
              </Button>
            </Box>
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          backgroundColor: '#181818',
          color: '#888',
          borderTop: '1px solid #2f2f2f',
          fontSize: 14,
        }}
      >
        &copy; {new Date().getFullYear()} ColorCraft — All rights reserved.
      </Box>
    </Box>
  );
}

export default App;
