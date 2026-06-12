import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hakkýmýzda | baskýurunleri.com',
  description: '2010\'dan bu yana Türkiye\'nin önde gelen dijital baský firmalarýndan biri. Ýstanbul Ýkitelli\'deki 1200 m² fabrikamýzda büyük format baskýdan kartvizite geniþ yelpazede hizmet.',
  alternates: { canonical: 'https://baskiurunleri.com/hakkimizda' },
  openGraph: {
    title: 'Hakkýmýzda | baskýurunleri.com',
    description: '2010\'dan bu yana Türkiye\'nin önde gelen dijital baský firmalarýndan biri.',
    url: 'https://baskiurunleri.com/hakkimizda',
    siteName: 'baskýurunleri.com',
    locale: 'tr_TR',
    type: 'website',
  },
}

const hizmetler = [
  { baslik: 'Kartvizit Baský', aciklama: 'Standart, kabartmalý, lak veya özel kesim kartvizit seçenekleriyle profesyonel imajýnýzý güçlendirin.' },
  { baslik: 'Broþür ve El Ýlaný', aciklama: 'Kampanyalarýnýzý ve duyurularýnýzý potansiyel müþterilerinize ulaþtýrmanýn en etkili yolu.' },
  { baslik: 'Afiþ ve Poster', aciklama: 'Etkinlikleriniz için geniþ formatlý, dikkat çekici ve canlý renklere sahip baský çözümleri.' },
  { baslik: 'Etiket ve Sticker', aciklama: 'Ürün ambalajlarýnda ve promasyonlarda kullanabileceðiniz, markanýza görsel iken yapýþtýrýcý çözümler.' },
  { baslik: 'Büyük Format', aciklama: 'Tabela, roll-up, branda ve dijital baský ile dýþ mekân görünürlüðünüzü artýrýn.' },
  { baslik: 'Kurumsal Dökümanlar', aciklama: 'Antetli kaðýt, diplomat zarf ve sunum dosyalarý ile ofis þikiþinizi tamamlayýn.' },
]

const adimlar = [
  {
    no: '01',
    baslik: 'Ürün ve Özellik Seçimi',
    aciklama: 'Ýhtiyacýnýz olan ürünü seçin; kaðýt gramajý, ebat, selefon türü ve baský gibi tüm özellikleri belirleyerek fiyatý anlýk olarak görüntüleyin.',
  },
  {
    no: '02',
    baslik: 'Tasarým Yükleme veya Oluþturma',
    aciklama: 'Hazýr tasarýmýnýzý sisteme yükleyin ya da ücretsiz Online Tasarým Stüdyomuzu kullanarak þablonlardan kendi tasarýmýnýzý dakikalar içinde hazýrlayabilirsiniz.',
  },
  {
    no: '03',
    baslik: 'Güvenli Ödeme ve Takip',
    aciklama: 'Sipariþinizi onaylayýn ve güvenli ödeme iþleminizi tamamlayýn. Ürününüz kargoya verilene kadar tüm süreç panelinden adým adým takip edin.',
  },
]

const nedenBiz = [
  { baslik: 'Yüksek Baský Kalitesi', aciklama: 'Baský makinelerimiz piyasanýn ile canlý renkler ve net detaylar garanti ediyoruz.' },
  { baslik: 'Hýzlý Teslimat', aciklama: 'Sipariþlerinizi belirlenen sürelerde üretip ve korumakta ambalajlayýp kargoya verilir.' },
  { baslik: 'Þeffaf Fiyat Politikasý', aciklama: 'Sürpriz ek ücretler olmadan, sipariþ anýnda ne ödeyeceðinizi net olarak bilirsiniz.' },
  { baslik: 'Güvenli Alýþveriþ', aciklama: '256-bit SSL sertifikasý ile ödeme iþlemleriniz her zaman güvence altýndadýr.' },
]

