import React from 'react';
import { Box } from '@mui/material';

const starKeyframes = `
  @keyframes shootingStarMove {
    0% {
      width: 0;
      opacity: 1;
      filter: drop-shadow(0 0 6px #b49aff);
      transform: translate(0, 0) rotate(-30deg);
    }
    80% {
      width: 160px;
      opacity: 0.8;
      filter: drop-shadow(0 0 15px #b49aff);
      transform: translate(140px, 70px) rotate(-30deg);
    }
    100% {
      width: 0;
      opacity: 0;
      filter: drop-shadow(0 0 0 #b49aff);
      transform: translate(160px, 80px) rotate(-30deg);
    }
  }

  @keyframes starGlowFlicker {
    0%, 100% { filter: brightness(130%); }
    50% { filter: brightness(160%); }
  }
`;

function ShootingStar({ startTop, startLeft, delay, duration }) {
  return (
    <>
      <style>{starKeyframes}</style>
      {/* Tail */}
      <Box
        sx={{
          position: 'absolute',
          top: startTop,
          left: startLeft,
          height: 2,
          background:
            'linear-gradient(90deg, transparent, #b49aff 20%, #b49aff 80%, transparent)',
          borderRadius: '9999px',
          filter: 'blur(2px) drop-shadow(0 0 8px #b49aff)',
          animation: `shootingStarMove ${duration}s cubic-bezier(0.42, 0, 0.58, 1) ${delay}s infinite`,
          transformOrigin: 'left center',
          width: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Star tip */}
      <Box
        sx={{
          position: 'absolute',
          top: startTop,
          left: startLeft,
          width: 8,
          height: 8,
          bgcolor: '#b49aff',
          borderRadius: '50%',
          filter: 'drop-shadow(0 0 12px #b49aff)',
          animation: `shootingStarMove ${duration}s cubic-bezier(0.42, 0, 0.58, 1) ${delay}s infinite, starGlowFlicker 1.5s ease-in-out infinite`,
          pointerEvents: 'none',
          zIndex: 2,
          transformOrigin: 'center',
        }}
      />
    </>
  );
}

export default ShootingStar;
