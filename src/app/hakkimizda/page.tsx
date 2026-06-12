import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hakk�m�zda | bask�urunleri.com',
  description: '2010\'dan bu yana T�rkiye\'nin �nde gelen dijital bask� firmalar�ndan biri. �stanbul �kitelli\'deki 1200 m� fabrikam�zda b�y�k format bask�dan kartvizite geni� yelpazede hizmet.',
  alternates: { canonical: 'https://baskiurunleri.com/hakkimizda' },
  openGraph: {
    title: 'Hakk�m�zda | bask�urunleri.com',
    description: '2010\'dan bu yana T�rkiye\'nin �nde gelen dijital bask� firmalar�ndan biri.',
    url: 'https://baskiurunleri.com/hakkimizda',
    siteName: 'bask�urunleri.com',
    locale: 'tr_TR',
    type: 'website',
  },
}

const hizmetler = [
  { baslik: 'Kartvizit Bask�', aciklama: 'Standart, kabartmal�, lak veya �zel kesim kartvizit se�enekleriyle profesyonel imaj�n�z� g��lendirin.' },
  { baslik: 'Bro��r ve El �lan�', aciklama: 'Kampanyalar�n�z� ve duyurular�n�z� potansiyel m��terilerinize ula�t�rman�n en etkili yolu.' },
  { baslik: 'Afi� ve Poster', aciklama: 'Etkinlikleriniz i�in geni� formatl�, dikkat �ekici ve canl� renklere sahip bask� ��z�mleri.' },
  { baslik: 'Etiket ve Sticker', aciklama: '�r�n ambalajlar�nda ve promasyonlarda kullanabilece�iniz, markan�za g�rsel iken yap��t�r�c� ��z�mler.' },
  { baslik: 'B�y�k Format', aciklama: 'Tabela, roll-up, branda ve dijital bask� ile d�� mek�n g�r�n�rl���n�z� art�r�n.' },
  { baslik: 'Kurumsal D�k�manlar', aciklama: 'Antetli ka��t, diplomat zarf ve sunum dosyalar� ile ofis �iki�inizi tamamlay�n.' },
]

const adimlar = [
  {
    no: '01',
    baslik: '�r�n ve �zellik Se�imi',
    aciklama: '�htiyac�n�z olan �r�n� se�in; ka��t gramaj�, ebat, selefon t�r� ve bask� gibi t�m �zellikleri belirleyerek fiyat� anl�k olarak g�r�nt�leyin.',
  },
  {
    no: '02',
    baslik: 'Tasar�m Y�kleme veya Olu�turma',
    aciklama: 'Haz�r tasar�m�n�z� sisteme y�kleyin ya da �cretsiz Online Tasar�m St�dyomuzu kullanarak �ablonlardan kendi tasar�m�n�z� dakikalar i�inde haz�rlayabilirsiniz.',
  },
  {
    no: '03',
    baslik: 'G�venli �deme ve Takip',
    aciklama: 'Sipari�inizi onaylay�n ve g�venli �deme i�leminizi tamamlay�n. �r�n�n�z kargoya verilene kadar t�m s�re� panelinden ad�m ad�m takip edin.',
  },
]

