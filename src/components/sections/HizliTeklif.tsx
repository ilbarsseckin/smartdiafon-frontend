'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { Building2, DoorOpen, Zap, Loader2, ArrowRight, Calculator, Cable, Wifi, Server } from 'lucide-react'

interface ApiProduct {
  id: string; name: string; slug: string; categorySlug: string; minPriceUsd: number
}

/* En ucuz monitör + temel panel ile yaklaşık sistem fiyatı */
const SISTEMLER = [
  {
    key: 'dt8', ad: 'Multibus', kablo: 'DT8 Kablo', icon: Cable,
    monSlug: 'multibus-ev-ici-monitor', panSlug: 'multibus-kapi-paneli',
    monFilter: (n: string) => n.includes('MONITOR') && !n.includes('APARAT') && !n.includes('KASA'),
    panFilter: (n: string) => n.includes('KAPI PANELI') && !n.includes('YAGMURLUK') && !n.includes('CEVIRME') && !n.includes('APARAT') && !n.includes('KASA') && !n.includes('ISIMLIK'),
  },
  {
    key: 'ip', ad: 'IP İnterkom', kablo: 'Cat5 / Cat6', icon: Wifi,
    monSlug: 'ev-ici-monitor', panSlug: 'ip-apartman-kapi-panelleri',
    monFilter: (n: string) => n.startsWith('VIP') && n.includes('MONITOR'),
    panFilter: (n: string) => n.startsWith('DIP') && n.includes('KAPI PANELI'),
  },
  {
    key: 'linux', ad: 'Linux İnterkom', kablo: 'Cat5 / Cat6', icon: Server,
    monSlug: 'linux-ev-i-ci-monitor', panSlug: 'linux-kapi-paneli',
    monFilter: (n: string) => n.startsWith('LIM') && n.includes('MONITOR'),
    panFilter: (n: string) => n.startsWith('LIK') && n.includes('KAPI PANELI') && !n.includes('APARAT') && !n.includes('YAGMURLUK'),
  },
]

const fmtTl = (n: number) => '₺' + Math.round(n).toLocaleString('tr-TR')

