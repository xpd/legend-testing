export function BgGrid() {
  return (
    <svg width="100%" height="100%">
      <defs>
        <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" strokeWidth="0.5" className="stroke-sage-3" />
        </pattern>
        <pattern id="largeGrid" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="100" height="50" fill="url(#smallGrid)" />
          <path d="M 50 0 L 0 0 0 50" fill="none" strokeWidth="1" className="stroke-sage-3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#largeGrid)" />
    </svg>
  );
}