const nedenBiz = [
  { baslik: 'Y�ksek Bask� Kalitesi', aciklama: 'Bask� makinelerimiz piyasan�n ile canl� renkler ve net detaylar garanti ediyoruz.' },
  { baslik: 'H�zl� Teslimat', aciklama: 'Sipari�lerinizi belirlenen s�relerde �retip ve korumakta ambalajlay�p kargoya verilir.' },
  { baslik: '�effaf Fiyat Politikas�', aciklama: 'S�rpriz ek �cretler olmadan, sipari� an�nda ne �deyece�inizi net olarak bilirsiniz.' },
  { baslik: 'G�venli Al��veri�', aciklama: '256-bit SSL sertifikas� ile �deme i�lemleriniz her zaman g�vence alt�ndad�r.' },
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
              bask�urunleri.com Hakk�nda
            </p>
            <h1 className="text-[36px] md:text-[52px] font-black tracking-[-2px] leading-[1.1] mb-6"
              style={{ color: 'var(--text-primary)' }}>
              T�m Bask� �htiya�lar�n�z ��in<br />
              <span className="text-[#DC2626]">Yeni Nesil Matbaa</span> ��z�mleri
            </h1>
            <p className="text-[16px] leading-[1.8] max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              Kurumsal kimli�inizi yans�tan profesyonel materyallerden, ki�isel projelerinize kadar t�m bask� s�re�lerini tek bir platformda y�netmeye haz�r m�s�n�z? <strong style={{ color: 'var(--text-primary)' }}>bask�urunleri.com</strong>, geli�mi� online bask� teknolojisi ile kartvizit, bro��r, afi� ve etiket gibi y�zlerce �r�n� kap�n�za ta��yor.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { sayi: '15+', label: 'Y�ll�k Deneyim' },
                { sayi: '50K+', label: 'Mutlu M��teri' },
                { sayi: '1200m�', label: '�retim Alan�' },
                { sayi: '48 Sa.', label: 'H�zl� Teslimat' },
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
            Dijital Bask� ve Kurumsal ��z�mlerimiz Neleri Kapsar?
          </h2>
          <p className="text-[14px] mb-8 leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
            Markan�z�n ihtiya� duydu�u t�m tan�t�m materyalleri, y�ksek ��z�n�rl�kl� dijital bask� makinelerimizde, hassas renk y�netimi ile �retilmektedir. bask�urunleri.com olarak sundu�umuz pop�ler hizmetler:
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

        {/* Sipari� ad�mlar� */}
        <div style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-[28px] md:text-[36px] font-black tracking-[-1px] mb-2"
              style={{ color: 'var(--text-primary)' }}>
              Online Bask� Sipari�i Nas�l Verilir?
            </h2>
            <p className="text-[14px] mb-10 leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
              Matbaa kap�lar�n� a��nd�rmaya gerek kalmadan, oturdu�unuz yerden profesyonel bask� hizmeti alabilirsiniz. bask�urunleri.com'un kullan�c� dostu aray�z� ile sipari� s�reci sadece 3 ad�mda tamamlan�r:
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

        {/* Tasar�m yok */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-[28px] md:text-[36px] font-black tracking-[-1px] mb-4"
            style={{ color: 'var(--text-primary)' }}>
            Tasar�m Bilgin Yok, Yine de Sipari� Verebilirsin!
          </h2>
          <p className="text-[14px] leading-[1.8] mb-4" style={{ color: 'var(--text-secondary)' }}>
            Kesinlikle! bask�urunleri.com, sadece profesyonel tasar�mc�lar i�in de�il, herkese hitap eder. Web sitemizde yer alan <strong style={{ color: '#DC2626' }}>�cretsiz online tasar�m ara�lar�</strong> sayesinde, binlerce haz�r �ablon aras�ndan sekt�r�n�ze uygun alan� se�ebilir; logo, metin ve g�rsellerinizi d�zenleyebilirsiniz. Ayr�ca dilerseniz, uzman grafik ekibimizden profesyonel tasar�m deste�i talep edebilirsiniz.
          </p>
        </div>

        {/* Neden biz */}
        <div style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-[28px] md:text-[36px] font-black tracking-[-1px] mb-2"
              style={{ color: 'var(--text-primary)' }}>
              Neden bask�urunleri.com'u Tercih Etmelisiniz?
            </h2>
            <p className="text-[14px] mb-8 leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
              T�rkiye'nin her yerine kargo avantaj� ve m��teri memnuniyeti odakl� yakla��m�m�zla fark yarat�yoruz.
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

        {/* Kapan�� CTA */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="rounded-3xl p-10 md:p-14"
            style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
            <p className="text-[14px] leading-[1.8] mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              bask�urunleri.com; kartvizitlerden bro��re, afi�ten kurumsal evraklara kadar t�m bask� materyal ihtiya�lar�n�zda, h�z ve kaliteyi bir araya getiren g�venilir ��z�m orta��n�zd�r.
            </p>
            <Link href="/urunler"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[14px] text-white transition-colors"
              style={{ background: '#DC2626' }}>
              �r�nlere G�z At �
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