export default function HakkimizdaPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            <p className="text-[11px] tracking-[2.5px] uppercase font-bold text-[#DC2626] mb-4">
              baskýurunleri.com Hakkýnda
            </p>
            <h1 className="text-[36px] md:text-[52px] font-black tracking-[-2px] leading-[1.1] mb-6"
              style={{ color: 'var(--text-primary)' }}>
              Tüm Baský Ýhtiyaçlarýnýz Ýçin<br />
              <span className="text-[#DC2626]">Yeni Nesil Matbaa</span> Çözümleri
            </h1>
            <p className="text-[16px] leading-[1.8] max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              Kurumsal kimliðinizi yansýtan profesyonel materyallerden, kiþisel projelerinize kadar tüm baský süreçlerini tek bir platformda yönetmeye hazýr mýsýnýz? <strong style={{ color: 'var(--text-primary)' }}>baskýurunleri.com</strong>, geliþmiþ online baský teknolojisi ile kartvizit, broþür, afiþ ve etiket gibi yüzlerce ürünü kapýnýza taþýyor.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { sayi: '15+', label: 'Yýllýk Deneyim' },
                { sayi: '50K+', label: 'Mutlu Müþteri' },
                { sayi: '1200m²', label: 'Üretim Alaný' },
                { sayi: '48 Sa.', label: 'Hýzlý Teslimat' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-4 text-center"
                  style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                  <p className="text-[28px] font-black text-[#DC2626] leading-tight">{s.sayi}</p>
                  <p className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hizmetler */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-[28px] md:text-[36px] font-black tracking-[-1px] mb-2"
            style={{ color: 'var(--text-primary)' }}>
            Dijital Baský ve Kurumsal Çözümlerimiz Neleri Kapsar?
          </h2>
          <p className="text-[14px] mb-8 leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
            Markanýzýn ihtiyaç duyduðu tüm tanýtým materyalleri, yüksek çözünürlüklü dijital baský makinelerimizde, hassas renk yönetimi ile üretilmektedir. baskýurunleri.com olarak sunduðumuz popüler hizmetler:
          </p>
          <div className="space-y-3">
            {hizmetler.map((h) => (
              <div key={h.baslik} className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                  style={{ background: '#DC2626' }}>?</span>
                <div>
                  <span className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>{h.baslik}: </span>
                  <span className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>{h.aciklama}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sipariþ adýmlarý */}
        <div style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-[28px] md:text-[36px] font-black tracking-[-1px] mb-2"
              style={{ color: 'var(--text-primary)' }}>
              Online Baský Sipariþi Nasýl Verilir?
            </h2>
            <p className="text-[14px] mb-10 leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
              Matbaa kapýlarýný aþýndýrmaya gerek kalmadan, oturduðunuz yerden profesyonel baský hizmeti alabilirsiniz. baskýurunleri.com'un kullanýcý dostu arayüzü ile sipariþ süreci sadece 3 adýmda tamamlanýr:
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {adimlar.map((a) => (
                <div key={a.no} className="rounded-2xl p-6"
                  style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-[13px] text-white mb-4"
                    style={{ background: '#DC2626' }}>
                    {a.no}
                  </div>
                  <h3 className="text-[15px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{a.baslik}</h3>
                  <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{a.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasarým yok */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-[28px] md:text-[36px] font-black tracking-[-1px] mb-4"
            style={{ color: 'var(--text-primary)' }}>
            Tasarým Bilgin Yok, Yine de Sipariþ Verebilirsin!
          </h2>
          <p className="text-[14px] leading-[1.8] mb-4" style={{ color: 'var(--text-secondary)' }}>
            Kesinlikle! baskýurunleri.com, sadece profesyonel tasarýmcýlar için deðil, herkese hitap eder. Web sitemizde yer alan <strong style={{ color: '#DC2626' }}>ücretsiz online tasarým araçlarý</strong> sayesinde, binlerce hazýr þablon arasýndan sektörünüze uygun alaný seçebilir; logo, metin ve görsellerinizi düzenleyebilirsiniz. Ayrýca dilerseniz, uzman grafik ekibimizden profesyonel tasarým desteði talep edebilirsiniz.
          </p>
        </div>

        {/* Neden biz */}
        <div style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-[28px] md:text-[36px] font-black tracking-[-1px] mb-2"
              style={{ color: 'var(--text-primary)' }}>
              Neden baskýurunleri.com'u Tercih Etmelisiniz?
            </h2>
            <p className="text-[14px] mb-8 leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
              Türkiye'nin her yerine kargo avantajý ve müþteri memnuniyeti odaklý yaklaþýmýmýzla fark yaratýyoruz.
            </p>
            <div className="space-y-3">
              {nedenBiz.map((n) => (
                <div key={n.baslik} className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                    style={{ background: '#DC2626' }}>?</span>
                  <div>
                    <span className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>{n.baslik}: </span>
                    <span className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>{n.aciklama}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kapanýþ CTA */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="rounded-3xl p-10 md:p-14"
            style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
            <p className="text-[14px] leading-[1.8] mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              baskýurunleri.com; kartvizitlerden broþüre, afiþten kurumsal evraklara kadar tüm baský materyal ihtiyaçlarýnýzda, hýz ve kaliteyi bir araya getiren güvenilir çözüm ortaðýnýzdýr.
            </p>
            <Link href="/urunler"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[14px] text-white transition-colors"
              style={{ background: '#DC2626' }}>
              Ürünlere Göz At ›
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
