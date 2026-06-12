'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    title: '�r�n� Se�in & Sepete Ekleyin',
    desc: '�htiyac�n�za uygun �r�n� se�in. Bask� adedi, ka��t kal�nl���, kaplama gibi �zellikleri belirleyerek sepetinize ekleyin. Fiyat an�nda g�ncellenir.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="rgba(244,130,31,0.1)" />
        <path d="M10 13h2l3 12h12l2-8H15" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17" cy="28" r="1.5" fill="#DC2626"/>
        <circle cx="25" cy="28" r="1.5" fill="#DC2626"/>
      </svg>
    ),
    color: '#DC2626',
    action: { label: '�r�nlere G�z At', href: '/urunler' }
  },
  {
    number: '02',
    title: 'Sipari�inizi Tamamlay�n',
    desc: 'Teslimat adresinizi girin ve �deme y�ntemini se�in. Kredi kart�, banka havalesi / EFT veya BKM Ekspres ile g�venli �deme yapabilirsiniz.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="rgba(99,102,241,0.1)" />
        <rect x="11" y="15" width="18" height="12" rx="2" stroke="#6366F1" strokeWidth="1.8"/>
        <path d="M11 19h18" stroke="#6366F1" strokeWidth="1.8"/>
        <path d="M15 23h4" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: '#6366F1',
    action: null
  },
  {
    number: '03',
    title: 'Tasar�m�n�z� Y�kleyin',
    desc: 'Sipari�i verdikten sonra tasar�m dosyan�z� y�kleyin. Tasar�m�n�z yoksa "Kendi Tasarla" se�ene�iyle kolayca olu�turabilirsiniz. Uzman ekibimiz dosyay� kontrol eder.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="rgba(16,185,129,0.1)" />
        <path d="M20 26V16M20 16l-4 4M20 16l4 4" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 28h14" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    color: '#10B981',
    action: { label: 'Tasar�m K�lavuzu', href: '/tasarim-yukleme' }
  },
  {
    number: '04',
    title: 'H�zl� Kargo ile Kap�n�za Gelir',
    desc: 'Bask� tamamland�ktan sonra sipari�iniz anla�mal� kargo firmam�zla h�zl�ca g�nderilir. Sipari� takip numaran�zla kargonuzu anl�k izleyebilirsiniz.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="rgba(14,165,233,0.1)" />
        <path d="M10 22h14v-8H10v8zM24 22h6l-2-6h-4v6z" stroke="#0EA5E9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="25" r="2" stroke="#0EA5E9" strokeWidth="1.5"/>
        <circle cx="27" cy="25" r="2" stroke="#0EA5E9" strokeWidth="1.5"/>
      </svg>
    ),
    color: '#0EA5E9',
    action: null
  }
]

const faqs = [
  {
    q: 'Minimum sipari� adedi nedir?',
    a: '�r�ne g�re de�i�mekle birlikte �o�u �r�nde minimum 25-50 adet ile sipari� verebilirsiniz.'
  },
  {
    q: 'Tasar�m�m yoksa ne yapabilirim?',
    a: 'Sipari� sonras� tasar�m deste�i alabilir, ya da haz�r �ablonlar�m�z� kullanarak kendi tasar�m�n�z� olu�turabilirsiniz.'
  },
  {
    q: '�deme y�ntemleri nelerdir?',
    a: 'Kredi kart� (taksit se�ene�iyle), banka havalesi/EFT ve BKM Ekspres ile �deme yapabilirsiniz.'
  },
  {
    q: 'Kargo s�resi ne kadar?',
    a: 'Bask� s�resi �r�ne g�re 1-5 i� g�n�, kargo ise 1-2 i� g�n�d�r. Ekspres �retim se�ene�i de mevcuttur.'
  },
  {
    q: 'Sipari�imi iptal edebilir miyim?',
    a: 'Bask� i�lemi ba�lamadan �nce iptal m�mk�nd�r. Tasar�m onay�ndan sonra iptal kabul edilmemektedir.'
  }
]

export default function NasilSiparisPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

        {/* Hero */}
        <div className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <p className="text-[11px] tracking-[2.5px] uppercase font-bold text-[#DC2626] mb-3">Rehber</p>
            <h1 className="text-[36px] md:text-[48px] font-black tracking-[-1.5px] mb-4" style={{ color: 'var(--text-primary)' }}>
              Nas�l Sipari� Verebilirim?
            </h1>
            <p className="text-[16px] max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Bask�urunleri.com'da sipari� vermek �ok kolay. 4 basit ad�mda sipari�iniz kap�n�za gelir.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i}
                className="rounded-2xl p-8 flex gap-6 items-start transition-all"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}>
                {/* Number */}
                <div className="flex-shrink-0 hidden sm:block">
                  <span className="text-[48px] font-black leading-none" style={{ color: 'var(--border-strong)', letterSpacing: '-2px' }}>
                    {step.number}
                  </span>
                </div>

                {/* Icon + Content */}
                <div className="flex gap-4 items-start flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-[18px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {step.title}
                    </h2>
                    <p className="text-[14px] leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                      {step.desc}
                    </p>
                    {step.action && (
                      <Link href={step.action.href}
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold hover:underline"
                        style={{ color: step.color }}>
                        {step.action.label} �
                      </Link>
                    )}
                  </div>
                </div>

                {/* Step indicator mobile */}
                <div className="sm:hidden flex-shrink-0">
                  <span className="text-[11px] font-bold px-2 py-1 rounded-full"
                    style={{ background: `${step.color}20`, color: step.color }}>
                    {step.number}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-[24px] font-black tracking-[-0.5px] mb-8" style={{ color: 'var(--text-primary)' }}>
              S�k Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl p-5"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <h3 className="text-[14px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {faq.q}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-[24px] font-black mb-3" style={{ color: 'var(--text-primary)' }}>
            H�l� sorunuz mu var?
          </h2>
          <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
            Uzman ekibimiz size yard�mc� olmaktan mutluluk duyar.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/iletisim"
              className="px-6 py-3 rounded-xl text-[13px] font-bold text-white"
              style={{ background: '#DC2626' }}>
              �leti�ime Ge�
            </Link>
            <Link href="/urunler"
              className="px-6 py-3 rounded-xl text-[13px] font-bold"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', background: 'var(--bg-card)' }}>
              �r�nlere G�z At
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
