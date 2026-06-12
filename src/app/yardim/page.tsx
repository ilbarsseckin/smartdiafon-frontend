'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  ShoppingBag, Wrench, UserCircle, CreditCard, XCircle, Package,
  Tag, Shield, MessageCircle, Phone, ChevronDown, HelpCircle, Search,
} from 'lucide-react'

const quickCards = [
  { icon: ShoppingBag, title: 'Sipariş Süreçleri', desc: 'Nasıl sipariş verilir?', color: '#F4821F', href: '/nasil-siparis' },
  { icon: Tag, title: 'Teklif & Fiyat', desc: 'Proje teklifi hesaplama', color: '#D97706', href: '/teklif' },
  { icon: Wrench, title: 'Kurulum & Montaj', desc: 'Montaj ekibi desteği', color: '#16a34a', href: '/kurulum-ekibi' },
  { icon: UserCircle, title: 'Üyelik & Hesap', desc: 'Hesap işlemleri', color: '#2563eb', href: '/hesabim' },
  { icon: CreditCard, title: 'Ödeme & Fatura', desc: 'Ödeme yöntemleri', color: '#9333ea', href: '#odeme' },
  { icon: Shield, title: 'Garanti', desc: 'Ürün garanti şartları', color: '#0891b2', href: '#garanti' },
  { icon: Package, title: 'Ürün Bilgileri', desc: 'Sistem ve ürün özellikleri', color: '#db2777', href: '/urunler' },
  { icon: XCircle, title: 'İptal & İade', desc: 'İade koşulları', color: '#059669', href: '#iade' },
]

const faqs = [
  { q: 'Hangi diyafon sistemini seçmeliyim?', a: 'Mevcut altyapınıza göre değişir: Eski binalarda DT8 kablo varsa Multibus, yeni binalarda Cat5/Cat6 ethernet altyapısı varsa IP veya Linux interkom sistemleri önerilir. Teklif hesaplama aracımızdan üç sistemi karşılaştırabilirsiniz.' },
  { q: 'Görüntüsüz diyafonumu görüntülüye çevirebilir miyim?', a: 'Evet. Mevcut altyapınıza uygun bir görüntülü diyafon sistemi ile yükseltme yapılabilir. Çoğu durumda mevcut kablolama korunarak monitör ve kapı paneli değişimi yeterlidir.' },
  { q: 'DiafonBox nedir, ne işe yarar?', a: 'DiafonBox, binanızdaki diyafon sistemini cep telefonunuza bağlayan bir cihazdır. Evde olmasanız bile kapı zilini telefonunuzdan görüp cevaplayabilir, kapıyı açabilirsiniz. Yalnızca Multibus (DT8) sistemlerle çalışır.' },
  { q: 'Proje için nasıl teklif alabilirim?', a: 'Teklif Hazırla sayfasından daire, kapı ve blok sayınızı girerek saniyeler içinde ekonomik, standart ve premium paket tekliflerini görebilirsiniz. Dilerseniz ürünleri kendiniz de seçebilirsiniz.' },
  { q: 'Kurulum ve montaj hizmeti veriyor musunuz?', a: 'Teklif aldıktan sonra "Kurulum ve Montaj da İstiyorum" seçeneğini işaretlerseniz, bölgenizdeki yetkili montaj ekibimiz sizinle iletişime geçer. İstanbul ve çevresinde kurulum ekibimiz hazırdır.' },
  { q: 'Ürünler orijinal mi, garantili mi?', a: 'Tüm ürünlerimiz Multitek yetkili satıcısı olarak orijinaldir ve üretici garantisi kapsamındadır. Garanti süresi ve şartları ürüne göre değişir, ürün sayfasında belirtilir.' },
  { q: 'Siparişimi nasıl takip edebilirim?', a: 'Hesabım > Siparişlerim sayfasından siparişinizin güncel durumunu görebilirsiniz. Kargoya verildiğinde takip numarası eklenir ve kargo firmasının sayfasından takip edebilirsiniz.' },
  { q: 'Siparişim ne zaman elime ulaşır?', a: 'Stokta bulunan ürünler sipariş onayından sonra genellikle aynı gün veya ertesi gün kargoya verilir. Kargo süresi bulunduğunuz şehre göre 1-3 iş günü arasında değişir.' },
  { q: 'Ödeme yöntemleri nelerdir?', a: 'iyzico altyapısı ile güvenli kredi kartı ve banka kartı ödemesi kabul ediyoruz. Tüm kartlara taksit imkânı sunulmaktadır.' },
  { q: 'Faturamı nasıl alabilirim?', a: 'Siparişiniz tamamlandığında e-faturanız kayıtlı e-posta adresinize gönderilir. Kurumsal fatura için sipariş sırasında firma bilgilerinizi girmeniz yeterlidir.' },
  { q: 'Montaj ekibi olarak nasıl başvurabilirim?', a: 'Diyafon, interkom ve güvenlik sistemleri montajında uzmansanız "Kurulum ve Montaj Ekibine Katıl" sayfasından başvurabilirsiniz. Bölgenizden gelen kurulum taleplerini size yönlendiririz.' },
  { q: 'Apartmanım için kaç monitör ve panel gerekir?', a: 'Genel kural: her daireye 1 monitör, her bina girişine (bahçe, otopark dahil) 1 kapı paneli gerekir. Teklif aracımız daire ve kapı sayınıza göre adetleri otomatik hesaplar.' },
]

