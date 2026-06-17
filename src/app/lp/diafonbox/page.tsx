'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import { useCartStore } from '@/lib/store/cart'
import {
  Smartphone, Wifi, Shield, Check, ChevronRight, Star,
  ShoppingCart, Camera, Images, Loader2, ArrowRight, X, ChevronLeft
} from 'lucide-react'

interface Product {
  id: string
  slug: string
  name: string
  shortDesc?: string
  mainImageUrl?: string
  minPriceUsd?: number
  badge?: string
  originalPrice?: number
}

const FAYDALAR = [
  { icon: Smartphone, title: 'Telefondan Kapı Aç', desc: 'Dışarıdayken bile misafirinize kapıyı açın.' },
  { icon: Wifi, title: 'Kolay Kurulum', desc: 'Mevcut sisteminize bağlanır, kablo değişimi yok.' },
  { icon: Camera, title: 'Görüntülü Görüşme', desc: 'Kim geldiğini görerek konuşun.' },
  { icon: Shield, title: '2 Yıl Garanti', desc: 'Tüm Multitek ürünlerinde geçerli.' },
]

export default function DiafonBoxLP() {
  const router = useRouter()
  const { addCatalogItem } = useCartStore()
  const [kur, setKur] = useState(45)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Uyumluluk test state
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [testLoading, setTestLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Promise.all([
      api.get('/api/catalog/products').catch(() => ({ data: { data: [] } })),
      api.get('/api/settings/public').catch(() => ({ data: { data: { usd_kur: '45' } } })),
    ]).then(([prodRes, settRes]) => {
      const prods: Product[] = prodRes.data.data || []
      const filtered = prods.filter(p =>
        p.name?.toLowerCase().includes('diafon') ||
        p.name?.toLowerCase().includes('interkom') ||
        p.name?.toLowerCase().includes('box')
      ).slice(0, 8)
      setProducts(filtered.length > 0 ? filtered : prods.slice(0, 8))
      setKur(parseFloat(settRes.data.data?.usd_kur || '45'))
    }).finally(() => setLoading(false))
  }, [])

  const handleFile = (f: File | null) => {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setTestResult(null)
  }

  const analizEt = async () => {
    if (!file) return
    setTestLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const r = await api.post('/api/uyumluluk/analyze', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setTestResult(r.data)
    } catch {
      setTestResult({ compatible: false, message: 'Analiz yapılamadı, lütfen tekrar deneyin.' })
    } finally {
      setTestLoading(false)
    }
  }

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' })
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #1a0a00, #2d1200)', padding: '60px 20px 40px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(230,57,70,0.15)', border: '1px solid rgba(230,57,70,0.3)', borderRadius: 20, padding: '4px 14px', marginBottom: 16 }}>
            <Wifi size={12} color="#E63946" />
            <span style={{ color: '#E63946', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>SMARTDIAFON</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>
            Eski Diyafonunu<br />
            <span style={{ color: '#E63946' }}>Akıllı Telefona</span> Bağla
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
            DiafonBox ile mevcut sisteminizi değiştirmeden kapınızı telefondan yönetin.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#uyumluluk"
              style={{ background: 'linear-gradient(135deg, #E63946, #C1272D)', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Uyumluluk Testi <ArrowRight size={16} />
            </a>
            <a href="#urunler"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
              Ürünleri Gör
            </a>
          </div>
        </div>
      </div>

      {/* FAYDALAR */}
      <div style={{ padding: '40px 20px', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {FAYDALAR.map((f, i) => (
            <div key={i} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: '16px 14px' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(230,57,70,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <f.icon size={18} color="#E63946" />
              </div>
              <p style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{f.title}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* UYUMLULUK TESTİ */}
      <div id="uyumluluk" style={{ padding: '40px 20px', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 20, padding: '24px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 900, marginBottom: 6 }}>
              🔍 Uyumluluk Testi
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
              Diyafonunuzun fotoğrafını çekin, DiafonBox ile uyumlu mu öğrenin.
            </p>
          </div>

          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" style={{ display: 'none' }}
            onChange={e => handleFile(e.target.files?.[0] || null)} />
          <input ref={galleryRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => handleFile(e.target.files?.[0] || null)} />

          {!preview ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => fileRef.current?.click()}
                style={{ flex: 1, background: '#2a2a2a', border: '1.5px dashed #3a3a3a', borderRadius: 14, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <Camera size={24} color="#E63946" />
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Kamera</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Fotoğraf çek</span>
              </button>
              <button onClick={() => galleryRef.current?.click()}
                style={{ flex: 1, background: '#2a2a2a', border: '1.5px dashed #3a3a3a', borderRadius: 14, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <Images size={24} color="#2563EB" />
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Galeri</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Galeriden seç</span>
              </button>
            </div>
          ) : (
            <div>
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
                <img src={preview} alt="Diyafon" style={{ width: '100%', maxHeight: 200, objectFit: 'contain', background: '#000' }} />
                <button onClick={() => { setFile(null); setPreview(''); setTestResult(null) }}
                  style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
              </div>

              {!testResult && (
                <button onClick={analizEt} disabled={testLoading}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #E63946, #C1272D)', border: 'none', color: '#fff', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: testLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: testLoading ? 0.7 : 1 }}>
                  {testLoading ? <><Loader2 size={16} className="animate-spin" /> Analiz ediliyor...</> : '🔍 Uyumluluk Analizi Yap'}
                </button>
              )}

              {testResult && (
                <div style={{ background: testResult.compatible ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${testResult.compatible ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 14, padding: '16px' }}>
                  <p style={{ color: testResult.compatible ? '#10B981' : '#EF4444', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
                    {testResult.compatible ? '✅ Uyumlu!' : '❌ Uyumsuz'}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{testResult.message}</p>
                  {testResult.compatible && (
                    <a href="#urunler"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, background: '#E63946', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                      Ürünleri İncele <ArrowRight size={14} />
                    </a>
                  )}
                  {!testResult.compatible && (
                    <Link href="/iletisim"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                      Uzman Desteği Al <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ÜRÜNLER - horizontal scroll */}
      <div id="urunler" style={{ padding: '20px 0 40px' }}>
        <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 900 }}>Ürünler</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => scroll('left')}
              style={{ width: 32, height: 32, borderRadius: 8, background: '#2a2a2a', border: '1px solid #3a3a3a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll('right')}
              style={{ width: 32, height: 32, borderRadius: 8, background: '#2a2a2a', border: '1px solid #3a3a3a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <Loader2 size={24} color="#E63946" className="animate-spin" />
          </div>
        ) : (
          <div ref={scrollRef}
            style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 20px 12px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            className="hide-scrollbar">
            {products.map(p => {
              const price = p.minPriceUsd ? Math.round(p.minPriceUsd * kur * 1.2) : null
              const origPrice = p.originalPrice ? Math.round(Number(p.originalPrice) * kur * 1.2) : null
              const discPct = price && origPrice && origPrice > price ? Math.round((1 - price / origPrice) * 100) : 0
              return (
                <div key={p.id}
                  style={{ minWidth: 200, maxWidth: 200, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, overflow: 'hidden', scrollSnapAlign: 'start', flexShrink: 0 }}>
                  <div style={{ position: 'relative', height: 160, background: '#111' }}>
                    {p.mainImageUrl
                      ? <img src={p.mainImageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 32 }}>📡</div>
                    }
                    {discPct > 0 && (
                      <span style={{ position: 'absolute', top: 8, left: 8, background: '#DC2626', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>-%{discPct}</span>
                    )}
                    {p.badge && (
                      <span style={{ position: 'absolute', top: 8, left: 8, background: 'linear-gradient(135deg, #ef4444, #ec4899)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>⚡ {p.badge}</span>
                    )}
                  </div>
                  <div style={{ padding: '12px' }}>
                    <p style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{p.name}</p>
                    {price && (
                      <div style={{ marginBottom: 10 }}>
                        {origPrice && origPrice > price && (
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textDecoration: 'line-through' }}>₺{origPrice.toLocaleString('tr-TR')}</p>
                        )}
                        <p style={{ color: '#E63946', fontSize: 16, fontWeight: 900 }}>₺{price.toLocaleString('tr-TR')}</p>
                      </div>
                    )}
                    <Link href={`/urun/${p.slug}`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(230,57,70,0.15)', color: '#E63946', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(230,57,70,0.3)' }}>
                      İncele <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* SOSYAL KANIT */}
      <div style={{ padding: '20px 20px 40px', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 20, padding: 20 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />)}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
            "DiafonBox'u taktıktan sonra artık kapıyı telefonumdan açıyorum. Kurulumu 30 dakika sürdü, çok memnunum."
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>— Mehmet K., İstanbul</p>
        </div>
      </div>

      {/* STICKY CTA */}
      <div style={{ position: 'sticky', bottom: 0, background: 'linear-gradient(0deg, #0a0a0a, transparent)', padding: '20px 20px 24px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', gap: 10 }}>
          <a href="#uyumluluk"
            style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 13, textDecoration: 'none', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
            Test Et
          </a>
          <Link href="/katalog"
            style={{ flex: 2, background: 'linear-gradient(135deg, #E63946, #C1272D)', color: '#fff', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 13, textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(230,57,70,0.4)' }}>
            <ShoppingCart size={16} /> Ürünlere Git
          </Link>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}