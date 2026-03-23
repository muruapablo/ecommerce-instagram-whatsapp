'use client'

import { useState, useRef, useEffect } from 'react'

interface ImageCropModalProps {
  file: File
  onConfirm: (croppedFile: File) => void
  onCancel: () => void
}

type AspectKey = '1:1' | '4:3' | '3:4' | '16:9' | 'libre'

const ASPECT_RATIOS: Record<AspectKey, number | null> = {
  '1:1': 1,
  '4:3': 4 / 3,
  '3:4': 3 / 4,
  '16:9': 16 / 9,
  'libre': null,
}

const FRAME_MAX = 360

// ─── Pure helpers (no closures) ──────────────────────────────────────────────

function getFrameDims(aspect: AspectKey) {
  const r = ASPECT_RATIOS[aspect]
  const fw = r != null ? (r >= 1 ? FRAME_MAX : Math.round(FRAME_MAX * r)) : FRAME_MAX
  const fh = r != null ? (r >= 1 ? Math.round(FRAME_MAX / r) : FRAME_MAX) : FRAME_MAX
  return { fw, fh }
}

function clamp(x: number, y: number, s: number, fw: number, fh: number, nw: number, nh: number) {
  const imgW = nw * s
  const imgH = nh * s
  return {
    x: Math.min(0, Math.max(fw - imgW, x)),
    y: Math.min(0, Math.max(fh - imgH, y)),
  }
}

