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
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #15233B 0%, #1e3a5f 100%)' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #F4821F 0%, transparent 50%), radial-gradient(circle at 80% 70%, #F4821F 0%, transparent 40%)' }} />
          <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(244,130,31,0.2)', border: '1px solid rgba(244,130,31,0.4)' }}>
                <Sparkles size={14} style={{ color: '#F4821F' }} />
                <span className="text-[12px] font-bold" style={{ color: '#F4821F' }}>Yapay Zeka Destekli — Ücretsiz</span>
              </div>
              <h2 className="text-[26px] md:text-[32px] font-black tracking-[-1px] text-white mb-3 leading-tight">
                Diyafonunuz DiafonBox'a Uyumlu mu?
              </h2>
              <p className="text-[14px] md:text-[15px] mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Mevcut diyafonunuzun fotoğrafını yükleyin, yapay zeka markanızı ve sisteminizi analiz etsin.
                Cihazınızı değiştirmeden telefonunuzdan kapı görüşmesi yapıp yapamayacağınızı saniyeler içinde öğrenin.
              </p>
              <div className="space-y-2 mb-6">
                {['Multitek, Audio ve tüm görüntülü sistemler', 'Mevcut cihazınızı değiştirmeden çözüm', 'Anında ürün önerisi + fiyat'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-[13px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <Check size={15} style={{ color: '#F4821F', flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => handleFile(e.target.files?.[0] || null)} />
              <button onClick={() => fileRef.current?.click()}
                className="w-full rounded-2xl border-2 border-dashed py-10 px-6 flex flex-col items-center gap-4 transition-all hover:scale-[1.02]"
                style={{ borderColor: 'rgba(244,130,31,0.5)', background: 'rgba(255,255,255,0.05)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #F4821F, #e07010)' }}>
                  <Camera size={28} className="text-white" />
                </div>
                <div className="text-center">
                  <p className="text-[16px] font-bold text-white mb-1">Fotoğraf Çek veya Yükle</p>
                  <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Diyafonunuzun fotoğrafını seçin</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #F4821F, #e07010)' }}>
                  Uyumluluğu Kontrol Et <ArrowRight size={15} />
                </span>
              </button>
              <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <ShieldCheck size={13} /> Fotoğrafınız yalnızca analiz için kullanılır
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
