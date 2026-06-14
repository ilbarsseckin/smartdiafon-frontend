'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { 
  Building2, 
  DoorOpen, 
  Zap, 
  Loader2, 
  ArrowRight, 
  Calculator, 
  Cable, 
  Wifi, 
  Server,
  RotateCcw,
  ChevronRight
} from 'lucide-react'

// ─── Tipler ───
interface ApiProduct {
  id: string
  name: string
  slug: string
  categorySlug: string
  minPriceUsd: number
}

interface SistemTanimi {
  key: 'dt8' | 'ip' | 'linux'
  ad: string
  kablo: string
  icon: React.ElementType
  monSlug: string
  panSlug: string
  monFilter: (name: string) => boolean
  panFilter: (name: string) => boolean
}

interface HesapSonucu {
  key: string
  ad: string
  kablo: string
  icon: React.ElementType
  fiyat: number
}

// ─── Sistem Tanımları ───
const SISTEMLER: SistemTanimi[] = [
  {
    key: 'dt8',
    ad: 'Multibus',
    kablo: 'DT8 Kablo',
    icon: Cable,
    monSlug: 'multibus-ev-ici-monitor',
    panSlug: 'multibus-kapi-paneli',
    monFilter: (n: string) => 
      n.includes('MONITOR') && 
      !n.includes('APARAT') && 
      !n.includes('KASA'),
    panFilter: (n: string) => 
      n.includes('KAPI PANELI') && 
      !n.includes('YAGMURLUK') && 
      !n.includes('CEVIRME') && 
      !n.includes('APARAT') && 
      !n.includes('KASA') && 
      !n.includes('ISIMLIK'),
  },
  {
    key: 'ip',
    ad: 'IP İnterkom',
    kablo: 'Cat5 / Cat6',
    icon: Wifi,
    monSlug: 'ev-ici-monitor',
    panSlug: 'ip-apartman-kapi-panelleri',
    monFilter: (n: string) => n.startsWith('VIP') && n.includes('MONITOR'),
    panFilter: (n: string) => n.startsWith('DIP') && n.includes('KAPI PANELI'),
  },
  {
    key: 'linux',
    ad: 'Linux İnterkom',
    kablo: 'Cat5 / Cat6',
    icon: Server,
    monSlug: 'linux-ev-i-ci-monitor',
    panSlug: 'linux-kapi-paneli',
    monFilter: (n: string) => n.startsWith('LIM') && n.includes('MONITOR'),
    panFilter: (n: string) => 
      n.startsWith('LIK') && 
      n.includes('KAPI PANELI') && 
      !n.includes('APARAT') && 
      !n.includes('YAGMURLUK'),
  },
]

// ─── Yardımcı Fonksiyonlar ───
const formatTl = (n: number): string => 
  '₺' + Math.round(n).toLocaleString('tr-TR')

const PROGRESS_MESAJLARI = [
  { threshold: 0, mesaj: 'Proje bilgileri alınıyor...' },
  { threshold: 25, mesaj: 'Uygun ürünler araştırılıyor...' },
  { threshold: 50, mesaj: 'Güncel fiyatlar hesaplanıyor...' },
  { threshold: 75, mesaj: 'Sistemler karşılaştırılıyor...' },
  { threshold: 95, mesaj: 'Teklifiniz hazırlanıyor...' },
]

const getProgressMesaj = (progress: number): string => {
  for (let i = PROGRESS_MESAJLARI.length - 1; i >= 0; i--) {
    if (progress >= PROGRESS_MESAJLARI[i].threshold) {
      return PROGRESS_MESAJLARI[i].mesaj
    }
  }
  return PROGRESS_MESAJLARI[0].mesaj
}