export default function YardimPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const filteredFaqs = faqs.filter(f =>
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: 'var(--bg-secondary)' }}>

        {/* Hero */}
        <div style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{ background: 'rgba(244,130,31,0.1)' }}>
              <HelpCircle size={28} style={{ color: '#F4821F' }} />
            </div>
            <h1 className="text-[28px] sm:text-[36px] font-black tracking-tight mb-3"
              style={{ color: 'var(--text-primary)' }}>
              Size nasıl yardımcı olabiliriz?
            </h1>
            <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
              Aradığınız cevabı bulamadıysanız bizimle iletişime geçin.
            </p>
            {/* Arama */}
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Yardım konusu ara..."
                className="w-full pl-11 pr-4 py-3 text-[14px] rounded-xl outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10">

          {/* Hızlı erişim kartları */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {quickCards.map((card, i) => (
              <Link key={i} href={card.href}
                className="rounded-2xl p-5 text-center transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${card.color}15` }}>
                  <card.icon size={22} style={{ color: card.color }} />
                </div>
                <h3 className="text-[13px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {card.title}
                </h3>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>

          {/* Popüler Yardım Konuları */}
          <h2 className="text-[20px] font-black mb-5" style={{ color: 'var(--text-primary)' }}>
            Popüler Yardım Konuları
          </h2>
          <div className="space-y-2 mb-12">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-10 rounded-xl"
                style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)' }}>
                <p className="text-[14px]" style={{ color: 'var(--text-muted)' }}>
                  "{search}" ile ilgili sonuç bulunamadı
                </p>
              </div>
            ) : filteredFaqs.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <button
                  className="w-full flex items-center justify-between p-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-[14px] font-semibold pr-4" style={{ color: 'var(--text-primary)' }}>
                    {faq.q}
                  </span>
                  <ChevronDown size={16}
                    className={`flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    style={{ color: '#F4821F' }} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-[13px] leading-relaxed"
                    style={{ color: 'var(--text-secondary)', borderTop: '1px solid var(--border)' }}>
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* İletişim kutuları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/iletisim"
              className="rounded-2xl p-6 transition-all hover:shadow-lg"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'rgba(244,130,31,0.1)' }}>
                <MessageCircle size={20} style={{ color: '#F4821F' }} />
              </div>
              <h3 className="text-[15px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                İletişim Formu
              </h3>
              <p className="text-[12px] mb-3" style={{ color: 'var(--text-secondary)' }}>
                Sorularınızı bize iletin, en kısa sürede dönüş yapalım.
              </p>
              <span className="text-[12px] font-bold" style={{ color: '#F4821F' }}>
                BİZE YAZIN →
              </span>
            </Link>

            <a href="https://wa.me/905550000000" target="_blank" rel="noopener noreferrer"
              className="rounded-2xl p-6 transition-all hover:shadow-lg"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'rgba(37,211,102,0.1)' }}>
                <Phone size={20} style={{ color: '#25D366' }} />
              </div>
              <h3 className="text-[15px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                WhatsApp Destek
              </h3>
              <p className="text-[12px] mb-3" style={{ color: 'var(--text-secondary)' }}>
                Hızlı yanıt için WhatsApp üzerinden bize ulaşın.
              </p>
              <span className="text-[12px] font-bold" style={{ color: '#25D366' }}>
                BİZE ULAŞIN →
              </span>
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
