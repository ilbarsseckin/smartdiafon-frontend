'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, DoorOpen, Zap, Loader2, ArrowRight, Calculator } from 'lucide-react'

export default function HizliTeklif() {
  const router = useRouter()
  const [daire, setDaire] = useState('')
  const [kapi, setKapi] = useState('1')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  function handleHesapla() {
    const d = parseInt(daire) || 0
    const k = parseInt(kapi) || 1
    if (d <= 0) return

    setLoading(true)
    setProgress(0)

    let p = 0
    const timer = setInterval(() => {
      p += Math.random() * 9 + 3
      if (p >= 100) {
        p = 100
        setProgress(100)
        clearInterval(timer)
        setTimeout(() => {
          router.push(`/teklif?daire=${d}&kapi=${k}&sistem=dt8&auto=1`)
        }, 500)
      } else {
        setProgress(Math.round(p))
      }
    }, 320)
  }

  const aktifMesaj =
    progress < 25 ? 'Proje bilgileri alınıyor...' :
    progress < 50 ? 'Uygun ürünler araştırılıyor...' :
    progress < 75 ? 'Güncel fiyatlar hesaplanıyor...' :
    progress < 95 ? 'Paketler hazırlanıyor...' :
    'Teklifiniz hazır!'

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="rounded-2xl md:rounded-3xl overflow-hidden"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <div className="grid md:grid-cols-[1.1fr_1fr]">

          {/* Sol — metin + form */}
          <div className="p-5 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(244,130,31,0.12)' }}>
                <Zap size={15} style={{ color: '#F4821F' }} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#F4821F' }}>
                Hızlı Teklif
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black mb-2 tracking-[-0.5px]" style={{ color: 'var(--text-primary)' }}>
              Projeniz İçin Saniyeler İçinde Teklif Alın
            </h2>
            <p className="text-[13px] md:text-[14px] mb-5" style={{ color: 'var(--text-muted)' }}>
              Daire ve kapı sayınızı girin — size özel ekonomik, standart ve premium paketleri anında hesaplayalım.
            </p>

            {!loading ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Building2 size={17} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                    <input type="number" inputMode="numeric" value={daire} onChange={e => setDaire(e.target.value)}
                      placeholder="Daire sayısı" min={1}
                      className="w-full pl-9 pr-3 py-3 rounded-xl text-[14px] font-medium"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                  <div className="relative">
                    <DoorOpen size={17} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                    <input type="number" inputMode="numeric" value={kapi} onChange={e => setKapi(e.target.value)}
                      placeholder="Kapı sayısı" min={1}
                      className="w-full pl-9 pr-3 py-3 rounded-xl text-[14px] font-medium"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <button onClick={handleHesapla}
                  disabled={!daire || parseInt(daire) <= 0}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[14px] text-white transition-all hover:scale-[1.01] disabled:opacity-40 disabled:hover:scale-100"
                  style={{ background: 'linear-gradient(135deg,#F4821F,#ff9f47)' }}>
                  <Calculator size={18} /> Otomatik Teklif Hesapla <ArrowRight size={16} />
                </button>
                <p className="text-[11px] text-center" style={{ color: 'var(--text-muted)' }}>
                  Görüntüsüz diyafonunuzu görüntülüye çevirmek için de uygundur.
                </p>
              </div>
            ) : (
              <div className="py-4">
                <div className="flex items-center gap-2 mb-3">
                  <Loader2 size={18} className="animate-spin" style={{ color: '#F4821F' }} />
                  <span className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>{aktifMesaj}</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#F4821F,#ff9f47)' }} />
                </div>
                <p className="text-right text-[13px] font-black mt-2" style={{ color: '#F4821F' }}>%{progress}</p>
              </div>
            )}
          </div>

          {/* Sağ — görsel/istatistik (mobilde gizli) */}
          <div className="hidden md:flex flex-col justify-center gap-4 p-8"
            style={{ background: 'linear-gradient(135deg, #15233B 0%, #1d3a5f 100%)' }}>
            {[
              { n: '356+', l: 'Multitek ürün çeşidi' },
              { n: '3', l: 'Hazır paket seçeneği' },
              { n: '7/24', l: 'Teknik danışmanlık' },
            ].map((s, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="text-2xl font-black" style={{ color: '#F4821F' }}>{s.n}</span>
                <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.l}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}