// ─── Bileşen ───
export default function HizliTeklif() {
  const router = useRouter()
  
  // State
  const [daire, setDaire] = useState('')
  const [kapi, setKapi] = useState('1')
  const [kur, setKur] = useState(45)
  const [products, setProducts] = useState<ApiProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [sonuc, setSonuc] = useState<HesapSonucu[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Veri çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, productsRes] = await Promise.all([
          api.get('/api/settings/public'),
          api.get('/api/catalog/products?size=500'),
        ])

        const settingsData = settingsRes.data
        const productsData = productsRes.data

        const k = parseFloat(settingsData?.data?.usd_kur || '45')
        setKur(isNaN(k) ? 45 : k)

        const mappedProducts = (productsData?.data || []).map((x: any) => ({
          id: x.id,
          name: x.name,
          slug: x.slug,
          categorySlug: x.categorySlug,
          minPriceUsd: x.minPriceUsd || 0,
        }))

        setProducts(mappedProducts)
      } catch (err) {
        setError('Fiyat bilgileri yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.')
        console.error('Veri çekme hatası:', err)
      }
    }

    fetchData()
  }, [])

  // En ucuz ürün bulma
  const enUcuz = useCallback((slug: string, filter: (n: string) => boolean): number => {
    const list = products.filter(
      p => p.categorySlug === slug && 
           filter(p.name.toUpperCase()) && 
           p.minPriceUsd > 0
    )
    
    if (list.length === 0) return 0
    return Math.min(...list.map(p => p.minPriceUsd))
  }, [products])

  // Hesaplama
  const handleHesapla = useCallback(() => {
    const d = parseInt(daire) || 0
    const k = parseInt(kapi) || 1
    
    if (d <= 0) return

    setLoading(true)
    setProgress(0)
    setSonuc(null)
    setError(null)

    let currentProgress = 0
    
    const timer = setInterval(() => {
      currentProgress += Math.random() * 9 + 3
      
      if (currentProgress >= 100) {
        currentProgress = 100
        setProgress(100)
        clearInterval(timer)
        
        setTimeout(() => {
          const hesap = SISTEMLER.map(s => {
            const mon = enUcuz(s.monSlug, s.monFilter)
            const pan = enUcuz(s.panSlug, s.panFilter)
            const fiyat = (mon * d + pan * k) * kur
            
            return {
              key: s.key,
              ad: s.ad,
              kablo: s.kablo,
              icon: s.icon,
              fiyat,
            }
          })
          .filter(x => x.fiyat > 0)
          .sort((a, b) => a.fiyat - b.fiyat)

          if (hesap.length === 0) {
            setError('Seçilen kriterlere uygun ürün bulunamadı.')
            setLoading(false)
            return
          }

          setSonuc(hesap)
          setLoading(false)
        }, 500)
      } else {
        setProgress(Math.round(currentProgress))
      }
    }, 300)
  }, [daire, kapi, kur, enUcuz])

  // Sıfırlama
  const handleReset = useCallback(() => {
    setSonuc(null)
    setProgress(0)
    setDaire('')
    setKapi('1')
    setError(null)
  }, [])

  // Detaylı teklife yönlendirme
  const goToDetail = useCallback((sistemKey: string) => {
    const d = parseInt(daire) || 0
    const k = parseInt(kapi) || 1
    const sistem = sistemKey === 'linux' ? 'linux' : sistemKey
    router.push(`/teklif?daire=${d}&kapi=${k}&sistem=${sistem}&auto=1`)
  }, [daire, kapi, router])

  // Form geçerliliği
  const isFormValid = daire !== '' && parseInt(daire) > 0

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Başlık Alanı */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50">
              <Zap size={16} className="text-red-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Hızlı Teklif
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            3 Sistemi Karşılaştırın, Size Uygun Olanı Seçin
          </h2>
          
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            Daire ve kapı sayınızı girin — Multibus, IP ve Linux sistemleri için yaklaşık fiyatları anında görün.
          </p>
        </div>

        {/* Ana Kart */}
        <div className="bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-200 p-5 md:p-8">
          
          {/* Hata Mesajı */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          {!loading && !sonuc && (
            <div className="max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Daire Sayısı */}
                <div className="relative">
                  <Building2 
                    size={17} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    value={daire}
                    onChange={(e) => setDaire(e.target.value)}
                    placeholder="Daire sayısı"
                    min={1}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Kapı Sayısı */}
                <div className="relative">
                  <DoorOpen 
                    size={17} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    value={kapi}
                    onChange={(e) => setKapi(e.target.value)}
                    placeholder="Kapı sayısı"
                    min={1}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleHesapla}
                disabled={!isFormValid}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed bg-gradient-to-r from-red-600 to-orange-400"
              >
                <Calculator size={18} />
                Sistemleri Karşılaştır
                <ArrowRight size={16} />
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Görüntüsüz diyafonunuzu görüntülüye çevirmek için de uygundur.
              </p>
            </div>
          )}

          {/* YÜKLENİYOR */}
          {loading && (
            <div className="py-8 max-w-xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 size={20} className="animate-spin text-red-600" />
                <span className="text-sm font-semibold text-gray-900">
                  {getProgressMesaj(progress)}
                </span>
              </div>
              
              <div className="h-2.5 rounded-full overflow-hidden bg-gray-200">
                <div 
                  className="h-full rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-red-600 to-orange-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex justify-end mt-2">
                <span className="text-sm font-bold text-red-600">
                  %{progress}
                </span>
              </div>
            </div>
          )}

          {/* SONUÇ */}
          {sonuc && sonuc.length > 0 && (
            <div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {sonuc.map((s, index) => {
                  const Icon = s.icon
                  const isCheapest = index === 0
                  
                  return (
                    <div 
                      key={s.key}
                      className={`relative rounded-2xl p-5 transition-all hover:shadow-md ${
                        isCheapest 
                          ? 'bg-white border-2 border-red-500 shadow-lg' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      {/* En Uygun Rozeti */}
                      {isCheapest && (
                        <span className="absolute -top-3 left-4 px-3 py-1 rounded-full text-[10px] font-black bg-red-600 text-white shadow-sm">
                          EN UYGUN
                        </span>
                      )}

                      {/* Başlık */}
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={20} className="text-red-600" />
                        <h3 className="text-base font-bold text-gray-900">
                          {s.ad}
                        </h3>
                      </div>

                      {/* Kablo Bilgisi */}
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 border border-gray-200 mb-4">
                        <Cable size={12} />
                        {s.kablo}
                      </div>

                      {/* Fiyat */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Yaklaşık başlangıç fiyatı</p>
                        <p className="text-2xl font-black text-red-600">
                          {formatTl(s.fiyat)}
                        </p>
                      </div>

                      {/* Detay Butonu */}
                      <button
                        onClick={() => goToDetail(s.key)}
                        className={`w-full flex items-center justify-center gap-1.5 py-3 rounded-lg font-bold text-xs transition-all ${
                          isCheapest
                            ? 'bg-gradient-to-r from-red-600 to-orange-400 text-white hover:shadow-md'
                            : 'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        Detaylı Teklif
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Alt Bilgi */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  * Yaklaşık fiyatlardır. Detaylı teklif için sistem seçin.
                </p>
                
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors"
                >
                  <RotateCcw size={14} />
                  Yeniden hesapla
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}