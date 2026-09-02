import { useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '../icons.jsx'

const DEFAULT_FRAME = 5 // PDF reference: front-left three-quarter view

const COLOR_OPTIONS = [
  { id: 'abyss-black', label: 'Abyss Black', swatch: '#0a0a0a' },
  { id: 'hazel-blue', label: 'Hazel Blue', swatch: '#607a82' },
  { id: 'dragon-red', label: 'Dragon Red', swatch: '#c92a31' },
  { id: 'titan-grey', label: 'Titan Grey', swatch: '#9a9c9e' },
  { id: 'atlas-white', label: 'Atlas White', swatch: '#e9e9e6' },
  { id: 'hazel-blue-dual-tone', label: 'Hazel Blue Dual Tone', swatch: 'linear-gradient(180deg,#202426 0 50%,#607a82 50%)' },
  { id: 'dragon-red-dual-tone', label: 'Dragon Red Dual Tone', swatch: 'linear-gradient(180deg,#202426 0 50%,#c92a31 50%)' },
  { id: 'atlas-white-dual-tone', label: 'Atlas White Dual Tone', swatch: 'linear-gradient(180deg,#202426 0 50%,#e9e9e6 50%)' },
]

const framePath = (color, frame) => `/360/${color}/${String(frame).padStart(2, '0')}.png`

export default function Car360({ compact = false, showSwatches = true, initialColor = 'abyss-black', className = '' }) {
  const [color, setColor] = useState(initialColor)
  const [frame, setFrame] = useState(DEFAULT_FRAME)
  const [dragging, setDragging] = useState(false)
  const drag = useRef({ x: 0, frame: DEFAULT_FRAME })
  const active = useMemo(() => COLOR_OPTIONS.find((item) => item.id === color), [color])

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(() => {
      if (cancelled) return
      for (let i = 0; i < 36; i += 1) {
        const image = new Image()
        image.src = framePath(color, i)
      }
    }, 120)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [color])

  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId)
    drag.current = { x: event.clientX, frame }
    setDragging(true)
  }

  const onPointerMove = (event) => {
    if (!dragging) return
    const delta = event.clientX - drag.current.x
    const step = Math.round(delta / 11)
    const next = ((drag.current.frame - step) % 36 + 36) % 36
    setFrame(next)
  }

  const stopDrag = () => setDragging(false)

  const onKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const direction = event.key === 'ArrowLeft' ? -1 : 1
    setFrame((current) => ((current + direction) % 36 + 36) % 36)
  }

  const changeColor = (nextColor) => {
    setColor(nextColor)
    setFrame(DEFAULT_FRAME)
  }

  return (
    <div className={`car360-shell ${compact ? 'car360-compact' : ''} ${className}`.trim()}>
      {showSwatches && (
        <div className="swatches" aria-label="Vehicle colours">
          {COLOR_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`swatch ${color === item.id ? 'active' : ''}`}
              style={{ background: item.swatch }}
              title={item.label}
              aria-label={item.label}
              aria-pressed={color === item.id}
              onClick={() => changeColor(item.id)}
            />
          ))}
        </div>
      )}

      <div
        className={`viewer360 ${dragging ? 'dragging' : ''}`}
        role="application"
        tabIndex="0"
        aria-label="Interactive 360 degree vehicle view. Drag horizontally or use the left and right arrow keys to rotate."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={stopDrag}
        onKeyDown={onKeyDown}
      >
        <img
          src={framePath(color, frame)}
          alt={`${active?.label ?? ''} VENUE N Line 360 degree view`}
          draggable="false"
        />
        <div className="drag-hint"><Icon name="rotate" size={15} /> Drag to rotate</div>
      </div>
    </div>
  )
}
