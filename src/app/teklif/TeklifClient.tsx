'use client'

import { useState, useEffect, useMemo } from 'react'
import api from '@/lib/api'
import {
  Cable, Building2, Cpu, FileText, ChevronRight, ChevronLeft,
  Check, Star, Phone, Mail, Download, MessageCircle, Loader2,
  Plus, Minus, Info, MapPin, Zap
} from 'lucide-react'

/* ---------- Tipler ---------- */
interface ApiProduct {
  id: string
  name: string
  slug: string
  categorySlug: string
  minPriceUsd: number
  mainImageUrl: string
  shortDesc?: string
}
interface LineItem {
  name: string
  qty: number
  unitUsd: number
  slug?: string
  image?: string
  shortDesc?: string
}
interface Paket {
  key: 'ekonomik' | 'standart' | 'premium'
  label: string
  rozet?: string
  items: LineItem[]
  totalTl: number
}

/* ---------- Multibus kategori slug'ları ---------- */
const SLUG_MONITOR = 'multibus-ev-ici-monitor'
const SLUG_PANEL = 'multibus-kapi-paneli'
const SLUG_GUVENLIK = 'multibus-guvenlik'
const SLUG_DIAFONBOX = 'multibus-diafonbox'

/* ---------- IP kategori slug'ları ---------- */
const SLUG_IP_MONITOR = 'ev-ici-monitor'
const SLUG_IP_PANEL = 'ip-apartman-kapi-panelleri'
const SLUG_IP_GUVENLIK = 'ip-guvenlik-cihazi'
const SLUG_IP_AKSESUAR = 'ip-interkom'

function isGuvenlikKonsolu(name: string) {
  return name.toUpperCase().includes('GUVENLIK KONSOL')
}

/* Monitör seviyesi (paketleme için) — düşük=ekonomik */
function monitorSeviye(name: string): number {
  const n = name.toUpperCase()
  if (n.includes('MBT-70')) return 5
  if (n.includes('MB-74')) return 4
  if (n.includes('MB-47')) return 3 // dokunmatik
  if (n.includes('MB-46')) return 2
  if (n.includes('MB-45')) return 1
  if (n.includes('MB-43')) return 1
  return 2
}
function paneliSeviye(name: string): number {
  const n = name.toUpperCase()
  if (n.includes('MB-12')) return 4
  if (n.includes('MB-11')) return 3
  if (n.includes('MB-13')) return 3 // proximity
  if (n.includes('MB-10')) return 2
  return 1
}

/* IP monitör seviyesi */
function ipMonitorSeviye(name: string): number {
  const n = name.toUpperCase()
  if (n.includes('10 INC')) return 5
  if (n.includes('SMART')) return 4
  if (n.includes('VIP74') || n.includes('VIP75')) return 3
  if (n.includes('ALARM')) return 2
  return 1 // STD 7"
}
/* IP panel seviyesi */
function ipPaneliSeviye(name: string): number {
  const n = name.toUpperCase()
  if (n.includes('DIP70Y') || n.includes('YÜZ TANIMA') || n.includes('YUZ TANIMA')) return 4
  if (n.includes('DIP70')) return 3
  if (n.includes('DIP40')) return 2
  if (n.includes('DIP01')) return 1
  return 1
}
function isIpMonitor(name: string) {
  return name.toUpperCase().includes('MONITOR') && name.toUpperCase().startsWith('VIP')
}
function isIpPanel(name: string) {
  const n = name.toUpperCase()
  return n.startsWith('DIP') && n.includes('KAPI PANELI')
}

const fmtTl = (n: number) =>
  '₺' + Math.round(n).toLocaleString('tr-TR')

/* ====================================================== */

