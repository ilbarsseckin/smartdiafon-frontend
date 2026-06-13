'use client'
import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import { useCartStore } from '@/lib/store/cart'
import {
  Eye, Wifi, Smartphone, Monitor, Wrench, ChevronRight, ChevronLeft,
  Building, Phone, Mail, User, MapPin, Star, ShoppingCart,
  FileText, MessageCircle, Loader2, Check, ArrowRight, X
} from 'lucide-react'

const ILLER = [
  'Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin',
  'Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale',
  'Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan','Erzurum',
  'Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkari','Hatay','Isparta','Mersin',
  'İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli',
  'Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş',
  'Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas',
  'Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak',
  'Aksaray','Bayburt','Karaman','Kırıkkale','Batman','Şırnak','Bartın','Ardahan',
  'Iğdır','Yalova','Karabük','Kilis','Osmaniye','Düzce'
]

const STEPS = ['Proje', 'Bina', 'Ekstralar', 'İletişim', 'Teklif']

const PROJECT_TYPES = [
  {
    id: 'goruntulu-gecis',
    icon: Eye,
    title: 'Görüntüsüz → Görüntülü',
    desc: 'Mevcut DT8 altyapınızı değiştirmeden görüntülü sisteme geçin',
    color: '#10B981',
  },
  {
    id: 'diafonbox',
    icon: Wifi,
    title: 'DiafonBox Ekle',
    desc: 'Mevcut sisteme 1 cihaz ile telefondan görüntülü kapı açın',
    color: '#F4821F',
  },
  {
    id: 'akilli-diafon',
    icon: Smartphone,
    title: 'Akıllı Diafon',
    desc: 'İç üniteyi değiştirin, direkt telefona bağlanın (RF destekli)',
    color: '#8B5CF6',
  },
  {
    id: 'ip-linux',
    icon: Monitor,
    title: 'IP / Linux Sistem',
    desc: 'Cat5/Cat6 altyapısı ile tam IP interkom sistemi kurun',
    color: '#2563EB',
  },
  {
    id: 'ariza-bakim',
    icon: Wrench,
    title: 'Arıza / Bakım',
    desc: 'Mevcut sisteminizde sorun mu var? Size yardımcı olalım',
    color: '#EF4444',
  },
]

