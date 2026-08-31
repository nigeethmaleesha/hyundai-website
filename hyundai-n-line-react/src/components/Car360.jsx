import { useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '../icons.jsx'

const COLOR_OPTIONS = [
  { id: 'abyss-black', label: 'Abyss Black', swatch: '#0a0a0a' },
  { id: 'hazel-blue', label: 'Hazel Blue', swatch: '#607a82' },
  { id: 'dragon-red', label: 'Dragon Red', swatch: '#b5242b' },
  { id: 'atlas-white', label: 'Atlas White', swatch: '#f0f0ed' },
  { id: 'titan-grey', label: 'Titan Grey', swatch: '#85888b' },
  { id: 'atlas-white-dual-tone', label: 'Atlas White Dual Tone', swatch: 'linear-gradient(90deg,#efefec 0 50%,#151515 50%)' },
  { id: 'dragon-red-dual-tone', label: 'Dragon Red Dual Tone', swatch: 'linear-gradient(90deg,#bd2530 0 50%,#151515 50%)' },
  { id: 'hazel-blue-dual-tone', label: 'Hazel Blue Dual Tone', swatch: 'linear-gradient(90deg,#607a82 0 50%,#151515 50%)' },
]

const framePath = (color, frame) => `/360/${color}/${String(frame).padStart(2, '0')}.png`

export default function Car360() {
  const [color, setColor] = useState('abyss-black')
  const [frame, setFrame] = useState(0)
  const [dragging, setDragging] = useState(false)
  const drag = useRef({ x: 0, frame: 0 })
  const active = useMemo(() => COLOR_OPTIONS.find((c) => c.id === color), [color])

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(() => {
      if (cancelled) return
      for (let i = 0; i < 36; i += 1) {
        const img = new Image()
        img.src = framePath(color, i)
      }
    }, 120)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [color])

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    drag.current = { x: e.clientX, frame }
    setDragging(true)
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    const delta = e.clientX - drag.current.x
    const step = Math.round(delta / 11)
    const next = ((drag.current.frame - step) % 36 + 36) % 36
    setFrame(next)
  }

  const stopDrag = () => setDragging(false)

  return (
    <div className="car360-shell">
      <div className="swatches" aria-label="Vehicle colours">
        {COLOR_OPTIONS.map((item) => (
          <button
            key={item.id}
            className={`swatch ${color === item.id ? 'active' : ''}`}
            style={{ background: item.swatch }}
            title={item.label}
            aria-label={item.label}
            aria-pressed={color === item.id}
            onClick={() => { setColor(item.id); setFrame(0) }}
          />
        ))}
      </div>

      <div
        className={`viewer360 ${dragging ? 'dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={stopDrag}
      >
        <img src={framePath(color, frame)} alt={`${active?.label ?? ''} Creta N Line 360 degree view`} draggable="false" />
        <div className="drag-hint"><Icon name="rotate" size={15}/> Drag to rotate</div>
      </div>
      <div className="selected-colour">{active?.label}</div>
    </div>
  )
}