export default function TeklifClient() {
  const [step, setStep] = useState(1)
  const [kur, setKur] = useState(45)
  const [products, setProducts] = useState<ApiProduct[]>([])
  const [loading, setLoading] = useState(true)

  // Adım 1 — altyapı / sistem
  const [altyapi, setAltyapi] = useState<'dt8' | 'cat' | null>(null)
  // Seçili sistem: dt8 → multibus, cat → ip
  const sistem: 'multibus' | 'ip' = altyapi === 'cat' ? 'ip' : 'multibus'

  // Adım 2 — bina
  const [daire, setDaire] = useState(0)
  const [blok, setBlok] = useState(1)
  const [kapi, setKapi] = useState(1)

  // Adım 3 — seçimler
  const [monitorId, setMonitorId] = useState<string>('')
  const [panelId, setPanelId] = useState<string>('')
  const [gucKaynagi, setGucKaynagi] = useState(0)
  const [videoYukseltici, setVideoYukseltici] = useState(0)
  const [guvenlikKonsolu, setGuvenlikKonsolu] = useState(false)
  const [diafonBox, setDiafonBox] = useState(false)
  const [sehir, setSehir] = useState('')

  // Lead
  const [adSoyad, setAdSoyad] = useState('')
  const [telefon, setTelefon] = useState('')
  const [eposta, setEposta] = useState('')

  // Adım 4 görünüm modu: kendi seçimi mi, otomatik paketler mi
  const [teklifMode, setTeklifMode] = useState<'kendi' | 'otomatik'>('otomatik')

  // Ek aksesuarlar: { productId: adet }
  const [aksesuarlar, setAksesuarlar] = useState<Record<string, number>>({})

  /* ---- URL parametrelerinden ön doldur (ana sayfa hızlı teklif) ---- */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const d = parseInt(params.get('daire') || '0')
    const k = parseInt(params.get('kapi') || '0')
    const s = params.get('sistem')
    const auto = params.get('auto')
    if (s === 'ip') setAltyapi('cat')
    else if (s === 'dt8') setAltyapi('dt8')
    if (d > 0) setDaire(d)
    if (k > 0) setKapi(k)
    if (auto === '1' && d > 0) {
      setTeklifMode('otomatik')
      setStep(4)
    }
  }, [])

  /* ---- Veri çek ---- */
  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      try {
        const [settingsRes, prodRes] = await Promise.all([
          api.get('/api/settings/public'),
          api.get('/api/catalog/products?size=500'),
        ])
        if (!active) return
        const k = parseFloat(settingsRes.data?.data?.usd_kur || '45')
        setKur(isNaN(k) ? 45 : k)
        const list: ApiProduct[] = (prodRes.data?.data || []).map((p: any) => ({
          id: p.id, name: p.name, slug: p.slug,
          categorySlug: p.categorySlug, minPriceUsd: p.minPriceUsd || 0,
          mainImageUrl: p.mainImageUrl, shortDesc: p.shortDesc,
        }))
        setProducts(list)
      } catch (e) {
        console.error('Teklif veri yükleme hatası', e)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  /* ---- Ürünleri ayıkla (sisteme göre) ---- */
  const monitorler = useMemo(() => {
    if (sistem === 'ip') {
      return products.filter(p => p.categorySlug === SLUG_IP_MONITOR && isIpMonitor(p.name))
        .sort((a, b) => ipMonitorSeviye(a.name) - ipMonitorSeviye(b.name))
    }
    return products.filter(p => {
      if (p.categorySlug !== SLUG_MONITOR) return false
      const n = p.name.toUpperCase()
      if (!n.includes('MONITOR')) return false
      if (n.includes('APARAT') || n.includes('KASA') || n.includes('TUTTURMA')) return false
      return true
    }).sort((a, b) => monitorSeviye(a.name) - monitorSeviye(b.name))
  }, [products, sistem])

  const paneller = useMemo(() => {
    if (sistem === 'ip') {
      return products.filter(p => p.categorySlug === SLUG_IP_PANEL && isIpPanel(p.name))
        .sort((a, b) => ipPaneliSeviye(a.name) - ipPaneliSeviye(b.name))
    }
    return products.filter(p => {
      if (p.categorySlug !== SLUG_PANEL) return false
      const n = p.name.toUpperCase()
      if (!n.includes('KAPI PANELI')) return false
      if (n.includes('YAGMURLUK') || n.includes('CEVIRME') || n.includes('APARAT') ||
          n.includes('KASA') || n.includes('ISIMLIK') || n.includes('ISIMLI')) return false
      return true
    }).sort((a, b) => paneliSeviye(a.name) - paneliSeviye(b.name))
  }, [products, sistem])

  const guvenlik = useMemo(() => {
    if (sistem === 'ip') {
      return products.find(p => p.categorySlug === SLUG_IP_GUVENLIK && p.name.toUpperCase().includes('GUVENLIK MON'))
    }
    return products.find(p => p.categorySlug === SLUG_GUVENLIK && isGuvenlikKonsolu(p.name)) || products.find(p => isGuvenlikKonsolu(p.name))
  }, [products, sistem])

  const dbMini = useMemo(() => products.find(p => p.categorySlug === SLUG_DIAFONBOX && p.name.toUpperCase().includes('MINI')), [products])
  const dbMaxi = useMemo(() => products.find(p => p.categorySlug === SLUG_DIAFONBOX && p.name.toUpperCase().includes('MAXI')), [products])
  const gucKaynagiUrun = useMemo(
    () => products.find(p => p.name.toUpperCase().includes('GUC KAYNAGI') || p.name.toUpperCase().includes('REDRESOR')),
    [products]
  )

  /* ---- Ek aksesuarlar (sisteme göre) ---- */
  const aksesuarListesi = useMemo(() => {
    if (sistem === 'ip') {
      // IP aksesuar kategorisi: switch, adaptör, lisans, kasa, konnektör
      return products.filter(p => p.categorySlug === SLUG_IP_AKSESUAR)
    }
    // Multibus: kapı paneli aksesuarları (yağmurluk, aparat, kasa) + güç/video
    return products.filter(p => {
      const n = p.name.toUpperCase()
      return p.categorySlug === SLUG_PANEL && (
        n.includes('YAGMURLUK') || n.includes('CEVIRME') || n.includes('APARAT') || n.includes('KASA')
      )
    })
  }, [products, sistem])

  const aksesuarTotal = useMemo(() => {
    return Object.entries(aksesuarlar).reduce((s, [id, qty]) => {
      const p = products.find(x => x.id === id)
      return s + (p ? p.minPriceUsd * kur * qty : 0)
    }, 0)
  }, [aksesuarlar, products, kur])

  function setAksesuarQty(id: string, qty: number) {
    setAksesuarlar(prev => {
      const next = { ...prev }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }

  /* ---- Sisteme göre seviye fonksiyonları (paket üretiminde kullanılır) ---- */
  const monLvl = sistem === 'ip' ? ipMonitorSeviye : monitorSeviye
  const panLvl = sistem === 'ip' ? ipPaneliSeviye : paneliSeviye

  // Varsayılan seçimler (sistem veya ürünler değişince)
  useEffect(() => {
    if (monitorler.length) {
      const varMi = monitorler.some(m => m.id === monitorId)
      if (!varMi) setMonitorId(monitorler[0].id)
    }
    if (paneller.length) {
      const varMi = paneller.some(p => p.id === panelId)
      if (!varMi) {
        const tercih = sistem === 'ip'
          ? paneller.find(p => p.name.toUpperCase().includes('DIP70-CB'))
          : paneller.find(p => p.name.toUpperCase().includes('MB-10 MULTIBUS RENKLI'))
        setPanelId(tercih ? tercih.id : paneller[0].id)
      }
    }
  }, [monitorler, paneller, sistem, monitorId, panelId])

  /* ---- DiafonBox seç (daireye göre) ---- */
  function pickDiafonBox(): ApiProduct | undefined {
    if (daire <= 30) return dbMini
    return dbMaxi || dbMini
  }

  /* ---- Tek teklif hesapla (seçili ürünlerle) ---- */
  function hesaplaSecili(): LineItem[] {
    const items: LineItem[] = []
    const mon = products.find(p => p.id === monitorId)
    const pan = products.find(p => p.id === panelId)
    if (mon && daire > 0) items.push({ name: mon.name, qty: daire, unitUsd: mon.minPriceUsd })
    if (pan && kapi > 0) items.push({ name: pan.name, qty: kapi, unitUsd: pan.minPriceUsd })
    if (guvenlikKonsolu && guvenlik) items.push({ name: guvenlik.name, qty: 1, unitUsd: guvenlik.minPriceUsd })
    if (diafonBox) {
      const db = pickDiafonBox()
      if (db) items.push({ name: db.name, qty: 1, unitUsd: db.minPriceUsd })
    }
    if (gucKaynagi > 0 && gucKaynagiUrun)
      items.push({ name: gucKaynagiUrun.name, qty: gucKaynagi, unitUsd: gucKaynagiUrun.minPriceUsd })
    // Ek aksesuarlar
    Object.entries(aksesuarlar).forEach(([id, qty]) => {
      const p = products.find(x => x.id === id)
      if (p && qty > 0) items.push({ name: p.name, qty, unitUsd: p.minPriceUsd, slug: p.slug, image: p.mainImageUrl, shortDesc: p.shortDesc })
    })
    return items
  }

  /* ---- 3 paket üret (ekonomik/standart/premium) ---- */
  const paketler: Paket[] = useMemo(() => {
    if (!monitorler.length || !paneller.length || daire <= 0) return []

    function paket(monL: number, panL: number, diafon: boolean, key: Paket['key'], label: string): Paket {
      const mon = monitorler.find(m => monLvl(m.name) >= monL) || monitorler[monitorler.length - 1]
      const pan = paneller.find(p => panLvl(p.name) >= panL) || paneller[paneller.length - 1]
      const items: LineItem[] = []
      if (mon) items.push({ name: mon.name, qty: daire, unitUsd: mon.minPriceUsd, slug: mon.slug, image: mon.mainImageUrl, shortDesc: mon.shortDesc })
      if (pan) items.push({ name: pan.name, qty: kapi, unitUsd: pan.minPriceUsd, slug: pan.slug, image: pan.mainImageUrl, shortDesc: pan.shortDesc })
      if (guvenlik) items.push({ name: guvenlik.name, qty: 1, unitUsd: guvenlik.minPriceUsd, slug: guvenlik.slug, image: guvenlik.mainImageUrl, shortDesc: guvenlik.shortDesc })
      if (diafon && sistem === 'multibus') {
        const db = pickDiafonBox()
        if (db) items.push({ name: db.name, qty: 1, unitUsd: db.minPriceUsd, slug: db.slug, image: db.mainImageUrl, shortDesc: db.shortDesc })
      }
      const totalTl = items.reduce((s, it) => s + it.qty * it.unitUsd * kur, 0)
      return { key, label, items, totalTl }
    }

    return [
      paket(1, 2, false, 'ekonomik', 'Ekonomik'),
      { ...paket(3, 3, false, 'standart', 'Standart'), rozet: 'En çok tercih edilen' },
      paket(4, 4, true, 'premium', 'Premium'),
    ]
  }, [monitorler, paneller, guvenlik, daire, kapi, kur, sistem])

  const seciliItems = hesaplaSecili()
  const seciliTotal = seciliItems.reduce((s, it) => s + it.qty * it.unitUsd * kur, 0)

  /* ---- Adım geçişleri ---- */
  const canNext =
    (step === 1 && (altyapi === 'dt8' || altyapi === 'cat')) ||
    (step === 2 && daire > 0 && kapi > 0) ||
    step === 3

  /* ================= RENDER ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin" size={32} style={{ color: '#F4821F' }} />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Başlık */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-[-0.5px]" style={{ color: 'var(--text-primary)' }}>
          Proje Teklif Hesaplama
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          Birkaç adımda projenize özel diyafon sistemi teklifi alın
        </p>
      </div>

      {/* Adım göstergesi */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
        {[
          { n: 1, label: 'Altyapı', icon: Cable },
          { n: 2, label: 'Bina', icon: Building2 },
          { n: 3, label: 'Ürünler', icon: Cpu },
          { n: 4, label: 'Teklif', icon: FileText },
        ].map(({ n, label, icon: Icon }, i) => (
          <div key={n} className="flex items-center gap-2 md:gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: step >= n ? '#F4821F' : 'var(--bg-secondary)',
                  color: step >= n ? '#fff' : 'var(--text-muted)',
                  border: step >= n ? 'none' : '1px solid var(--border)',
                }}>
                {step > n ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span className="text-[10px] md:text-[11px] font-bold"
                style={{ color: step >= n ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {label}
              </span>
            </div>
            {i < 3 && (
              <div className="w-6 md:w-16 h-0.5 rounded-full"
                style={{ background: step > n ? '#F4821F' : 'var(--border)' }} />
            )}
          </div>
        ))}
      </div>

      {/* Bilgi notu */}
      <div className="flex items-start gap-2 p-3 rounded-xl mb-6 text-[13px]"
        style={{ background: 'rgba(244,130,31,0.08)', color: 'var(--text-secondary)' }}>
        <Info size={16} style={{ color: '#F4821F', flexShrink: 0, marginTop: 2 }} />
        <span>{sistem === 'ip'
          ? <>Bu hesaplama aracı <b>IP görüntülü interkom</b> sistemleri içindir. Cat5/Cat6 ethernet altyapısı gerektirir.</>
          : <>Bu hesaplama aracı <b>Multibus görüntülü diyafon</b> sistemleri içindir. Mevcut altyapınızın DT8 kablo yapısına uygun olması gerekir.</>
        }</span>
      </div>

      {/* ===== ADIM 1: Altyapı ===== */}
      {step === 1 && (
        <div className="rounded-3xl p-6 md:p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: '#F4821F' }}>Adım 1</p>
          <h2 className="text-xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>Mevcut Altyapınız</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Binanızdaki kablo altyapısına göre uygun sistemi belirleyelim.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <button onClick={() => setAltyapi('dt8')}
              className="text-left p-5 rounded-2xl transition-all"
              style={{
                background: altyapi === 'dt8' ? 'rgba(244,130,31,0.08)' : 'var(--bg-secondary)',
                border: altyapi === 'dt8' ? '2px solid #F4821F' : '2px solid transparent',
              }}>
              <div className="flex items-center gap-2 mb-2">
                <Cable size={20} style={{ color: '#F4821F' }} />
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>DT8 Kablo (Mevcut Bina)</span>
              </div>
              <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                Eski/mevcut diyafon altyapısı. Multibus görüntülü sistem önerilir.
              </p>
              <span className="inline-block mt-3 text-[11px] font-bold px-2 py-1 rounded-md"
                style={{ background: '#F4821F', color: '#fff' }}>Multibus</span>
            </button>

            <button onClick={() => setAltyapi('cat')}
              className="text-left p-5 rounded-2xl transition-all"
              style={{
                background: altyapi === 'cat' ? 'rgba(244,130,31,0.08)' : 'var(--bg-secondary)',
                border: altyapi === 'cat' ? '2px solid #F4821F' : '2px solid transparent',
              }}>
              <div className="flex items-center gap-2 mb-2">
                <Cable size={20} style={{ color: '#F4821F' }} />
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Cat5 / Cat6 (Yeni Bina)</span>
              </div>
              <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                Ethernet altyapısı. IP tabanlı görüntülü interkom — yüksek çözünürlük, akıllı ev entegrasyonu.
              </p>
              <span className="inline-block mt-3 text-[11px] font-bold px-2 py-1 rounded-md"
                style={{ background: '#F4821F', color: '#fff' }}>IP İnterkom</span>
            </button>
          </div>
        </div>
      )}

      {/* ===== ADIM 2: Bina ===== */}
      {step === 2 && (
        <div className="rounded-3xl p-6 md:p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: '#F4821F' }}>Adım 2</p>
          <h2 className="text-xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>Bina Bilgileri</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Monitör ve panel adetleri bu bilgilerden otomatik hesaplanır.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <Counter label="Daire Sayısı" value={daire} setValue={setDaire} min={0} />
            <Counter label="Blok Sayısı" value={blok} setValue={setBlok} min={1} />
            <Counter label="Kapı / Giriş Sayısı" value={kapi} setValue={setKapi} min={1} hint="Bahçe, otopark girişleri dahil" />
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl text-[12px]"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
            <Info size={14} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>Her blokta bahçe, otopark gibi ek girişler için kapı paneli sayısını artırabilirsiniz (blok başına 4 adede kadar önerilir).</span>
          </div>

          {/* İki yol — otomatik veya kendi seçimi */}
          {daire > 0 && kapi > 0 && (
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <button onClick={() => { setTeklifMode('otomatik'); setStep(4) }}
                className="text-left p-5 rounded-2xl transition-all hover:scale-[1.01]"
                style={{ background: 'linear-gradient(135deg,#F4821F,#ff9f47)', color: '#fff' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={20} />
                  <span className="font-black text-[15px]">Otomatik Teklif Hazırla</span>
                </div>
                <p className="text-[12px] opacity-90">
                  Daire ve kapı sayınıza göre ekonomik, standart ve premium paketleri hemen görün.
                </p>
              </button>

              <button onClick={() => { setTeklifMode('kendi'); setStep(3) }}
                className="text-left p-5 rounded-2xl transition-all hover:scale-[1.01]"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Cpu size={20} style={{ color: '#F4821F' }} />
                  <span className="font-black text-[15px]" style={{ color: 'var(--text-primary)' }}>Ürünleri Kendim Seçeceğim</span>
                </div>
                <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                  Monitör ve kapı paneli modellerini tek tek seçerek özel teklif oluşturun.
                </p>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===== ADIM 3: Ürünler ===== */}
      {step === 3 && (
        <div className="rounded-3xl p-6 md:p-8 space-y-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: '#F4821F' }}>Adım 3</p>
            <h2 className="text-xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>Ürün Seçimi</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Model seçin ya da bir sonraki adımda hazır paketlerden birini tercih edin.
            </p>
          </div>

          {/* Monitör */}
          <div>
            <label className="block text-[13px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Daire İçi Monitör <span style={{ color: '#F4821F' }}>({daire} adet)</span>
            </label>
            <div className="flex gap-3 items-start">
              <img src={products.find(p => p.id === monitorId)?.mainImageUrl || ''}
                alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-secondary)' }} />
              <select value={monitorId} onChange={e => setMonitorId(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl text-[14px]"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                {monitorler.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {fmtTl(m.minPriceUsd * kur)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Kapı paneli */}
          <div>
            <label className="block text-[13px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Kapı Paneli <span style={{ color: '#F4821F' }}>({kapi} adet)</span>
            </label>
            <div className="flex gap-3 items-start">
              <img src={products.find(p => p.id === panelId)?.mainImageUrl || ''}
                alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-secondary)' }} />
              <select value={panelId} onChange={e => setPanelId(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl text-[14px]"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                {paneller.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {fmtTl(p.minPriceUsd * kur)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Güç kaynağı + video yükseltici — elle */}
          <div className="grid md:grid-cols-2 gap-4">
            <Counter label="Güç Kaynağı" value={gucKaynagi} setValue={setGucKaynagi} min={0} hint="Kat ve mesafeye göre değişir" />
            <Counter label="Video Yükseltici" value={videoYukseltici} setValue={setVideoYukseltici} min={0} hint="Uzun mesafeli hatlar için" />
          </div>

          {/* Opsiyonlar */}
          <div className="space-y-3">
            <Toggle label="Güvenlik Konsolu" desc="Bina girişinde güvenlik/danışma birimi" checked={guvenlikKonsolu} onChange={setGuvenlikKonsolu} />
            {sistem === 'multibus' && (
              <Toggle label="DiafonBox (Cebe Bağlantı)" desc="Tüm binanın diyafonunu cep telefonuna taşır" checked={diafonBox} onChange={setDiafonBox} />
            )}
          </div>

          {/* Şehir */}
          <div>
            <label className="block text-[13px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Şehir (opsiyonel)</label>
            <input value={sehir} onChange={e => setSehir(e.target.value)} placeholder="Örn. İstanbul"
              className="w-full px-4 py-3 rounded-xl text-[14px]"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      )}

      {/* ===== ADIM 4: Teklif ===== */}
      {step === 4 && (
        <div className="space-y-6">
          {/* Geçerlilik süresi */}
          <div className="flex items-center justify-center gap-2 text-[12px] font-medium py-2 px-4 rounded-full mx-auto w-fit"
            style={{ background: 'rgba(244,130,31,0.08)', color: 'var(--text-secondary)' }}>
            <Info size={13} style={{ color: '#F4821F' }} />
            <span>Bu teklif hazırlanma tarihinden itibaren <b>7 gün</b> geçerlidir.</span>
          </div>

          {/* OTOMATİK — 3 Paket */}
          {teklifMode === 'otomatik' && (
          <div className="grid md:grid-cols-3 gap-4">
            {paketler.map(pk => (
              <div key={pk.key} className="rounded-2xl p-5 flex flex-col"
                style={{
                  background: 'var(--bg-card)',
                  border: pk.rozet ? '2px solid #F4821F' : '1px solid var(--border)',
                  position: 'relative',
                }}>
                {pk.rozet && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black whitespace-nowrap"
                    style={{ background: '#F4821F', color: '#fff' }}>
                    {pk.rozet}
                  </span>
                )}
                <h3 className="text-lg font-black mb-1" style={{ color: 'var(--text-primary)' }}>{pk.label}</h3>
                <p className="text-2xl font-black mb-4" style={{ color: '#F4821F' }}>{fmtTl(pk.totalTl)}</p>
                <div className="space-y-3 flex-1 mb-4">
                  {pk.items.map((it, i) => (
                    <a key={i} href={it.slug ? `/urun/${it.slug}` : '#'} target="_blank" rel="noopener noreferrer"
                      className="flex gap-3 p-2 rounded-xl transition-colors"
                      style={{ background: 'var(--bg-secondary)' }}>
                      <img src={it.image || ''} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        style={{ border: '1px solid var(--border)' }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                          {it.qty}× {it.name.length > 30 ? it.name.slice(0, 30) + '…' : it.name}
                        </p>
                        {it.shortDesc && (
                          <p className="text-[10px] mt-0.5 leading-tight" style={{ color: 'var(--text-muted)' }}>
                            {it.shortDesc.length > 50 ? it.shortDesc.slice(0, 50) + '…' : it.shortDesc}
                          </p>
                        )}
                        <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#F4821F' }}>
                          Ürünü incele →
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>KDV hariç. Kurulum/kablaj dahil değildir.</p>
              </div>
            ))}
          </div>
          )}

          {/* KENDİ SEÇİMİ — tek teklif tablosu */}
          {teklifMode === 'kendi' && (
          <div className="rounded-2xl p-5 md:p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <h3 className="text-lg font-black mb-4" style={{ color: 'var(--text-primary)' }}>Seçtiğiniz Ürünler</h3>
            <div className="space-y-2 mb-4">
              {seciliItems.length === 0 && (
                <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Henüz ürün seçilmedi. Önceki adımdan ürün ekleyin.</p>
              )}
              {seciliItems.map((it, i) => (
                <div key={i} className="flex items-center justify-between py-2"
                  style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex-1 pr-3">
                    <p className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>{it.name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {it.qty} × {fmtTl(it.unitUsd * kur)}
                    </p>
                  </div>
                  <p className="text-[14px] font-black" style={{ color: 'var(--text-primary)' }}>
                    {fmtTl(it.qty * it.unitUsd * kur)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '2px solid var(--border)' }}>
              <span className="text-[15px] font-bold" style={{ color: 'var(--text-primary)' }}>Genel Toplam</span>
              <span className="text-2xl font-black" style={{ color: '#F4821F' }}>{fmtTl(seciliTotal)}</span>
            </div>
            <p className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>KDV hariç. Kurulum/kablaj dahil değildir.</p>
          </div>
          )}

          {/* EK AKSESUARLAR */}
          {aksesuarListesi.length > 0 && (
            <div className="rounded-2xl p-5 md:p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <h3 className="text-[15px] font-black mb-1" style={{ color: 'var(--text-primary)' }}>Ek Aksesuarlar</h3>
              <p className="text-[12px] mb-4" style={{ color: 'var(--text-muted)' }}>
                {sistem === 'ip'
                  ? 'PoE switch, adaptör, lisans gibi ek ürünleri teklifinize ekleyin.'
                  : 'Yağmurluk, çevirme aparatı, kasa gibi ek ürünleri teklifinize ekleyin.'}
              </p>
              <div className="space-y-2">
                {aksesuarListesi.map(a => {
                  const qty = aksesuarlar[a.id] || 0
                  return (
                    <div key={a.id} className="flex items-center gap-3 py-2"
                      style={{ borderBottom: '1px solid var(--border)' }}>
                      <img src={a.mainImageUrl || ''} alt="" className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                        style={{ border: '1px solid var(--border)' }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                          {a.name.length > 40 ? a.name.slice(0, 40) + '…' : a.name}
                        </p>
                        <p className="text-[11px]" style={{ color: '#F4821F' }}>{fmtTl(a.minPriceUsd * kur)}</p>
                      </div>
                      <div className="flex items-center rounded-lg overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border)' }}>
                        <button onClick={() => setAksesuarQty(a.id, qty - 1)}
                          className="px-2.5 py-2" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-[13px] font-bold min-w-[36px] text-center" style={{ color: 'var(--text-primary)' }}>{qty}</span>
                        <button onClick={() => setAksesuarQty(a.id, qty + 1)}
                          className="px-2.5 py-2" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              {aksesuarTotal > 0 && (
                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '2px solid var(--border)' }}>
                  <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>Aksesuar Toplamı</span>
                  <span className="text-[16px] font-black" style={{ color: '#F4821F' }}>{fmtTl(aksesuarTotal)}</span>
                </div>
              )}
            </div>
          )}

          {/* İstanbul kurulum notu */}
          {sehir.toLowerCase().includes('istanbul') && (
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
              <MapPin size={20} style={{ color: '#10B981' }} />
              <div>
                <p className="font-bold text-[14px]" style={{ color: 'var(--text-primary)' }}>İstanbul'da kurulum ekibimiz hazır!</p>
                <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Projeniz için keşif ve montaj desteği sağlayabiliriz.</p>
              </div>
            </div>
          )}

          {/* Lead formu */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={18} style={{ color: '#F4821F' }} />
              <h3 className="font-black text-[15px]" style={{ color: 'var(--text-primary)' }}>Size Özel İskontolu Fiyat Alın</h3>
            </div>
            <p className="text-[13px] mb-4" style={{ color: 'var(--text-muted)' }}>
              Bilgilerinizi bırakın, en kısa sürede WhatsApp veya e-posta ile özel teklifinizi iletelim.
            </p>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <input value={adSoyad} onChange={e => setAdSoyad(e.target.value)} placeholder="Ad Soyad"
                className="px-4 py-3 rounded-xl text-[14px]"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
              <input value={telefon} onChange={e => setTelefon(e.target.value)} placeholder="Telefon" type="tel"
                className="px-4 py-3 rounded-xl text-[14px]"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
              <input value={eposta} onChange={e => setEposta(e.target.value)} placeholder="E-posta" type="email"
                className="px-4 py-3 rounded-xl text-[14px]"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={handleWhatsapp}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[14px] text-white transition-all hover:scale-[1.02]"
                style={{ background: '#25D366' }}>
                <MessageCircle size={18} /> WhatsApp ile Gönder
              </button>
              <button onClick={handleEposta}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[14px] transition-all"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                <Mail size={18} /> E-posta ile Gönder
              </button>
              <button onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[14px] transition-all"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                <Download size={18} /> PDF / Yazdır
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Navigasyon ===== */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          className="flex items-center gap-1 px-5 py-3 rounded-xl font-bold text-[14px] transition-all disabled:opacity-40"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          <ChevronLeft size={18} /> Geri
        </button>

        {step < 4 && step !== 2 ? (
          <button onClick={() => canNext && setStep(s => s + 1)}
            disabled={!canNext}
            className="flex items-center gap-1 px-6 py-3 rounded-xl font-bold text-[14px] text-white transition-all hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
            style={{ background: 'linear-gradient(135deg,#F4821F,#ff9f47)' }}>
            {step === 3 ? 'Teklifi Oluştur' : 'Devam Et'} <ChevronRight size={18} />
          </button>
        ) : step === 4 ? (
          <span className="text-[13px] font-bold" style={{ color: 'var(--text-muted)' }}>
            {teklifMode === 'kendi' ? `Toplam: ${fmtTl(seciliTotal)}` : 'Size en uygun paketi seçin'}
          </span>
        ) : <span />}
      </div>
    </div>
  )

  /* ---- Aksiyonlar ---- */
  function buildSummaryText() {
    const bugun = new Date()
    const sonGecerlilik = new Date(bugun.getTime() + 7 * 24 * 60 * 60 * 1000)
    const lines = [
      'SMARTDIAFON — PROJE TEKLİFİ',
      `Tarih: ${bugun.toLocaleDateString('tr-TR')}`,
      `Geçerlilik: ${sonGecerlilik.toLocaleDateString('tr-TR')} tarihine kadar`,
      `Altyapı: ${sistem === 'ip' ? 'IP İnterkom (Cat5/Cat6)' : 'Multibus (DT8)'}`,
      `Daire: ${daire} | Blok: ${blok} | Kapı: ${kapi}`,
      sehir ? `Şehir: ${sehir}` : '',
      '',
      'Paketler:',
      ...paketler.map(p => `- ${p.label}: ${fmtTl(p.totalTl)} (KDV hariç)`),
      '',
      adSoyad ? `Ad: ${adSoyad}` : '',
      telefon ? `Tel: ${telefon}` : '',
      eposta ? `E-posta: ${eposta}` : '',
    ].filter(Boolean)
    return lines.join('\n')
  }

  function handleWhatsapp() {
    const text = encodeURIComponent(buildSummaryText())
    window.open(`https://wa.me/905550000000?text=${text}`, '_blank')
  }
  function handleEposta() {
    const subject = encodeURIComponent('Smartdiafon Proje Teklifi')
    const body = encodeURIComponent(buildSummaryText())
    window.location.href = `mailto:info@smartdiafon.com.tr?subject=${subject}&body=${body}`
  }
  function handlePrint() {
    window.print()
  }
}

/* ---------- Yardımcı bileşenler ---------- */
function Counter({ label, value, setValue, min = 0, hint }: {
  label: string; value: number; setValue: (n: number) => void; min?: number; hint?: string
}) {
  return (
    <div>
      <label className="block text-[13px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{label}</label>
      <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <button onClick={() => setValue(Math.max(min, value - 1))}
          className="px-3 py-3 transition-colors" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
          <Minus size={16} />
        </button>
        <input type="number" value={value} min={min}
          onChange={e => setValue(Math.max(min, parseInt(e.target.value) || min))}
          className="flex-1 text-center py-3 text-[15px] font-bold w-full"
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: 'none', outline: 'none' }} />
        <button onClick={() => setValue(value + 1)}
          className="px-3 py-3 transition-colors" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
          <Plus size={16} />
        </button>
      </div>
      {hint && <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>{hint}</p>}
    </div>
  )
}

function Toggle({ label, desc, checked, onChange }: {
  label: string; desc: string; checked: boolean; onChange: (b: boolean) => void
}) {
  return (
    <button onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between p-4 rounded-xl transition-all text-left"
      style={{
        background: checked ? 'rgba(244,130,31,0.08)' : 'var(--bg-secondary)',
        border: checked ? '1px solid #F4821F' : '1px solid var(--border)',
      }}>
      <div>
        <p className="font-bold text-[14px]" style={{ color: 'var(--text-primary)' }}>{label}</p>
        <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{desc}</p>
      </div>
      <div className="w-11 h-6 rounded-full flex-shrink-0 transition-all relative"
        style={{ background: checked ? '#F4821F' : 'var(--border)' }}>
        <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all"
          style={{ left: checked ? '22px' : '2px' }} />
      </div>
    </button>
  )
}