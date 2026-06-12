'use client'

const badges = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L4 7v7c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V7L14 3z" stroke="#10B981" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 14l3.5 3.5L19 11" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'SSL Güvenli Ödeme',
    desc: '256-bit şifreleme',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="14" rx="2" stroke="#6366F1" strokeWidth="1.8"/>
        <path d="M4 12h20" stroke="#6366F1" strokeWidth="1.8"/>
        <path d="M8 17h4" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'iyzico ile Ödeme',
    desc: 'Taksit imkânı',
    color: '#6366F1',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M5 16h14v-8H5v8zM19 16h4l-2-6h-2v6z" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="19" r="2" stroke="#DC2626" strokeWidth="1.5"/>
        <circle cx="20" cy="19" r="2" stroke="#DC2626" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Hızlı Kargo',
    desc: 'Türkiye geneli teslimat',
    color: '#DC2626',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M14 4a10 10 0 100 20A10 10 0 0014 4z" stroke="#0EA5E9" strokeWidth="1.8"/>
        <path d="M14 8v6l4 2" stroke="#0EA5E9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '7/24 Destek',
    desc: 'WhatsApp & telefon',
    color: '#0EA5E9',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L4 7v7c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V7L14 3z" stroke="#F59E0B" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M14 9v5M14 17.5v.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: '2 Yıl Garanti',
    desc: 'Üretici garantisi',
    color: '#F59E0B',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l2.5 7.5H24l-6.5 4.7 2.5 7.5L14 19.2l-6 4.5 2.5-7.5L4 11.5h7.5L14 4z" stroke="#EC4899" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Yetkili Satıcı',
    desc: 'Orijinal Multitek ürünleri',
    color: '#EC4899',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="11" r="6" stroke="#8B5CF6" strokeWidth="1.8"/>
        <path d="M6 24c0-4 3.6-6 8-6s8 2 8 6" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Teknik Danışmanlık',
    desc: 'Proje desteği',
    color: '#8B5CF6',
  },
]

// İki kez tekrarla — sonsuz döngü için
const doubled = [...badges, ...badges]

export default function GuvenRozetleri() {
  return (
    <section className="py-3 overflow-hidden"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>

      <style>{`
        @keyframes badge-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .badge-track {
          display: flex;
          width: max-content;
          animation: badge-scroll 28s linear infinite;
        }
        .badge-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Kenar gölgeleri */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-secondary), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-secondary), transparent)' }} />

        <div className="badge-track">
          {doubled.map((badge, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-2 flex-shrink-0">
              {/* İkon */}
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${badge.color}15` }}>
                {badge.icon}
              </div>
              {/* Metin */}
              <div className="whitespace-nowrap">
                <p className="text-[12px] font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                  {badge.title}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  {badge.desc}
                </p>
              </div>
              {/* Ayraç */}
              <div className="ml-4 w-px h-6 flex-shrink-0" style={{ background: 'var(--border)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