export default function SihirbazPage() {
  const router = useRouter()
  const { addCatalogItem } = useCartStore()

  const [step, setStep] = useState(0)
  const [projectType, setProjectType] = useState('')
  const [infrastructure, setInfrastructure] = useState('dt8')
  const [apartmentCount, setApartmentCount] = useState('')
  const [entranceCount, setEntranceCount] = useState('1')
  const [floorCount, setFloorCount] = useState('')
  const [city, setCity] = useState('')
  const [wantDiafonBox, setWantDiafonBox] = useState(false)
  const [wantSmartHome, setWantSmartHome] = useState(false)
  const [wantElevator, setWantElevator] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [kur] = useState(45)

  const isAriza = projectType === 'ariza-bakim'

  const next = async () => {
    if (step === 0 && isAriza) return
    if (step === 3) {
      await fetchRecommendation()
      return
    }
    setStep(s => Math.min(s + 1, 4))
  }

  const prev = () => setStep(s => Math.max(s - 1, 0))

  const fetchRecommendation = async () => {
    setLoading(true)
    try {
      const r = await api.post('/api/wizard/recommend', {
        projectType,
        infrastructure,
        apartmentCount: parseInt(apartmentCount) || null,
        entranceCount: parseInt(entranceCount) || 1,
        floorCount: parseInt(floorCount) || null,
        city,
        wantDiafonBox,
        wantSmartHome,
        wantElevator,
        name,
        phone,
        email,
      })
      setResult(r.data.data)
      setStep(4)
    } catch {
      alert('Bir hata oluştu, lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const addAllToCart = () => {
    if (!result?.products) return
    result.products.forEach((p: any) => {
      addCatalogItem({
        id: p.id,
        slug: p.slug,
        name: p.name,
        price: p.minPriceUsd ? Math.round(p.minPriceUsd * kur * 1.2) : 0,
        image: p.mainImageUrl,
        qty: parseInt(apartmentCount) || 1,
      })
    })
    router.push('/sepet')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            <X size={18} />
          </Link>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Akıllı Teklif Sihirbazı</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Ücretsiz — 2 dakikada teklif alın</p>
          </div>
          {step < 4 && !isAriza && (
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{step + 1} / {STEPS.length}</p>
          )}
        </div>

        {/* Progress bar */}
        {step < 4 && !isAriza && (
          <div style={{ maxWidth: 640, margin: '12px auto 0', display: 'flex', gap: 4 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= step ? '#F4821F' : 'var(--border)', transition: 'background 0.3s' }} />
            ))}
          </div>
        )}
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>

        {/* ADIM 0 — Proje tipi */}
        {step === 0 && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 6 }}>Ne yapmak istiyorsunuz?</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>Size en uygun sistemi belirleyelim</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PROJECT_TYPES.map(pt => (
                <button key={pt.id} onClick={() => {
                  setProjectType(pt.id)
                  if (pt.id === 'ariza-bakim') return
                  if (pt.id === 'ip-linux') setInfrastructure('cat5-cat6')
                  else setInfrastructure('dt8')
                  setStep(1)
                }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
                    borderRadius: 16, border: `2px solid ${projectType === pt.id ? pt.color : 'var(--border)'}`,
                    background: projectType === pt.id ? `${pt.color}10` : 'var(--bg-card)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                  }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${pt.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <pt.icon size={22} color={pt.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{pt.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{pt.desc}</p>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </button>
              ))}
            </div>

            {/* Arıza seçilince özel ekran */}
            {isAriza && (
              <div style={{ marginTop: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Size nasıl yardımcı olalım?</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Arıza ve bakım için iki seçenek sunuyoruz:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a href={`https://wa.me/905397348688?text=Merhaba, diyafon sistemimde arıza var, yardım alabilir miyim?`} target="_blank"
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, background: '#25D36615', border: '1px solid #25D36630', textDecoration: 'none' }}>
                    <MessageCircle size={22} color="#25D366" />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>WhatsApp Destek</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Teknik ekibimize direkt ulaşın</p>
                    </div>
                    <ArrowRight size={16} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                  </a>
                  <Link href="/kurulum-ekibi" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, background: 'rgba(244,130,31,0.06)', border: '1px solid rgba(244,130,31,0.2)', textDecoration: 'none' }}>
                    <Wrench size={22} color="#F4821F" />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Elektrikçi Bul</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Şehrinizde yetkili teknisyen bulun</p>
                    </div>
                    <ArrowRight size={16} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ADIM 1 — Bina bilgisi */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 6 }}>Bina bilgileri</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>Doğru ürün ve fiyat hesabı için</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Daire sayısı *</label>
                  <input type="number" min="1" value={apartmentCount} onChange={e => setApartmentCount(e.target.value)}
                    placeholder="24"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Giriş kapısı</label>
                  <input type="number" min="1" value={entranceCount} onChange={e => setEntranceCount(e.target.value)}
                    placeholder="1"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 14 }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Şehir *</label>
                <select value={city} onChange={e => setCity(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', color: city ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: 14 }}>
                  <option value="">Şehir seçin</option>
                  {ILLER.map(il => <option key={il} value={il}>{il}</option>)}
                </select>
              </div>

              {projectType === 'ip-linux' && (
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>Altyapı tipi</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[
                      { id: 'cat5-cat6', label: 'Cat5 / Cat6' },
                      { id: 'ip', label: 'IP / Fiber' },
                    ].map(inf => (
                      <button key={inf.id} onClick={() => setInfrastructure(inf.id)}
                        style={{ flex: 1, padding: '10px', borderRadius: 10, border: `2px solid ${infrastructure === inf.id ? '#F4821F' : 'var(--border)'}`, background: infrastructure === inf.id ? 'rgba(244,130,31,0.08)' : 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                        {inf.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADIM 2 — Ekstralar */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 6 }}>Ek özellikler</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>İsteğe bağlı, atlayabilirsiniz</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {projectType === 'goruntulu-gecis' && (
                <label style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 14, border: `2px solid ${wantDiafonBox ? '#F4821F' : 'var(--border)'}`, background: wantDiafonBox ? 'rgba(244,130,31,0.06)' : 'var(--bg-card)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={wantDiafonBox} onChange={e => setWantDiafonBox(e.target.checked)} style={{ display: 'none' }} />
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(244,130,31,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wifi size={22} color="#F4821F" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>DiafonBox da ekle</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Telefondan görüntülü kapı açma (1 cihaz/bina)</p>
                  </div>
                  {wantDiafonBox && <Check size={18} color="#F4821F" style={{ marginLeft: 'auto' }} />}
                </label>
              )}

              <label style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 14, border: `2px solid ${wantElevator ? '#F4821F' : 'var(--border)'}`, background: wantElevator ? 'rgba(244,130,31,0.06)' : 'var(--bg-card)', cursor: 'pointer' }}>
                <input type="checkbox" checked={wantElevator} onChange={e => setWantElevator(e.target.checked)} style={{ display: 'none' }} />
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building size={22} color="#2563EB" />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Asansör entegrasyonu</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Asansör çağırma sistemi ile bağlantı</p>
                </div>
                {wantElevator && <Check size={18} color="#F4821F" style={{ marginLeft: 'auto' }} />}
              </label>

              {(projectType === 'goruntulu-gecis' || projectType === 'akilli-diafon') && (
                <label style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 14, border: `2px solid ${wantSmartHome ? '#F4821F' : 'var(--border)'}`, background: wantSmartHome ? 'rgba(244,130,31,0.06)' : 'var(--bg-card)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={wantSmartHome} onChange={e => setWantSmartHome(e.target.checked)} style={{ display: 'none' }} />
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Smartphone size={22} color="#8B5CF6" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>RF Akıllı Ev</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Aydınlatma, perde, ısıtma kontrolü</p>
                  </div>
                  {wantSmartHome && <Check size={18} color="#F4821F" style={{ marginLeft: 'auto' }} />}
                </label>
              )}
            </div>
          </div>
        )}

        {/* ADIM 3 — İletişim */}
        {step === 3 && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 6 }}>İletişim bilgileri</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>Teklifinizi PDF ve WhatsApp ile gönderelim</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Ad Soyad *</label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ali Yılmaz"
                    style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 14 }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Telefon *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="0532 000 00 00"
                    style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 14 }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>E-posta (opsiyonel)</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ali@ornek.com"
                    style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 14 }} />
                </div>
              </div>
              <div style={{ background: 'rgba(244,130,31,0.06)', border: '1px solid rgba(244,130,31,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Bilgileriniz yalnızca teklif için kullanılır, üçüncü taraflarla paylaşılmaz.
              </div>
            </div>
          </div>
        )}

        {/* ADIM 4 — Teklif */}
        {step === 4 && result && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={20} color="#10B981" />
              </div>
              <div>
                <h1 style={{ fontSize: 18, fontWeight: 900, color: 'var(--text-primary)' }}>Teklifiniz Hazır!</h1>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Önerilen ürünler ve kurulumcu bilgisi</p>
              </div>
            </div>

            {/* Ürünler */}
            {result.products?.length > 0 && (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Önerilen Ürünler</p>
                {result.products.map((p: any, i: number) => {
                  const price = p.minPriceUsd ? Math.round(p.minPriceUsd * kur * 1.2) : null
                  return (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                      {p.mainImageUrl && (
                        <img src={p.mainImageUrl} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                        {price && <p style={{ fontSize: 13, fontWeight: 700, color: '#F4821F' }}>₺{price.toLocaleString('tr-TR')}</p>}
                      </div>
                      <Link href={`/urun/${p.slug}`} style={{ fontSize: 12, color: '#F4821F', textDecoration: 'none', flexShrink: 0 }}>
                        İncele →
                      </Link>
                    </div>
                  )
                })}
                {apartmentCount && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Tahmini Toplam ({apartmentCount} daire)</p>
                    <p style={{ fontSize: 16, fontWeight: 900, color: 'var(--text-primary)' }}>
                      ₺{result.products.reduce((sum: number, p: any) => {
                        const price = p.minPriceUsd ? Math.round(p.minPriceUsd * kur * 1.2) : 0
                        return sum + price * parseInt(apartmentCount)
                      }, 0).toLocaleString('tr-TR')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Kurulumcu */}
            {result.installers?.length > 0 && (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Şehrinizdeki Kurulumcu</p>
                {result.installers.map((inst: any) => (
                  <div key={inst.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(244,130,31,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#F4821F', flexShrink: 0 }}>
                      {inst.name[0].toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{inst.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{inst.city} · {inst.jobCount} iş tamamlandı</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#F59E0B', fontSize: 13, fontWeight: 700 }}>
                      <Star size={13} fill="#F59E0B" />
                      {Number(inst.rating).toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {result.installers?.length === 0 && (
              <div style={{ background: 'rgba(244,130,31,0.06)', border: '1px solid rgba(244,130,31,0.2)', borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Şehrinizde henüz kayıtlı kurulumcu yok. Ekibimiz sizinle iletişime geçecektir.</p>
              </div>
            )}

            {/* Aksiyonlar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={addAllToCart}
                style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg, #F4821F, #e07010)', border: 'none', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <ShoppingCart size={18} /> Tümünü Sepete Ekle
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <a href={`https://wa.me/905397348688?text=Merhaba, ${name} adına ${apartmentCount || ''} daire için teklif almak istiyorum.`} target="_blank"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, background: '#25D36615', border: '1px solid #25D36630', color: '#25D366', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <button onClick={() => window.print()}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  <FileText size={16} /> PDF İndir
                </button>
              </div>
              <Link href="/kurulum-ekibi"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 13, textDecoration: 'none' }}>
                <Wrench size={16} /> Önce Kurulumcuyla Görüş
              </Link>
            </div>
          </div>
        )}

        {/* Footer butonları */}
        {step < 4 && !isAriza && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
            <button onClick={prev} disabled={step === 0}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 20px', borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: step === 0 ? 'var(--text-muted)' : 'var(--text-primary)', fontSize: 14, cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>
              <ChevronLeft size={16} /> Geri
            </button>
            {step > 0 && (
              <button onClick={next} disabled={loading || (step === 1 && !apartmentCount) || (step === 3 && (!name || !phone))}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px', borderRadius: 12, border: 'none', background: '#F4821F', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: ((step === 1 && !apartmentCount) || (step === 3 && (!name || !phone))) ? 0.5 : 1 }}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                {step === 3 ? 'Teklifi Oluştur' : 'Devam Et'}
                {!loading && <ChevronRight size={16} />}
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media print {
          header, .no-print { display: none !important; }
        }
      `}</style>
    </div>
  )
}