/** Zoom keeping the frame center fixed on the same image point */
function zoomAtCenter(
  prev: { scale: number; x: number; y: number },
  newS: number,
  fw: number,
  fh: number,
  nw: number,
  nh: number
) {
  // image-space coords that are currently at the frame center
  const imgCX = (fw / 2 - prev.x) / prev.scale
  const imgCY = (fh / 2 - prev.y) / prev.scale
  const nx = fw / 2 - imgCX * newS
  const ny = fh / 2 - imgCY * newS
  return { scale: newS, ...clamp(nx, ny, newS, fw, fh, nw, nh) }
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ImageCropModal({ file, onConfirm, onCancel }: ImageCropModalProps) {
  const [aspect, setAspectState] = useState<AspectKey>('1:1')
  const [imageUrl, setImageUrl] = useState('')
  const [nat, setNat] = useState({ w: 0, h: 0 })
  // Single atomic state: scale + position
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef({ mx: 0, my: 0, vx: 0, vy: 0 })
  const touchRef = useRef({ mx: 0, my: 0, vx: 0, vy: 0, dist: 0, vs: 1 })
  const imgRef = useRef<HTMLImageElement>(null)

  const { fw, fh } = getFrameDims(aspect)
  const minS = nat.w ? Math.max(fw / nat.w, fh / nat.h) : 1

  // Object URL
  useEffect(() => {
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  // Fit image when it loads
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: nw, naturalHeight: nh } = e.currentTarget
    setNat({ w: nw, h: nh })
    const { fw: cfw, fh: cfh } = getFrameDims(aspect)
    const s = Math.max(cfw / nw, cfh / nh)
    const cx = clamp((cfw - nw * s) / 2, (cfh - nh * s) / 2, s, cfw, cfh, nw, nh)
    setView({ scale: s, ...cx })
  }

  // Re-fit when aspect changes
  const setAspect = (key: AspectKey) => {
    setAspectState(key)
    if (!nat.w) return
    const { fw: nfw, fh: nfh } = getFrameDims(key)
    setView((prev) => {
      const newS = Math.max(prev.scale, Math.max(nfw / nat.w, nfh / nat.h))
      return zoomAtCenter(prev, newS, nfw, nfh, nat.w, nat.h)
    })
  }

  // Mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(true)
    dragRef.current = { mx: e.clientX, my: e.clientY, vx: view.x, vy: view.y }
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging) return
      const dx = e.clientX - dragRef.current.mx
      const dy = e.clientY - dragRef.current.my
      setView((prev) => ({
        ...prev,
        ...clamp(dragRef.current.vx + dx, dragRef.current.vy + dy, prev.scale, fw, fh, nat.w, nat.h),
      }))
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, fw, fh, nat])

  // Touch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchRef.current = { mx: e.touches[0].clientX, my: e.touches[0].clientY, vx: view.x, vy: view.y, dist: 0, vs: view.scale }
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      touchRef.current = { ...touchRef.current, dist, vs: view.scale }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - touchRef.current.mx
      const dy = e.touches[0].clientY - touchRef.current.my
      setView((prev) => ({
        ...prev,
        ...clamp(touchRef.current.vx + dx, touchRef.current.vy + dy, prev.scale, fw, fh, nat.w, nat.h),
      }))
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const newS = Math.max(minS, Math.min(4, touchRef.current.vs * (dist / touchRef.current.dist)))
      setView((prev) => zoomAtCenter(prev, newS, fw, fh, nat.w, nat.h))
    }
  }

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setView((prev) => {
      const newS = Math.max(minS, Math.min(4, prev.scale - e.deltaY * 0.001))
      return zoomAtCenter(prev, newS, fw, fh, nat.w, nat.h)
    })
  }

  // Confirm: crop with Canvas
  const handleConfirm = () => {
    if (!imgRef.current || !nat.w) return
    const r = ASPECT_RATIOS[aspect]
    const outW = Math.min(1200, nat.w)
    const outH = r != null ? Math.round(outW / r) : Math.round(outW * (fh / fw))
    const canvas = document.createElement('canvas')
    canvas.width = outW
    canvas.height = outH
    const ctx = canvas.getContext('2d')!
    const srcX = -view.x / view.scale
    const srcY = -view.y / view.scale
    const srcW = fw / view.scale
    const srcH = fh / view.scale
    ctx.drawImage(imgRef.current, srcX, srcY, srcW, srcH, 0, 0, outW, outH)
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const name = file.name.replace(/\.\w+$/, '.jpg')
        onConfirm(new File([blob], name, { type: 'image/jpeg' }))
      },
      'image/jpeg',
      0.92
    )
  }

  const zoomMin = Math.ceil(minS * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-surface dark:bg-primary-container rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-on-surface/10 dark:border-on-primary/10">
          <h2 className="text-lg font-bold text-on-surface dark:text-on-primary">Ajustar imagen</h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-on-surface-variant dark:text-on-primary-fixed-variant hover:text-on-surface dark:hover:text-on-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Aspect ratio tabs */}
        <div className="flex gap-2 px-6 pt-4 flex-wrap">
          {(Object.keys(ASPECT_RATIOS) as AspectKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setAspect(key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                aspect === key
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-surface-container dark:bg-primary text-on-surface-variant dark:text-on-primary-fixed-variant hover:bg-surface-container-high dark:hover:bg-primary-container'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Crop frame */}
        <div className="flex justify-center py-5 px-6">
          <div
            style={{ width: fw, height: fh }}
            className="relative overflow-hidden rounded-xl cursor-grab active:cursor-grabbing bg-gray-900 select-none ring-2 ring-secondary/40"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onWheel={handleWheel}
          >
            {imageUrl && (
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Recorte"
                onLoad={handleImageLoad}
                draggable={false}
                style={{
                  position: 'absolute',
                  width: nat.w * view.scale,
                  height: nat.h * view.scale,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  left: view.x,
                  top: view.y,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            )}
            {/* Rule-of-thirds grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: `${fw / 3}px ${fh / 3}px`,
              }}
            />
          </div>
        </div>

        {/* Zoom slider */}
        <div className="px-6 pb-1">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-on-surface-variant dark:text-on-primary-fixed-variant flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <input
              type="range"
              min={zoomMin}
              max={400}
              step={1}
              value={Math.round(view.scale * 100)}
              onChange={(e) => {
                const newS = Math.max(minS, Number(e.target.value) / 100)
                setView((prev) => zoomAtCenter(prev, newS, fw, fh, nat.w, nat.h))
              }}
              className="w-full accent-secondary"
            />
            <span className="text-xs text-on-surface-variant dark:text-on-primary-fixed-variant w-10 text-right flex-shrink-0">
              {Math.round(view.scale * 100)}%
            </span>
          </div>
        </div>

        {/* Hint */}
        <p className="text-xs text-center text-on-surface-variant dark:text-on-primary-fixed-variant px-6 pb-3 mt-1">
          Arrastrá para reencuadrar · Scroll o pellizca para hacer zoom
        </p>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-on-surface/20 dark:border-on-primary/20 rounded-lg text-on-surface dark:text-on-primary hover:bg-surface-container dark:hover:bg-primary transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 bg-secondary text-on-secondary rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Aplicar recorte
          </button>
        </div>
      </div>
    </div>
  )
}
