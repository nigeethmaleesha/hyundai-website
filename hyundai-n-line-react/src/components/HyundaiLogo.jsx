export default function HyundaiLogo({ light = false }) {
  const color = light ? '#ffffff' : '#002c5f'
  return (
    <div className="hyundai-logo" style={{ color }} aria-label="Hyundai">
      <svg viewBox="0 0 58 30" aria-hidden="true">
        <ellipse cx="29" cy="15" rx="25" ry="11.5" fill="none" stroke="currentColor" strokeWidth="2.4" transform="rotate(-10 29 15)"/>
        <path d="M18 22 24 8m10 14 6-14M23 15c4-3 8-3 12-1" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      </svg>
      <span>HYUNDAI</span>
    </div>
  )
}
