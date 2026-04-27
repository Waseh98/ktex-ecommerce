import React from "react";

const Logo = ({ className = "h-8", invert = false }) => {
  const primaryColor = invert ? "#FDFCF8" : "#1a1a1a";
  const accentColor = "#c9a84c";

  return (
    <svg 
      viewBox="0 0 300 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stylized K Lines */}
      <g>
        <path d="M10 70C10 70 15 45 45 15" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />
        <path d="M18 70C18 70 23 50 53 20" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />
        <path d="M26 70C26 70 31 55 61 25" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />
        
        <path d="M10 70C10 70 25 70 55 55" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
        <path d="M10 62C10 62 30 62 60 47" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* K-TEX Text */}
      <text 
        x="85" 
        y="55" 
        fill={primaryColor} 
        style={{ font: 'bold 48px Inter, sans-serif', letterSpacing: '-1px' }}
      >
        K-TE
      </text>
      
      {/* Stylized X */}
      <g transform="translate(225, 18)">
        <path d="M5 5L35 35M35 5L5 35" stroke={primaryColor} strokeWidth="12" strokeLinecap="square" />
        <path d="M20 20L35 5M20 20L35 35" stroke={accentColor} strokeWidth="12" strokeLinecap="square" />
      </g>
    </svg>
  );
};

export default Logo;
