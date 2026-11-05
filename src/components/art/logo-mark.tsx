export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        className="logo-burst"
        d="M32 1 37 13 50 6 45 19 62 22 48 30 62 40 45 43 51 58 37 50 32 63 27 50 13 58 19 43 2 40 16 30 2 22 19 19 14 6 27 13Z"
        fill="#7A071B"
      />
      <path
        d="M32 12c9.5 0 17 7.2 18 16.5 1 11-3.6 20-9.2 23.8-5.4 3.6-12.2 3.6-17.6 0C17.6 48.5 13 39.5 14 28.5 15 19.2 22.5 12 32 12z"
        fill="#C8102E"
      />
      <path d="M18 29c1.2-6.4 26.6-6.4 28 0 1 5.2-.6 10.4-4.8 13.2H22.8C18.6 39.4 17 34.2 18 29z" fill="#090909" />
      <g className="logo-eyes">
        <ellipse cx="26.2" cy="33.2" rx="5.1" ry="3.3" fill="#F2F2F2" />
        <ellipse cx="37.8" cy="33.2" rx="5.1" ry="3.3" fill="#F2F2F2" />
      </g>
    </svg>
  );
}
