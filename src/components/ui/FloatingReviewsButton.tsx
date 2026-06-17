'use client'
import { useState } from 'react'
import { Star, ChevronLeft } from 'lucide-react'

export default function FloatingReviewsButton() {
  const [collapsed, setCollapsed] = useState(false)

  const scrollToReviews = () => {
    const el = document.getElementById('reviews-section')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center"
      style={{ transition: 'transform 0.3s ease' }}
    >
      {/* Gizle/göster ok butonu */}
      <button
        onClick={() => setCollapsed(o => !o)}
        className="w-5 flex items-center justify-center py-4 rounded-l-lg"
        style={{
          background: 'rgba(230,57,70,0.15)',
          color: '#DC2626',
          border: '1px solid rgba(230,57,70,0.3)',
          borderRight: 'none',
        }}
        aria-label={collapsed ? 'Yorumları göster' : 'Gizle'}
      >
        <ChevronLeft
          size={12}
          style={{
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </button>

      {/* Ana buton */}
      <div
        style={{
          overflow: 'hidden',
          width: collapsed ? 0 : 36,
          transition: 'width 0.3s ease',
        }}
      >
        <button
          onClick={scrollToReviews}
          className="flex flex-col items-center justify-center gap-1.5 py-5 px-2.5"
          style={{
            background: 'linear-gradient(180deg, #DC2626, #C1272D)',
            color: 'white',
            width: 36,
            borderRadius: '8px 0 0 8px',
            boxShadow: '-3px 0 12px rgba(230,57,70,0.3)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            whiteSpace: 'nowrap',
          }}
          aria-label="Müşteri yorumlarına git"
        >
          <Star size={13} className="fill-white flex-shrink-0" style={{ writingMode: 'horizontal-tb' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', writingMode: 'vertical-rl' }}>
            Yorumlar
          </span>
        </button>
      </div>
    </div>
  )
}
