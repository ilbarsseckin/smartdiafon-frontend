'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Cable, Building2, DoorOpen, Zap, Loader2, ArrowRight, Wifi } from 'lucide-react'

export default function HizliTeklif() {
  const router = useRouter()
  const [daire, setDaire] = useState('')
  const [kapi, setKapi] = useState('1')
  const [sistem, setSistem] = useState<'dt8' | 'ip'>('dt8')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  function handleHesapla() {
    const d = parseInt(daire) || 0
    const k = parseInt(kapi) || 1
    if (d <= 0) return

    setLoading(true)
    setProgress(0)

    // Dolma efekti — ürünler araştırılıyor
    const mesajlar = [
      'Proje bilgileri alınıyor',
      'Uygun ürünler araştırılıyor',
      'Güncel fiyatlar hesaplanıyor',
      'Paketler hazırlanıyor',
    ]
    let p = 0
    const timer = setInterval(() => {
      p += Math.random() * 18 + 7
      if (p >= 100) {
        p = 100
        setProgress(100)
        clearInterval(timer)
        setTimeout(() => {
          router.push(`/teklif?daire=${d}&kapi=${k}&sistem=${sistem}&auto=1`)
        }, 400)
      } else {
        setProgress(Math.round(p))
      }
    }, 350)
  }

  const aktifMesaj =
    progress < 30 ? 'Proje bilgileri alınıyor...' :
    progress < 60 ? 'Uygun ürünler araştırılıyor...' :
    progress < 90 ? 'Güncel fiyatlar hesaplanıyor...' :
    'Paketler hazırlanıyor...'

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="rounded-3xl p-6 md:p-10 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #15233B 0%, #1d3a5f 100%)',
        }}>
        {/* Dekoratif arka plan */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F4821F, transparent)', transform: 'translate(30%,-30%)' }} />

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={20} style={{ color: '#F4821F' }} />
            <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: '#F4821F' }}>
              Hızlı Teklif
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-[-0.5px]">
            Projeniz İçin Saniyeler İçinde Teklif Alın
          </h2>
          <p className="text-[14px] mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Daire ve kapı sayınızı girin, sistem tipini seçin — size özel paketleri hemen hesaplayalım.
          </p>

          {!loading ? (
            <div className="space-y-4">
              {/* Sistem seçimi */}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setSistem('dt8')}
                  className="flex items-center gap-3 p-4 rounded-2xl transition-all text-left"
                  style={{
                    background: sistem === 'dt8' ? 'rgba(244,130,31,0.15)' : 'rgba(255,255,255,0.06)',
                    border: sistem === 'dt8' ? '2px solid #F4821F' : '2px solid transparent',
                  }}>
                  <Cable size={22} style={{ color: sistem === 'dt8' ? '#F4821F' : 'rgba(255,255,255,0.6)' }} />
                  <div>
                    <p className="text-[14px] font-bold text-white">Multibus</p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                      DT8 Kablo
                    </span>
                  </div>
                </button>

                <button onClick={() => setSistem('ip')}
                  className="flex items-center gap-3 p-4 rounded-2xl transition-all text-left"
                  style={{
                    background: sistem === 'ip' ? 'rgba(244,130,31,0.15)' : 'rgba(255,255,255,0.06)',
                    border: sistem === 'ip' ? '2px solid #F4821F' : '2px solid transparent',
                  }}>
                  <Wifi size={22} style={{ color: sistem === 'ip' ? '#F4821F' : 'rgba(255,255,255,0.6)' }} />
                  <div>
                    <p className="text-[14px] font-bold text-white">IP İnterkom</p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                      Cat5 / Cat6 Kablo
                    </span>
                  </div>
                </button>
              </div>

              {/* Daire + kapı + buton */}
              <div className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
                <div className="relative">
                  <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <input type="number" value={daire} onChange={e => setDaire(e.target.value)}
                    placeholder="Daire sayısı" min={1}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-[14px] font-medium text-white placeholder:text-white/40"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
                <div className="relative">
                  <DoorOpen size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <input type="number" value={kapi} onChange={e => setKapi(e.target.value)}
                    placeholder="Kapı / giriş sayısı" min={1}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-[14px] font-medium text-white placeholder:text-white/40"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
                <button onClick={handleHesapla}
                  disabled={!daire || parseInt(daire) <= 0}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[14px] text-white transition-all hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg,#F4821F,#ff9f47)' }}>
                  Teklif Hesapla <ArrowRight size={18} />
                </button>
              </div>

              <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Görüntüsüz diyafonunuzu görüntülüye çevirmek mi istiyorsunuz? Sistem tipini seçip hemen teklif alın.
              </p>
            </div>
          ) : (
            /* Yükleme animasyonu */
            <div className="py-8">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 size={20} className="animate-spin" style={{ color: '#F4821F' }} />
                <span className="text-[15px] font-bold text-white">{aktifMesaj}</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#F4821F,#ff9f47)' }} />
              </div>
              <p className="text-right text-[13px] font-black mt-2" style={{ color: '#F4821F' }}>%{progress}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
