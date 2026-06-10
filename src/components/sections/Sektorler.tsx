import Image from 'next/image'
import Link from 'next/link'

const sektorler = [
  {
    title: 'İnşaat Firmaları',
    desc: 'Toplu konut projeleri için IP ve görüntülü diyafon altyapısı',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    href: '/katalog/diafon-sistemleri',
  },
  {
    title: 'Rezidanslar',
    desc: 'Çok daireli yapılar için merkezi interkom ve güvenlik',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    href: '/katalog/ip-interkom',
  },
  {
    title: 'Villalar',
    desc: 'Akıllı ev otomasyonu ve görüntülü kapı paneli çözümleri',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
    href: '/katalog/akilli-ev-sistemleri',
  },
  {
    title: 'Oteller',
    desc: 'Yangın alarm, güvenlik ve interkom sistemleri',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    href: '/katalog/yangin-alarm',
  },
  {
    title: 'Eski Binalar',
    desc: 'Mevcut altyapıya uyumlu Multibus ve APT160 sistemleri',
    image:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop',
    href: '/katalog/multibus-interkom',
  },
  {
    title: 'Site Yönetimleri',
    desc: 'Güvenlik konsolu, kamera ve merkezi izleme sistemleri',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    href: '/katalog/ip-guvenlik-cihazi',
  },
]

export default function Sektorler() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-14">
      <div className="mb-6 md:mb-8">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F4821F] md:text-sm">
          Çözüm Alanları
        </p>

        <h2 className="max-w-[520px] text-[24px] font-black leading-tight text-gray-900 md:text-3xl dark:text-white">
          Her Projeye Uygun Diyafon ve Güvenlik Çözümleri
        </h2>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {sektorler.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group relative h-[230px] min-w-[250px] snap-start overflow-hidden rounded-3xl bg-gray-200 md:h-[260px] md:min-w-0"
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              sizes="(max-width: 768px) 250px, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <h3 className="mb-2 text-[20px] font-black leading-tight text-white md:text-2xl">
                {s.title}
              </h3>

              <p className="mb-4 text-[13px] leading-5 text-white/85 md:text-sm">
                {s.desc}
              </p>

              <span className="inline-flex items-center text-[13px] font-bold text-white md:text-sm">
                Ürünleri İncele →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}