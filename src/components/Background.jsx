import React, { useEffect } from 'react';
import Orb from '../lib/Orb';


const orbStyles = [
  { top: '10%', left: '10%', size: 80, duration: '22s' },
  { top: '25%', left: '75%', size: 100, duration: '20s' },
  { top: '50%', left: '20%', size: 90, duration: '24s' },
  { top: '40%', left: '50%', size: 110, duration: '26s' },
  { top: '65%', left: '70%', size: 85, duration: '23s' },
  { top: '75%', left: '35%', size: 95, duration: '25s' },
  { top: '85%', left: '15%', size: 80, duration: '21s' },
];

const Background = () => {
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
    <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#0a0a0a] to-[#200052] overflow-hidden">
      {orbStyles.map((orb, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background: 'rgba(255, 255, 255, 0.2)', // a bit bolder
            borderRadius: '50%',
            animation: `orbFloat ${orb.duration} ease-in-out infinite`,
            pointerEvents: 'none',
            transition: 'transform 0.1s ease-out',
            filter: 'blur(12px)',
          }}
        />
      ))}
    </div>
  );
};

export default Background;
