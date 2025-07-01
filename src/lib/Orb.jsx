
import React, { useEffect } from 'react';

const Orb = ({ top = '30%', left = '30%', size = 80, color = 'rgba(255,255,255,0.2)', delay = '0s' }) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes orbFloat {
        0% { transform: translateY(0) scale(1); opacity: 0.7; }
        50% { transform: translateY(-60vh) scale(1.5); opacity: 0.3; }
        100% { transform: translateY(0) scale(1); opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: 'blur(20px)',
        animation: `orbFloat 20s ease-in-out infinite`,
        animationDelay: delay,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Orb;
