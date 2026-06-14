'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    title: 'Ürününüzü Seçin & Sepete Ekleyin',
    desc: 'İhtiyacınıza uygun görüntülü diyafon, kapı paneli veya monitörü seçin. Emin değilseniz ücretsiz Teklif Hazırlayıcı ile binanıza özel paketi 2 dakikada oluşturun.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="rgba(244,130,31,0.1)" />
        <path d="M10 13h2l3 12h12l2-8H15" stroke="#F4821F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17" cy="28" r="1.5" fill="#F4821F"/>
        <circle cx="25" cy="28" r="1.5" fill="#F4821F"/>
      </svg>
    ),
    color: '#F4821F',
    action: { label: 'Teklif Hazırla', href: '/teklif' }
  },
  {
    number: '02',
    title: 'Kurulum İsteyin (Opsiyonel)',
    desc: 'Montaj da istiyorsanız, satın alma sırasında "Kurulum istiyorum" seçeneğini işaretleyin. Şehrinizdeki puanlı montaj ekiplerini görür, dilediğinizi seçersiniz. Elektrikçi aramakla uğraşmazsınız.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="rgba(99,102,241,0.1)" />
        <path d="M16 14l-4 4 3 3 4-4M22 20l4 4-3 3-4-4" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="2" stroke="#6366F1" strokeWidth="1.5"/>
      </svg>
    ),
    color: '#6366F1',
    action: { label: 'Kurulum Ekibini Gör', href: '/kurulum-ekibi' }
  },
  {
    number: '03',
    title: 'Siparişinizi Tamamlayın',
    desc: 'Teslimat adresinizi girin ve ödeme yönteminizi seçin. Kredi kartı, banka havalesi / EFT ile güvenli ödeme yapabilirsiniz. Ödeme tamamlanınca siparişiniz hazırlanır.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="rgba(16,185,129,0.1)" />
        <rect x="11" y="15" width="18" height="12" rx="2" stroke="#10B981" strokeWidth="1.8"/>
        <path d="M11 19h18" stroke="#10B981" strokeWidth="1.8"/>
        <path d="M15 23h4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: '#10B981',
    action: null
  },
  {
    number: '04',
    title: 'Ürün Kapınıza, Montajcı Devreye Girer',
    desc: 'Siparişiniz anlaşmalı kargo ile hızlıca gönderilir. Kurulum seçtiyseniz, ödeme sonrası seçtiğiniz montaj ekibine bilgi gider ve sizinle iletişime geçer. Ürün de ustası da tek yerden.',
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
    q: 'Hangi ürünü alacağımı bilmiyorum, ne yapmalıyım?',
    a: 'Ücretsiz Teklif Hazırlayıcı aracımızı kullanın. Binanızın altyapısı, daire ve kapı sayısına göre size en uygun sistemi ve tahmini fiyatı saniyeler içinde öneriyoruz. Emin değilseniz WhatsApp hattımızdan da danışabilirsiniz.'
  },
  {
    q: 'Görüntüsüz diyafonumu görüntülüye çevirebilir miyim?',
    a: 'Evet. Türkiye\'deki çoğu binada bulunan DT8 altyapısını değiştirmeden, mevcut sisteminizi görüntülü diyafona çevirebilirsiniz. Teklif Hazırlayıcı\'da "Görüntüsüz → Görüntülü" seçeneğini kullanın.'
  },
  {
    q: 'Montajı kim yapacak?',
    a: 'Satın alma sırasında kurulum isterseniz, şehrinizdeki puanlı montaj ekiplerini gösteririz. Dilediğinizi seçersiniz, ödeme sonrası size ulaşır. Montaj ücreti doğrudan usta ile aranızdadır; Smartdiafon ürün satışı dışında bir ücret almaz.'
  },
  {
    q: 'Ödeme yöntemleri nelerdir?',
    a: 'Kredi kartı (taksit seçeneğiyle) ve banka havalesi / EFT ile güvenli ödeme yapabilirsiniz.'
  },
  {
    q: 'Kargo süresi ne kadar?',
    a: 'Stoktaki ürünler genellikle 1-3 iş günü içinde kargoya verilir, kargo teslimatı 1-2 iş günü sürer.'
  },
  {
    q: 'Siparişimi iptal edebilir miyim?',
    a: 'Ürün kargoya verilmeden önce iptal mümkündür. İade ve cayma haklarınız için İade Koşulları sayfamızı inceleyebilirsiniz.'
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
            <p className="text-[11px] tracking-[2.5px] uppercase font-bold text-[#F4821F] mb-3">Rehber</p>
            <h1 className="text-[36px] md:text-[48px] font-black tracking-[-1.5px] mb-4" style={{ color: 'var(--text-primary)' }}>
              Nasıl Sipariş Verebilirim?
            </h1>
            <p className="text-[16px] max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Ürünü de ustası da tek yerden. Elektrikçi elektrikçi dolaşmadan, 4 basit adımda diyafonunuz kapınıza gelir.
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
                        {step.action.label} →
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
              Sık Sorulan Sorular
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
            Hâlâ sorunuz mu var?
          </h2>
          <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
            Uzman ekibimiz size yardımcı olmaktan mutluluk duyar.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/iletisim"
              className="px-6 py-3 rounded-xl text-[13px] font-bold text-white"
              style={{ background: '#F4821F' }}>
              İletişime Geç
            </Link>
            <Link href="/teklif"
              className="px-6 py-3 rounded-xl text-[13px] font-bold"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', background: 'var(--bg-card)' }}>
              Ücretsiz Teklif Al
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}