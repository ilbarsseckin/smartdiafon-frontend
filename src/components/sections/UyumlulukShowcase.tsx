'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Camera,
  Images,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Smartphone,
} from 'lucide-react'

export default function UyumlulukShowcase() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

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
    <section className="px-4 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative overflow-hidden rounded-[28px] border"
          style={{
            background:
              'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-8 p-6 md:p-10 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{
                  background: 'rgba(230,57,70,0.12)',
                  border: '1px solid rgba(230,57,70,0.25)',
                }}
              >
                <Sparkles size={14} style={{ color: '#DC2626' }} />
                <span
                  className="text-[11px] md:text-xs font-black uppercase tracking-wide"
                  style={{ color: '#DC2626' }}
                >
                  Yapay Zeka Destekli Ücretsiz Analiz
                </span>
              </div>

              <h2
                className="text-[26px] md:text-[42px] font-black tracking-[-1.4px] leading-[1.05] mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Diyafonunuz DiafonBox ile uyumlu mu?
              </h2>

              <p
                className="text-[14px] md:text-[16px] leading-relaxed max-w-xl mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                Mevcut diyafonunuzun fotoğrafını yükleyin. Sisteminiz analiz
                edilsin, cihazınızı değiştirmeden uygun çözüm önerilsin.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 mb-7">
                {[
                  {
                    icon: Smartphone,
                    title: 'Sistem Analizi',
                    desc: 'Marka ve model kontrolü',
                  },
                  {
                    icon: Zap,
                    title: 'Hızlı Sonuç',
                    desc: 'Anında öneri',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Güvenli',
                    desc: 'Sadece analiz için',
                  },
                ].map(item => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl p-4 border"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <Icon size={20} style={{ color: '#DC2626' }} />
                      <p
                        className="font-black text-sm mt-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-2">
                {[
                  'Multitek, Audio ve görüntülü sistem desteği',
                  'Mevcut cihazınızı değiştirmeden çözüm imkanı',
                  'Uyumlu ürün önerisi ve yönlendirme',
                ].map(text => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Check size={16} style={{ color: '#DC2626' }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={e => handleFile(e.target.files?.[0] || null)}
              />
              <input
                ref={galleryRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => handleFile(e.target.files?.[0] || null)}
              />

              <button
                onClick={() => fileRef.current?.click()}
                className="group w-full rounded-[26px] border-2 border-dashed p-5 md:p-7 transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  borderColor: 'rgba(230,57,70,0.45)',
                  background:
                    'linear-gradient(180deg, rgba(230,57,70,0.10), rgba(230,57,70,0.03))',
                }}
              >
                <div
                  className="rounded-2xl p-5 md:p-7 flex flex-col items-center text-center"
                  style={{ background: 'var(--bg-card)' }}
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20"
                    style={{
                      background:
                        'linear-gradient(135deg, #DC2626 0%, #DC2626 100%)',
                    }}
                  >
                    <Camera size={34} className="text-white" />
                  </div>

                  <p
                    className="text-lg md:text-xl font-black mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Fotoğrafını Çek
                  </p>

                  <p
                    className="text-xs md:text-sm max-w-xs mb-5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Diyafon ekranı ve tuş takımı net görünecek şekilde çekin.
                  </p>

                  <span
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white transition-transform group-hover:translate-x-1"
                    style={{
                      background:
                        'linear-gradient(135deg, #DC2626 0%, #DC2626 100%)',
                    }}
                  >
                    Uyumluluğu Kontrol Et
                    <ArrowRight size={16} />
                  </span>
                </div>
              </button>

              {/* Galeriden seç alternatifi */}
              <button
                onClick={() => galleryRef.current?.click()}
                className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all hover:border-[#DC2626]"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
              >
                <Images size={17} style={{ color: '#2563EB' }} />
                <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>
                  Galeriden Seç
                </span>
              </button>

              <div
                className="flex items-center justify-center gap-1.5 mt-4 text-[11px]"
                style={{ color: 'var(--text-muted)' }}
              >
                <ShieldCheck size={13} />
                Fotoğrafınız yalnızca analiz için kullanılır.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
