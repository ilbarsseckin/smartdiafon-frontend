import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hakkımızda | Smartdiafon',
  description: 'Smartdiafon; görüntülü diyafon, IP interkom ve güvenlik sistemleri satışı yapan, müşterilerini güvenilir montaj ekipleriyle buluşturan bir platformdur.',
  alternates: { canonical: 'https://smartdiafon.com.tr/hakkimizda' },
}

const values = [
  { title: 'Ürün ve Montaj Tek Yerden', desc: 'Diyafon sisteminizi alın, şehrinizdeki puanlı montaj ekibiyle eşleşin. Elektrikçi aramakla uğraşmayın.' },
  { title: 'Doğru Ürün Seçimi', desc: 'Ücretsiz teklif aracımız ile binanıza uygun sistemi ve tahmini maliyeti saniyeler içinde öğrenin.' },
  { title: 'Hızlı Teslimat', desc: 'Stoktaki ürünler kısa sürede kargoya verilir, Türkiye geneline gönderim yapılır.' },
  { title: 'Şeffaf Hizmet', desc: 'Montaj ücreti doğrudan usta ile aranızdadır. Biz yalnızca ürün satışı yapar, sizi doğru kişilerle buluştururuz.' },
]

export default function HakkimizdaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

        {/* Hero */}
        <div className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <p className="text-[11px] tracking-[2.5px] uppercase font-bold text-[#E63946] mb-3">Hakkımızda</p>
            <h1 className="text-[36px] md:text-[48px] font-black tracking-[-1.5px] mb-4" style={{ color: 'var(--text-primary)' }}>
              Ürünü de Ustası da <span className="text-[#E63946]">Tek Yerden</span>
            </h1>
            <p className="text-[16px] max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Smartdiafon; görüntülü diyafon, IP interkom ve güvenlik sistemleri satan,
              müşterilerini güvenilir montaj ekipleriyle buluşturan bir platformdur.
            </p>
          </div>
        </div>

        {/* Anlatı */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="space-y-5 text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
            <p>
              Görüntülü diyafon almak isteyen çoğu kişi iki soruyla karşılaşır:
              <strong style={{ color: 'var(--text-primary)' }}> "Hangi ürünü almalıyım?"</strong> ve
              <strong style={{ color: 'var(--text-primary)' }}> "Kim takacak?"</strong>.
              Smartdiafon tam olarak bu iki sorunu çözmek için kuruldu.
            </p>
            <p>
              Türkiye'deki binaların büyük kısmı, mevcut altyapısını değiştirmeden görüntüsüz diyafonunu
              görüntülüye çevirebilir. Biz size uygun ürünü öneriyor, dilerseniz şehrinizdeki puanlı
              montaj ekibiyle sizi buluşturuyoruz. Böylece elektrikçi elektrikçi dolaşmadan,
              ürün de montaj da tek yerden hallolur.
            </p>
            <p>
              Multitek başta olmak üzere güvenilir markaların görüntülü diyafon, kapı paneli, daire
              monitörü, DiafonBox ve akıllı ev ürünlerini sunuyoruz. Amacımız; doğru ürünü, doğru kişiyle,
              en az uğraşla buluşturmak.
            </p>
          </div>
        </div>

        {/* Değerler */}
        <div style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-[24px] font-black tracking-[-0.5px] mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
              Neden Smartdiafon?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <h3 className="text-[15px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{v.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-[24px] font-black mb-3" style={{ color: 'var(--text-primary)' }}>
            Projeniz için ücretsiz teklif alın
          </h2>
          <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
            Binanıza uygun sistemi ve tahmini maliyeti 2 dakikada öğrenin.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/teklif"
              className="px-6 py-3 rounded-xl text-[13px] font-bold text-white"
              style={{ background: '#E63946' }}>
              Ücretsiz Teklif Al
            </Link>
            <Link href="/iletisim"
              className="px-6 py-3 rounded-xl text-[13px] font-bold"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', background: 'var(--bg-card)' }}>
              İletişime Geç
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}