/**
 * Vector kit render (SITE_BLUEPRINT §4.1a). Colours come from content/kits.ts
 * (PRD-signed brand values); shading is drawn inside the shirt shape so it
 * reads as fabric rather than a flat icon.
 */
const SHIRT = "M140 24 C165 60 235 60 260 24 L330 50 L394 132 L342 176 L318 152 L318 412 Q200 432 82 412 L82 152 L58 176 L6 132 L70 50 Z";

export function KitRender({ id, body, trim, label }: { id: string; body: string; trim: string; label: string }) {
  const g = (name: string) => `${id}-${name}`;
  return (
    <svg viewBox="0 0 400 440" role="img" aria-label={label} style={{ width: "100%", height: "auto" }}>
      <defs>
        <clipPath id={g("clip")}>
          <path d={SHIRT} />
        </clipPath>
        <linearGradient id={g("light")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity=".28" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".10" />
          <stop offset=".55" stopColor="#fff" stopOpacity=".04" />
          <stop offset="1" stopColor="#000" stopOpacity=".32" />
        </linearGradient>
        <linearGradient id={g("drop")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".08" />
          <stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${g("clip")})`}>
        <path d={SHIRT} fill={body} />
        {/* Shoulder trim stripes */}
        <path d="M70 50 L140 24 L146 32 L78 58 Z" fill={trim} />
        <path d="M330 50 L260 24 L254 32 L322 58 Z" fill={trim} />
        {/* Side panels */}
        <rect x="82" y="152" width="10" height="270" fill={trim} opacity=".9" />
        <rect x="308" y="152" width="10" height="270" fill={trim} opacity=".9" />
        {/* Sleeve cuffs */}
        <path d="M394 132 L342 176 L330 162 L382 118 Z" fill={trim} />
        <path d="M6 132 L58 176 L70 162 L18 118 Z" fill={trim} />
        {/* Fabric shading + subtle folds */}
        <rect width="400" height="440" fill={`url(#${g("light")})`} />
        <rect width="400" height="440" fill={`url(#${g("drop")})`} />
        <path d="M150 140 C160 240 150 330 140 410" stroke="#000" strokeOpacity=".08" strokeWidth="10" fill="none" />
        <path d="M262 160 C252 250 262 340 272 410" stroke="#fff" strokeOpacity=".05" strokeWidth="8" fill="none" />
      </g>

      {/* Collar */}
      <path d="M140 24 C165 60 235 60 260 24 L250 19 C228 48 172 48 150 19 Z" fill={trim} />
      <path d="M150 19 C172 48 228 48 250 19" fill="none" stroke="#000" strokeOpacity=".25" strokeWidth="1.5" />

      {/* Crest on the left chest (viewer's right) */}
      <image href="/brand/crest.png" x="232" y="92" width="46" height="58" preserveAspectRatio="xMidYMid meet" />

      <path d={SHIRT} fill="none" stroke="#000" strokeOpacity=".35" strokeWidth="2" />
    </svg>
  );
}
