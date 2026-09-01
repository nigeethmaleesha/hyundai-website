export default function HyundaiLogo({ light = false }) {
  return (
    <div className={`hyundai-logo ${light ? 'is-light' : ''}`} aria-label="Hyundai">
      <img
        src={light ? '/images/hyundai-wordmark-white.png' : '/images/hyundai-wordmark-exact.png'}
        alt="Hyundai"
      />
    </div>
  )
}
