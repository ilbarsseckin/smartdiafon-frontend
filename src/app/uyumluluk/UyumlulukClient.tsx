'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import {
  Upload, Loader2, Check, X, Camera, Images, ArrowRight, ArrowLeft,
  Sparkles, ShieldCheck, Phone, RotateCcw, Info,
} from 'lucide-react'

const WHATSAPP = '905550000000' // TODO: gercek numara

interface AnalizSonuc {
  durum: string
  baslik: string
  mesaj: string
  oneriSlug: string[]
  aiAnaliz?: { goruntulu?: string; marka?: string; cihazTipi?: string; aciklama?: string; aiHata?: boolean }
}

export default function UyumlulukClient() {
  const fileRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [goruntulu, setGoruntulu] = useState('')
  const [kabloTel, setKabloTel] = useState('')
  const [daireSayisi, setDaireSayisi] = useState('')
  const [marka, setMarka] = useState('')
  const [loading, setLoading] = useState(false)
  const [sonuc, setSonuc] = useState<AnalizSonuc | null>(null)
  const [oneriUrunler, setOneriUrunler] = useState<any[]>([])

  // Ana sayfadan gelen fotografi yakala
  useEffect(() => {
    try {
      const dataUrl = sessionStorage.getItem('uyumluluk_foto')
      const ad = sessionStorage.getItem('uyumluluk_foto_ad') || 'foto.jpg'
      if (dataUrl) {
        fetch(dataUrl).then(r => r.blob()).then(blob => {
          const f = new File([blob], ad, { type: blob.type })
          setFile(f)
          setPreview(dataUrl)
          setStep(2)
        })
        sessionStorage.removeItem('uyumluluk_foto')
        sessionStorage.removeItem('uyumluluk_foto_ad')
      }
    } catch {}
  }, [])

  const handleFile = (f: File | null) => {
    if (!f) return
    if (f.size > 10 * 1024 * 1024) { toast.error('Fotoğraf 10 MB\'dan küçük olmalı'); return }
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const analizEt = async () => {
    if (!file) { toast.error('Önce fotoğraf yükleyin'); return }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      if (goruntulu) fd.append('goruntulu', goruntulu)
      if (kabloTel) fd.append('kabloTel', kabloTel)
      if (daireSayisi) fd.append('daireSayisi', daireSayisi)
      if (marka) fd.append('marka', marka)

      const res = await api.post('/api/uyumluluk/analiz', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const data: AnalizSonuc = res.data.data
      setSonuc(data)
      setStep(3)

      if (data.oneriSlug?.length > 0) {
        const urunler = await Promise.all(
          data.oneriSlug.map(slug =>
            api.get(`/api/catalog/products/${slug}`).then(r => r.data.data).catch(() => null)
          )
        )
        setOneriUrunler(urunler.filter(Boolean))
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Analiz yapılamadı, tekrar deneyin')
    } finally {
      setLoading(false)
    }
  }

  const sifirla = () => {
    setStep(1); setFile(null); setPreview(''); setGoruntulu(''); setKabloTel('')
    setDaireSayisi(''); setMarka(''); setSonuc(null); setOneriUrunler([])
  }

  const waMesaj = () => {
    const txt = `Merhaba, mevcut diyafonum için uyumluluk danışmanlığı istiyorum.%0A%0A` +
      `Görüntülü: ${goruntulu || 'belirtilmedi'}%0AKablo: ${kabloTel || 'belirtilmedi'}%0A` +
      `Daire: ${daireSayisi || 'belirtilmedi'}%0AMarka: ${marka || 'belirtilmedi'}`
    window.open(`https://wa.me/${WHATSAPP}?text=${txt}`, '_blank')
  }

  const durumRenk = sonuc?.durum === 'uyumlu' ? '#16a34a'
    : sonuc?.durum === 'yukseltme' ? '#DC2626'
    : sonuc?.durum === 'uzman' ? '#3b82f6' : '#6b7280'

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="px-4 pt-10 pb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(244,130,31,0.1)', border: '1px solid rgba(244,130,31,0.25)' }}>
            <Sparkles size={14} style={{ color: '#DC2626' }} />
            <span className="text-[12px] font-bold" style={{ color: '#DC2626' }}>Yapay Zeka Destekli</span>
          </div>
          <h1 className="text-[26px] md:text-[34px] font-black tracking-[-1px] mb-3" style={{ color: 'var(--text-primary)' }}>
            Diyafonunuz Uyumlu mu?
          </h1>
          <p className="text-[14px] max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Mevcut diyafonunuzun fotoğrafını yükleyin, birkaç soruyu yanıtlayın.
            DiafonBox veya Akıllı Diafon ile uyumlu olup olmadığını anında öğrenin.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all"
                  style={{
                    background: step >= n ? '#DC2626' : 'var(--bg-card)',
                    color: step >= n ? '#fff' : 'var(--text-muted)',
                    border: step >= n ? 'none' : '1px solid var(--border)',
                  }}>
                  {step > n ? <Check size={15} /> : n}
                </div>
                {n < 3 && <div className="w-10 h-0.5" style={{ background: step > n ? '#DC2626' : 'var(--border)' }} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <h2 className="text-[18px] font-black mb-1" style={{ color: 'var(--text-primary)' }}>1. Diyafonunuzun Fotoğrafı</h2>
              <p className="text-[13px] mb-5" style={{ color: 'var(--text-muted)' }}>
                Evinizdeki iç ünitenin (monitör/telefon) net bir fotoğrafını çekin veya galeriden seçin.
              </p>

              {/* Kamera için ayrı input */}
              <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden"
                onChange={e => handleFile(e.target.files?.[0] || null)} />
              {/* Galeri için ayrı input — capture olmadan */}
              <input ref={galleryRef} type="file" accept="image/*" className="hidden"
                onChange={e => handleFile(e.target.files?.[0] || null)} />

              {!preview ? (
                <div className="flex gap-3">
                  <button onClick={() => fileRef.current?.click()}
                    className="flex-1 rounded-xl border-2 border-dashed py-8 flex flex-col items-center gap-2 transition-all hover:border-[#DC2626]"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(244,130,31,0.1)' }}>
                      <Camera size={22} style={{ color: '#DC2626' }} />
                    </div>
                    <p className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>Kamera</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Fotoğraf çek</p>
                  </button>
                  <button onClick={() => galleryRef.current?.click()}
                    className="flex-1 rounded-xl border-2 border-dashed py-8 flex flex-col items-center gap-2 transition-all hover:border-[#DC2626]"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.1)' }}>
                      <Images size={22} style={{ color: '#2563EB' }} />
                    </div>
                    <p className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>Galeri</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Galeriden seç</p>
                  </button>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <img src={preview} alt="Diyafon" className="w-full max-h-72 object-contain bg-black/5" />
                  <button onClick={() => { setFile(null); setPreview('') }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ background: 'rgba(0,0,0,0.6)' }}>
                    <X size={18} />
                  </button>
                </div>
              )}

              <button onClick={() => setStep(2)} disabled={!file}
                className="w-full mt-5 flex items-center justify-center gap-2 py-3.5 text-[14px] font-bold text-white rounded-xl transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #DC2626, #e07010)' }}>
                Devam Et <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-2xl p-6 space-y-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div>
                <h2 className="text-[18px] font-black mb-1" style={{ color: 'var(--text-primary)' }}>2. Birkaç Soru</h2>
                <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Bu bilgiler kesin sonuç için gereklidir.</p>
              </div>

              <SoruBlok label="Mevcut diyafonunuz görüntülü mü?" deger={goruntulu} setDeger={setGoruntulu}
                secenekler={[['evet', 'Görüntülü (ekranlı)'], ['hayir', 'Sesli (ekransız)'], ['belirsiz', 'Bilmiyorum']]} />

              <SoruBlok label="Cihaza gelen kablo kaç telli?" deger={kabloTel} setDeger={setKabloTel}
                secenekler={[['2', '2 telli'], ['4', '4+ telli'], ['belirsiz', 'Bilmiyorum']]} />

              <SoruBlok label="Binada kaç daire var?" deger={daireSayisi} setDeger={setDaireSayisi}
                secenekler={[['1', 'Tek daire/villa'], ['30', '2-30 daire'], ['100', '30-100 daire'], ['200', '100+ daire']]} />

              <SoruBlok label="Mevcut markayı biliyor musunuz?" deger={marka} setDeger={setMarka}
                secenekler={[['multitek', 'Multitek'], ['audio', 'Audio'], ['diger', 'Diğer'], ['belirsiz', 'Bilmiyorum']]} />

              <div className="flex gap-2 pt-2">
                <button onClick={() => setStep(1)}
                  className="px-4 py-3.5 text-[14px] font-bold rounded-xl flex items-center gap-1.5"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  <ArrowLeft size={16} /> Geri
                </button>
                <button onClick={analizEt} disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[14px] font-bold text-white rounded-xl transition-all disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #e07010)' }}>
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Analiz ediliyor...</> : <><Sparkles size={16} /> Uyumluluğu Kontrol Et</>}
                </button>
              </div>
            </div>
          )}

          {step === 3 && sonuc && (
            <div className="space-y-4">
              <div className="rounded-2xl p-6 text-center" style={{ background: 'var(--bg-card)', border: `2px solid ${durumRenk}` }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${durumRenk}20` }}>
                  {sonuc.durum === 'uyumlu' ? <Check size={30} style={{ color: durumRenk }} />
                    : sonuc.durum === 'uzman' ? <Phone size={28} style={{ color: durumRenk }} />
                    : <Info size={28} style={{ color: durumRenk }} />}
                </div>
                <h2 className="text-[22px] font-black mb-2" style={{ color: 'var(--text-primary)' }}>{sonuc.baslik}</h2>
                <p className="text-[14px] leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{sonuc.mesaj}</p>
                {sonuc.aiAnaliz?.aciklama && !sonuc.aiAnaliz?.aiHata && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px]"
                    style={{ background: 'rgba(244,130,31,0.08)', color: 'var(--text-muted)' }}>
                    <Sparkles size={11} style={{ color: '#DC2626' }} /> AI gözlemi: {sonuc.aiAnaliz.aciklama}
                  </div>
                )}
              </div>

              {oneriUrunler.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <h3 className="text-[15px] font-black mb-4" style={{ color: 'var(--text-primary)' }}>Size Önerilen Ürünler</h3>
                  <div className="space-y-3">
                    {oneriUrunler.map(u => (
                      <Link key={u.id} href={`/urun/${u.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-md"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#f3f4f6' }}>
                          {u.images?.[0]?.url && <img src={u.images[0].url} alt={u.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold truncate" style={{ color: 'var(--text-primary)' }}>{u.name}</p>
                          <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>İncele →</p>
                        </div>
                        <ArrowRight size={16} style={{ color: '#DC2626' }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/teklif"
                  className="flex items-center justify-center gap-2 py-3.5 text-[14px] font-bold text-white rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #e07010)' }}>
                  Detaylı Teklif Al <ArrowRight size={16} />
                </Link>
                <button onClick={waMesaj}
                  className="flex items-center justify-center gap-2 py-3.5 text-[14px] font-bold rounded-xl text-white"
                  style={{ background: '#25D366' }}>
                  <Phone size={16} /> Uzmana Sor
                </button>
              </div>

              <button onClick={sifirla}
                className="w-full flex items-center justify-center gap-2 py-3 text-[13px] font-bold rounded-xl"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <RotateCcw size={14} /> Yeni Kontrol Yap
              </button>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 mt-6 text-[12px]" style={{ color: 'var(--text-muted)' }}>
            <ShieldCheck size={14} className="text-green-600" />
            Fotoğrafınız yalnızca uyumluluk analizi için kullanılır.
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function SoruBlok({ label, deger, setDeger, secenekler }: {
  label: string; deger: string; setDeger: (v: string) => void; secenekler: [string, string][]
}) {
  return (
    <div>
      <label className="text-[13px] font-bold mb-2 block" style={{ color: 'var(--text-primary)' }}>{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {secenekler.map(([val, txt]) => (
          <button key={val} onClick={() => setDeger(val)}
            className="py-2.5 px-3 text-[13px] font-medium rounded-lg transition-all text-left"
            style={{
              background: deger === val ? 'rgba(244,130,31,0.1)' : 'var(--bg-secondary)',
              border: deger === val ? '1.5px solid #DC2626' : '1px solid var(--border)',
              color: deger === val ? '#DC2626' : 'var(--text-secondary)',
            }}>
            {txt}
          </button>
        ))}
      </div>
    </div>
  )
}
