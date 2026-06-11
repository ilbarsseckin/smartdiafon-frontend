'use client'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react'

export default function UyumlulukShowcase() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        sessionStorage.setItem('uyumluluk_foto', reader.result as string)
        sessionStorage.setItem('uyumluluk_foto_ad', f.name)
      } catch {}
      router.push('/uyumluluk?from=home')
    }
    reader.readAsDataURL(f)
  }

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          {/* ince turuncu ust serit */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #F4821F, #e07010)' }} />

          <div className="grid md:grid-cols-2 gap-5 md:gap-8 p-5 md:p-8 items-center">
            {/* Sol: Metin */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3"
                style={{ background: 'rgba(244,130,31,0.1)', border: '1px solid rgba(244,130,31,0.3)' }}>
                <Sparkles size={12} style={{ color: '#F4821F' }} />
                <span className="text-[11px] font-bold" style={{ color: '#F4821F' }}>Yapay Zeka Destekli · Ücretsiz</span>
              </div>

              <h2 className="text-[19px] md:text-[26px] font-black tracking-[-0.5px] mb-2 leading-tight"
                style={{ color: 'var(--text-primary)' }}>
                DiafonBox ve Akıllı Diafon Uyumluluk Testi
              </h2>
              <p className="text-[13px] md:text-[14px] mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Mevcut diyafonunuzun fotoğrafını yükleyin, yapay zeka markanızı ve sisteminizi analiz etsin.
                Cihazınızı değiştirmeden çözüm bulun.
              </p>

              <div className="space-y-1.5">
                {['Multitek, Audio ve tüm görüntülü sistemler', 'Mevcut cihazınızı değiştirmeden çözüm', 'Anında ürün önerisi'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-[12px] md:text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                    <Check size={14} style={{ color: '#F4821F', flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Sag: Foto yukleme */}
            <div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => handleFile(e.target.files?.[0] || null)} />
              <button onClick={() => fileRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed py-6 md:py-8 px-4 flex flex-col items-center gap-3 transition-all hover:border-[#F4821F]"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #F4821F, #e07010)' }}>
                  <Camera size={24} className="text-white" />
                </div>
                <div className="text-center">
                  <p className="text-[14px] md:text-[15px] font-bold" style={{ color: 'var(--text-primary)' }}>Fotoğraf Çek veya Yükle</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Diyafonunuzun fotoğrafını seçin</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] md:text-[13px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #F4821F, #e07010)' }}>
                  Uyumluluğu Kontrol Et <ArrowRight size={14} />
                </span>
              </button>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] md:text-[11px]" style={{ color: 'var(--text-muted)' }}>
                <ShieldCheck size={12} /> Fotoğrafınız yalnızca analiz için kullanılır
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}