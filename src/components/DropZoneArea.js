import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@mui/material';

function DropZoneArea({ onFileSelected }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => onFileSelected(acceptedFiles[0]),
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #7d5fff',
        borderRadius: 2,
        background: isDragActive ? '#222233' : 'transparent',
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Drag & drop a black & white image here, or click to browse
      </Typography>
      <Button variant="contained" color="primary">
        Browse
      </Button>
    </Box>
  );
}

export default DropZoneArea;
