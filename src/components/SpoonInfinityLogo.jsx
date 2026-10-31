import React from 'react';

export function SpoonInfinityLogo({ 
  size = 'md', 
  showTagline = true, 
  variant = 'electric-plum',
  taglineText = "There's More to Cook Than You Think"
}) {
  // Dimensions based on size
  const iconSizes = {
    sm: { width: 44, height: 26 },
    md: { width: 62, height: 36 },
    lg: { width: 96, height: 56 },
    hero: { width: 140, height: 80 }
  };

  const dim = iconSizes[size] || iconSizes.md;

  return (
    <div className={`spoon-logo-container spoon-logo-${size} spoon-logo-${variant}`}>
      <div className="spoon-logo-mark">
        <svg
          width={dim.width}
          height={dim.height}
          viewBox="0 0 160 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="infinity-svg"
        >
          <defs>
            <linearGradient id="spoonPlumGradient" x1="10" y1="20" x2="80" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            <linearGradient id="dataGreenGradient" x1="80" y1="20" x2="150" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="60%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>

            <filter id="neonPlumGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left Loop: Spoon Bowl and Handle */}
          <g className="spoon-graphic" filter="url(#neonPlumGlow)">
            {/* Spoon Handle sweeping around bottom-left into center */}
            <path
              d="M 80 45 C 65 65, 45 78, 28 68 C 12 58, 12 36, 26 24 C 36 15, 52 14, 66 22 L 76 30 C 85 38, 70 54, 80 45 Z"
              fill="url(#spoonPlumGradient)"
              opacity="0.95"
            />
            {/* Spoon Head Bowl Contour */}
            <path
              d="M 38 18 C 50 16, 64 22, 60 36 C 56 46, 42 45, 36 38 C 30 32, 28 22, 38 18 Z"
              fill="#180929"
              stroke="url(#spoonPlumGradient)"
              strokeWidth="2.5"
            />
            {/* Spoon Inner Light Reflection */}
            <path
              d="M 40 23 C 48 22, 54 26, 52 32 C 50 36, 44 35, 40 32 C 37 30, 36 24, 40 23 Z"
              fill="rgba(255, 255, 255, 0.4)"
            />
          </g>

          {/* Center Crossing Particles */}
          <g className="infinity-particles">
            <circle cx="78" cy="42" r="1.8" fill="#e879f9" className="pulse-dot" />
            <circle cx="83" cy="46" r="2.2" fill="#34d399" className="pulse-dot-delayed" />
            <circle cx="75" cy="49" r="1.4" fill="#f43f5e" />
            <circle cx="85" cy="40" r="1.2" fill="#a855f7" />
            <circle cx="81" cy="51" r="1.6" fill="#10b981" />
            <circle cx="88" cy="48" r="1.5" fill="#38bdf8" />
          </g>

          {/* Right Loop: Digital Constellation / Network Data Nodes */}
          <g className="data-network">
            {/* Network Edges */}
            <path
              d="M 80 45 L 98 28 L 120 22 L 140 32 L 148 48 L 138 65 L 118 72 L 98 62 L 80 45"
              stroke="url(#dataGreenGradient)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.85"
            />
            {/* Interior Cross Mesh Edges */}
            <path
              d="M 98 28 L 118 42 L 138 65"
              stroke="#10b981"
              strokeWidth="1.2"
              strokeDasharray="2,2"
              opacity="0.6"
            />
            <path
              d="M 120 22 L 118 42 L 98 62"
              stroke="#a855f7"
              strokeWidth="1.2"
              strokeDasharray="2,2"
              opacity="0.6"
            />
            <path
              d="M 118 42 L 148 48"
              stroke="#34d399"
              strokeWidth="1.2"
              opacity="0.6"
            />

            {/* Network Nodes (Vertices) */}
            <circle cx="98" cy="28" r="4" fill="#0d1f18" stroke="#34d399" strokeWidth="2" />
            <circle cx="98" cy="28" r="1.8" fill="#34d399" />

            <circle cx="120" cy="22" r="4.5" fill="#0d1f18" stroke="#10b981" strokeWidth="2" />
            <circle cx="120" cy="22" r="2.2" fill="#ffffff" />

            <circle cx="140" cy="32" r="5" fill="#0d1f18" stroke="#34d399" strokeWidth="2.2" />
            <circle cx="140" cy="32" r="2" fill="#10b981" />

            <circle cx="148" cy="48" r="4" fill="#0d1f18" stroke="#34d399" strokeWidth="2" />
            <circle cx="148" cy="48" r="1.8" fill="#ffffff" />

            <circle cx="138" cy="65" r="4.5" fill="#0d1f18" stroke="#10b981" strokeWidth="2" />
            <circle cx="138" cy="65" r="2.2" fill="#10b981" />

            <circle cx="118" cy="72" r="4" fill="#0d1f18" stroke="#34d399" strokeWidth="2" />
            <circle cx="118" cy="72" r="1.8" fill="#34d399" />

            <circle cx="98" cy="62" r="3.5" fill="#0d1f18" stroke="#a855f7" strokeWidth="1.8" />
            <circle cx="98" cy="62" r="1.6" fill="#a855f7" />

            {/* Central Node */}
            <circle cx="118" cy="42" r="5" fill="#0d1f18" stroke="#e879f9" strokeWidth="2" />
            <circle cx="118" cy="42" r="2.2" fill="#f43f5e" />
          </g>
        </svg>
      </div>

      <div className="spoon-logo-text">
        <div className="spoon-logo-title">
          <span>Spoon</span> <span className="ampersand">&amp;</span> <span>Beyond</span>
        </div>
        {showTagline && (
          <div className="spoon-logo-tagline">
            {taglineText}
          </div>
        )}
      </div>
    </div>
  );
}

export default SpoonInfinityLogo;
