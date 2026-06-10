'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Lightbulb, Blinds, Shield, Zap, Droplets, Thermometer } from 'lucide-react'

const IMAGE_URL = 'https://pub-46ebb1b5197b4ba9a2e747d014c3bb3a.r2.dev/mainpic.webp'

interface Hotspot {
  id: string
  label: string
  href: string
  icon: typeof Lightbulb
  // Görsel üzerindeki konum (yüzde)
  top: string
  left: string
}

const HOTSPOTS: Hotspot[] = [
  { id: 'aydinlatma', label: 'Aydınlatma Kontrolü', href: '/katalog/akilli-kontrol-modul', icon: Lightbulb, top: '28%', left: '15%' },
  { id: 'guvenlik', label: 'Güvenlik Sistemleri', href: '/katalog/ip-guvenlik-cihazi', icon: Shield, top: '55%', left: '9%' },
  { id: 'sicaklik', label: 'Sıcaklık Kontrolü', href: '/katalog/akilli-sensor-termostat', icon: Thermometer, top: '80%', left: '11%' },
  { id: 'perde', label: 'Perde Kontrolü', href: '/katalog/akilli-kontrol-modul', icon: Blinds, top: '26%', left: '85%' },
  { id: 'enerji', label: 'Enerji Yönetimi', href: '/katalog/akilli-kontrol-modul', icon: Zap, top: '52%', left: '90%' },
  { id: 'su-gaz', label: 'Su & Gaz Kontrolü', href: '/katalog/akilli-vana', icon: Droplets, top: '79%', left: '88%' },
]

export default function AkilliEvShowcase() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black tracking-[-0.5px]" style={{ color: 'var(--text-primary)' }}>
          Akıllı Çözümler, Güvenli Yaşam
        </h2>
        <p className="text-sm md:text-base mt-2" style={{ color: 'var(--text-muted)' }}>
          Evinizin her köşesini tek dokunuşla yönetin — interkomdan akıllı ev otomasyonuna
        </p>
      </div>

      {/* Görsel + hotspotlar */}
      <div className="relative w-full rounded-3xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <img
          src={IMAGE_URL}
          alt="Smartdiafon Akıllı Ev Sistemi"
          className="w-full h-auto block"
          loading="lazy"
        />

        {/* Tıklanabilir noktalar — sadece masaüstü */}
        <div className="hidden md:block">
          {HOTSPOTS.map((h) => {
            const Icon = h.icon
            const isActive = active === h.id
            return (
              <Link
                key={h.id}
                href={h.href}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: h.top, left: h.left }}
                onMouseEnter={() => setActive(h.id)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Nabız efekti */}
                <span className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: 'rgba(244,130,31,0.4)' }} />
                {/* Buton */}
                <span className="relative flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-transform group-hover:scale-110"
                  style={{ background: isActive ? '#F4821F' : '#ffffff', border: '2px solid #F4821F' }}>
                  <Icon size={20} style={{ color: isActive ? '#fff' : '#F4821F' }} />
                </span>
                {/* Etiket */}
                <span className="absolute top-1/2 left-full ml-3 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: '#15233B', color: '#fff' }}>
                  {h.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobil — kategori butonları liste halinde */}
      <div className="grid grid-cols-2 gap-3 mt-6 md:hidden">
        {HOTSPOTS.map((h) => {
          const Icon = h.icon
          return (
            <Link key={h.id} href={h.href}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all active:scale-95"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                style={{ background: 'rgba(244,130,31,0.1)' }}>
                <Icon size={17} style={{ color: '#F4821F' }} />
              </span>
              <span className="text-[12px] font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                {h.label}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
