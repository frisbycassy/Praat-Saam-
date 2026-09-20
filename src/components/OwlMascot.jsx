// An original owl mascot (not traced from any reference image) in the
// site's purple/orange/tan brand palette - big glasses, friendly eyes.
// Used on the Welcome/Login/Signup screens and anywhere a bit of
// personality helps.
function OwlMascot({ size = 140 }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="Uil-maskot (Owl mascot)"
    >
      {/* wings */}
      <circle cx="52" cy="122" r="56" fill="var(--color-brand-orange)" />
      <circle cx="148" cy="122" r="56" fill="var(--color-brand-orange)" />

      {/* ear tufts */}
      <path d="M62 38 C50 18 62 4 78 10 C72 22 68 32 74 46 Z" fill="var(--color-brand-tan)" />
      <path d="M138 38 C150 18 138 4 122 10 C128 22 132 32 126 46 Z" fill="var(--color-brand-tan)" />

      {/* face */}
      <circle cx="100" cy="96" r="66" fill="var(--color-brand-tan)" />

      {/* belly */}
      <circle cx="100" cy="146" r="56" fill="#f5f3ff" />

      {/* beak */}
      <path d="M100 110 L110 126 L100 138 L90 126 Z" fill="var(--color-brand-purple)" />

      {/* glasses */}
      <circle cx="64" cy="94" r="36" fill="#f5f3ff" stroke="#23303a" strokeWidth="7" />
      <circle cx="136" cy="94" r="36" fill="#f5f3ff" stroke="#23303a" strokeWidth="7" />
      <line x1="100" y1="94" x2="100" y2="94" stroke="#23303a" strokeWidth="7" />
      <path d="M97 90 Q100 84 103 90" fill="none" stroke="#23303a" strokeWidth="7" strokeLinecap="round" />

      {/* eyes */}
      <circle cx="64" cy="94" r="19" fill="var(--color-brand-purple)" />
      <circle cx="64" cy="94" r="11" fill="#1a1720" />
      <circle cx="59" cy="89" r="4" fill="#ffffff" />

      <circle cx="136" cy="94" r="19" fill="var(--color-brand-purple)" />
      <circle cx="136" cy="94" r="11" fill="#1a1720" />
      <circle cx="131" cy="89" r="4" fill="#ffffff" />

      {/* feet */}
      <g fill="var(--color-brand-purple)">
        <ellipse cx="72" cy="196" rx="8" ry="13" />
        <ellipse cx="86" cy="199" rx="8" ry="14" />
        <ellipse cx="114" cy="199" rx="8" ry="14" />
        <ellipse cx="128" cy="196" rx="8" ry="13" />
      </g>
    </svg>
  );
}

export default OwlMascot;