export default function HizliTeklif() {
  const router = useRouter()
  const [daire, setDaire] = useState('')
  const [kapi, setKapi] = useState('1')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [sonuc, setSonuc] = useState<{ key: string; ad: string; kablo: string; icon: any; fiyat: number }[] | null>(null)

  const [kur, setKur] = useState(45)
  const [products, setProducts] = useState<ApiProduct[]>([])

  useEffect(() => {
    Promise.all([
      api.get('/api/settings/public'),
      api.get('/api/catalog/products?size=500'),
    ]).then(([s, p]) => {
      const k = parseFloat(s.data?.data?.usd_kur || '45')
      setKur(isNaN(k) ? 45 : k)
      setProducts((p.data?.data || []).map((x: any) => ({
        id: x.id, name: x.name, slug: x.slug, categorySlug: x.categorySlug, minPriceUsd: x.minPriceUsd || 0,
      })))
    }).catch(() => {})
  }, [])

  function enUcuz(slug: string, filter: (n: string) => boolean): number {
    const list = products.filter(p => p.categorySlug === slug && filter(p.name.toUpperCase()) && p.minPriceUsd > 0)
    if (!list.length) return 0
    return Math.min(...list.map(p => p.minPriceUsd))
  }

  function handleHesapla() {
    const d = parseInt(daire) || 0
    const k = parseInt(kapi) || 1
    if (d <= 0) return

    setLoading(true)
    setProgress(0)
    setSonuc(null)

    let p = 0
    const timer = setInterval(() => {
      p += Math.random() * 9 + 3
      if (p >= 100) {
        p = 100
        setProgress(100)
        clearInterval(timer)
        setTimeout(() => {
          const hesap = SISTEMLER.map(s => {
            const mon = enUcuz(s.monSlug, s.monFilter)
            const pan = enUcuz(s.panSlug, s.panFilter)
            const fiyat = (mon * d + pan * k) * kur
            return { key: s.key, ad: s.ad, kablo: s.kablo, icon: s.icon, fiyat }
          }).filter(x => x.fiyat > 0).sort((a, b) => a.fiyat - b.fiyat)
          setSonuc(hesap)
          setLoading(false)
        }, 500)
      } else {
        setProgress(Math.round(p))
      }
    }, 300)
  }

  const aktifMesaj =
    progress < 25 ? 'Proje bilgileri alınıyor...' :
    progress < 50 ? 'Uygun ürünler araştırılıyor...' :
    progress < 75 ? 'Güncel fiyatlar hesaplanıyor...' :
    progress < 95 ? 'Sistemler karşılaştırılıyor...' :
    'Teklifiniz hazır!'

  function reset() {
    setSonuc(null); setProgress(0)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="rounded-2xl md:rounded-3xl p-5 md:p-8"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>

        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(244,130,31,0.12)' }}>
            <Zap size={15} style={{ color: '#F4821F' }} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#F4821F' }}>
            Hızlı Teklif
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-black mb-2 tracking-[-0.5px]" style={{ color: 'var(--text-primary)' }}>
          3 Sistemi Karşılaştırın, Size Uygun Olanı Seçin
        </h2>
        <p className="text-[13px] md:text-[14px] mb-5" style={{ color: 'var(--text-muted)' }}>
          Daire ve kapı sayınızı girin — Multibus, IP ve Linux sistemleri için yaklaşık fiyatları anında görün.
        </p>

        {/* FORM */}
        {!loading && !sonuc && (
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
              <Calculator size={18} /> Sistemleri Karşılaştır <ArrowRight size={16} />
            </button>
            <p className="text-[11px] text-center" style={{ color: 'var(--text-muted)' }}>
              Görüntüsüz diyafonunuzu görüntülüye çevirmek için de uygundur.
            </p>
          </div>
        )}

        {/* YÜKLENİYOR */}
        {loading && (
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

        {/* SONUÇ — 3 sistem karşılaştırma */}
        {sonuc && (
          <div>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              {sonuc.map((s, i) => {
                const Icon = s.icon
                const enUcuzMu = i === 0
                return (
                  <div key={s.key} className="rounded-2xl p-4 relative"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: enUcuzMu ? '2px solid #F4821F' : '1px solid var(--border)',
                    }}>
                    {enUcuzMu && (
                      <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full text-[9px] font-black"
                        style={{ background: '#F4821F', color: '#fff' }}>
                        EN UYGUN
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={18} style={{ color: '#F4821F' }} />
                      <span className="text-[14px] font-black" style={{ color: 'var(--text-primary)' }}>{s.ad}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded mb-3"
                      style={{ background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                      <Cable size={10} /> {s.kablo}
                    </span>
                    <p className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>Yaklaşık başlangıç</p>
                    <p className="text-xl font-black mb-3" style={{ color: '#F4821F' }}>{fmtTl(s.fiyat)}</p>
                    <button onClick={() => router.push(`/teklif?daire=${parseInt(daire)}&kapi=${parseInt(kapi)}&sistem=${s.key === 'linux' ? 'linux' : s.key}&auto=1`)}
                      className="w-full flex items-center justify-center gap-1 py-2.5 rounded-lg font-bold text-[12px] transition-all"
                      style={{
                        background: enUcuzMu ? 'linear-gradient(135deg,#F4821F,#ff9f47)' : 'var(--bg-card)',
                        color: enUcuzMu ? '#fff' : 'var(--text-primary)',
                        border: enUcuzMu ? 'none' : '1px solid var(--border)',
                      }}>
                      Detaylı Teklif <ArrowRight size={13} />
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                * Yaklaşık fiyatlar. Detaylı teklif için sistem seçin.
              </p>
              <button onClick={reset}
                className="text-[12px] font-bold transition-colors hover:text-[#F4821F]"
                style={{ color: 'var(--text-secondary)' }}>
                ↺ Yeniden hesapla
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}