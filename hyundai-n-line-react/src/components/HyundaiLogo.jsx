export default function HyundaiLogo({ light = false }) {
  return (
    <div className={`hyundai-logo ${light ? 'is-light' : ''}`} aria-label="Hyundai">
      <img src="/images/hyundai-wordmark-exact.png" alt="Hyundai" />
    </div>
  )
}
