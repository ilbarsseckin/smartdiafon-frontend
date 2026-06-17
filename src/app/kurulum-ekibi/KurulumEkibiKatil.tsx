'use client'

import { useState } from 'react'
import { Wrench, MapPin, Phone, User, Mail, Building, CheckCircle2, Send } from 'lucide-react'
import api from '@/lib/api'
import toast from 'react-hot-toast'

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

const AVANTAJLAR = [
  { baslik: 'Hazır Müşteri Akışı', aciklama: 'Bölgenizden gelen kurulum taleplerini doğrudan size yönlendiriyoruz.' },
  { baslik: 'Esnek Çalışma', aciklama: 'Kendi programınıza göre iş alın, bölgenizde çalışın.' },
  { baslik: 'Teknik Destek', aciklama: 'Multitek ürünleri için ürün ve montaj desteği sağlıyoruz.' },
  { baslik: 'Güvenilir Ödeme', aciklama: 'İşlerinizin karşılığını zamanında ve güvenle alın.' },
]

const UZMANLIK = ['Multibus Diyafon', 'IP İnterkom', 'Linux İnterkom', 'Yangın Alarm', 'Akıllı Ev', 'Kamera & Güvenlik']

export default function KurulumEkibiKatil() {
  const [ad, setAd] = useState('')
  const [telefon, setTelefon] = useState('')
  const [eposta, setEposta] = useState('')
  const [sehir, setSehir] = useState('')
  const [firma, setFirma] = useState('')
  const [deneyim, setDeneyim] = useState('')
  const [uzmanlik, setUzmanlik] = useState<string[]>([])
  const [gonderildi, setGonderildi] = useState(false)

  function toggleUzmanlik(u: string) {
    setUzmanlik(prev => prev.includes(u) ? prev.filter(x => x !== u) : [...prev, u])
  }

  function buildText() {
    return [
      'KURULUM & MONTAJ EKİBİ BAŞVURUSU',
      `Ad Soyad: ${ad}`,
      `Telefon: ${telefon}`,
      eposta ? `E-posta: ${eposta}` : '',
      `Şehir/Bölge: ${sehir}`,
      firma ? `Firma: ${firma}` : '',
      deneyim ? `Deneyim: ${deneyim}` : '',
      uzmanlik.length ? `Uzmanlık: ${uzmanlik.join(', ')}` : '',
    ].filter(Boolean).join('\n')
  }

  async function handleGonder() {
    if (!ad || !telefon || !sehir) return
    try {
      await api.post('/api/installers/apply', {
        name: ad,
        phone: telefon,
        email: eposta || null,
        city: sehir,
        company: firma || null,
        experience: deneyim || null,
        expertise: uzmanlik.join(', ') || null,
      })
      setGonderildi(true)
    } catch {
      toast.error('Başvuru gönderilemedi, lütfen tekrar deneyin')
    }
  }

  function handleWhatsapp() {
    window.open(`https://wa.me/905397348688?text=${encodeURIComponent(buildText())}`, '_blank')
  }

  const gecerli = ad && telefon && sehir

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Başlık */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
          style={{ background: 'rgba(230,57,70,0.12)' }}>
          <Wrench size={26} style={{ color: '#DC2626' }} />
        </span>
        <h1 className="text-2xl md:text-3xl font-black tracking-[-0.5px]" style={{ color: 'var(--text-primary)' }}>
          Kurulum ve Montaj Ekibimize Katılın
        </h1>
        <p className="text-sm mt-2 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          Diyafon, interkom ve güvenlik sistemleri montajında uzmansanız, bölgenizden gelen
          kurulum taleplerini size yönlendirelim. Hemen başvurun.
        </p>
      </div>

      {/* Avantajlar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {AVANTAJLAR.map((a, i) => (
          <div key={i} className="p-4 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <CheckCircle2 size={18} style={{ color: '#10B981' }} className="mb-2" />
            <p className="text-[13px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{a.baslik}</p>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{a.aciklama}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      {!gonderildi ? (
        <div className="rounded-3xl p-6 md:p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <h2 className="text-lg font-black mb-5" style={{ color: 'var(--text-primary)' }}>Başvuru Formu</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Field icon={User} label="Ad Soyad *" value={ad} onChange={setAd} placeholder="Adınız Soyadınız" />
            <Field icon={Phone} label="Telefon *" value={telefon} onChange={setTelefon} placeholder="05xx xxx xx xx" type="tel" />
            <Field icon={Mail} label="E-posta" value={eposta} onChange={setEposta} placeholder="ornek@mail.com" type="email" />
            <div>
              <label className="block text-[13px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Şehir *</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                <select value={sehir} onChange={e => setSehir(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 rounded-xl text-[14px] appearance-none"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: sehir ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  <option value="">Şehir seçin *</option>
                  {ILLER.map(il => <option key={il} value={il}>{il}</option>)}
                </select>
              </div>
            </div>
            <Field icon={Building} label="Firma (varsa)" value={firma} onChange={setFirma} placeholder="Firma adı" />
            <Field icon={Wrench} label="Deneyim (yıl)" value={deneyim} onChange={setDeneyim} placeholder="Örn. 5 yıl" />
          </div>

          {/* Uzmanlık alanları */}
          <div className="mb-6">
            <label className="block text-[13px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Uzmanlık Alanları</label>
            <div className="flex flex-wrap gap-2">
              {UZMANLIK.map(u => {
                const sec = uzmanlik.includes(u)
                return (
                  <button key={u} onClick={() => toggleUzmanlik(u)}
                    className="px-3 py-2 rounded-xl text-[12px] font-bold transition-all"
                    style={{
                      background: sec ? '#DC2626' : 'var(--bg-secondary)',
                      color: sec ? '#fff' : 'var(--text-secondary)',
                      border: sec ? 'none' : '1px solid var(--border)',
                    }}>
                    {u}
                  </button>
                )
              })}
            </div>
          </div>

          <button onClick={handleGonder} disabled={!gecerli}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[14px] text-white transition-all hover:scale-[1.01] disabled:opacity-40 disabled:hover:scale-100"
            style={{ background: 'linear-gradient(135deg,#DC2626,#F08080)' }}>
            <Send size={17} /> Başvuruyu Gönder
          </button>
          <p className="text-[11px] text-center mt-3" style={{ color: 'var(--text-muted)' }}>
            * işaretli alanlar zorunludur. Başvurunuz değerlendirildikten sonra sizinle iletişime geçilecektir.
          </p>
        </div>
      ) : (
        /* Gönderildi ekranı */
        <div className="rounded-3xl p-8 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(16,185,129,0.1)' }}>
            <CheckCircle2 size={36} style={{ color: '#10B981' }} />
          </div>
          <h2 className="text-xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>Başvurunuz Alındı!</h2>
          <p className="text-[14px] mb-2 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            Teşekkürler <strong>{ad}</strong>! Başvurunuz sistemimize kaydedildi.
          </p>
          <p className="text-[13px] mb-6 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            Ekibimiz başvurunuzu inceleyip en kısa sürede onaylanıp sisteme dahil edilecektir.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>
            <CheckCircle2 size={14} /> Başvuru kaydedildi
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = 'text' }: {
  icon: any; label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string
}) {
  return (
    <div>
      <label className="block text-[13px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full pl-9 pr-3 py-3 rounded-xl text-[14px]"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
      </div>
    </div>
  )
}