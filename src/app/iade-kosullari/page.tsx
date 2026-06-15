import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ShieldCheck, AlertCircle, CheckCircle, XCircle, Clock, Phone } from 'lucide-react'

export const metadata = {
  title: 'İptal ve İade Koşulları | Smartdiafon',
  description: 'Smartdiafon.com iptal, iade ve cayma hakkı koşulları. Diyafon, interkom ve güvenlik sistemi ürünlerinde iade politikamız.',
}

const sections = [
  {
    icon: ShieldCheck,
    color: '#DC2626',
    title: '1. Genel Bilgi',
    content: `Smartdiafon.com üzerinden satın aldığınız diyafon, interkom, DiafonBox ve güvenlik sistemi ürünleri, Mesafeli Satış Sözleşmesi kapsamında değerlendirilmektedir.

6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri çerçevesinde; standart stok ürünlerde 14 günlük cayma hakkınız bulunmaktadır. Kurulum gerektiren veya kişiye özel yapılandırılan ürünlerde bu hak aşağıdaki koşullara tabidir.`,
  },
  {
    icon: XCircle,
    color: '#DC2626',
    title: '2. Cayma Hakkı Kullanılamayan Durumlar',
    content: `Aşağıdaki durumlarda cayma hakkı ve iade talepleri kabul edilmez:

• Kurulum ve montajı tamamlanmış diyafon, interkom veya güvenlik sistemleri
• Müşteri talebiyle özel yapılandırılmış ya da programlanmış cihazlar
• Ambalajı açılmış ve kullanılmış elektronik ürünler (hijyen ve teknik güvenlik gerekçesiyle)
• Müşteri kaynaklı fiziksel hasar veya yanlış kullanım
• Yazılım lisansı aktivasyonu tamamlanmış ürünler`,
  },
  {
    icon: CheckCircle,
    color: '#16A34A',
    title: '3. İade Kabul Edilen Durumlar',
    content: `Aşağıdaki durumlarda ücretsiz değişim veya iade hakkınız bulunmaktadır:

• Tarafımızdan kaynaklanan üretim veya sevkiyat hatası (yanlış ürün, eksik parça)
• Kargo sırasında meydana gelen fiziksel hasar (kargo firmasından tutanak alınmış olması şartıyla)
• Garanti kapsamında arıza (2 yıl içinde)
• Ürünün ilan edilen teknik özelliklerini karşılamaması

Bu durumlarda iade veya değişim tamamen ücretsizdir.`,
  },
  {
    icon: Clock,
    color: '#2563EB',
    title: '4. Şikayet ve İade Süreci',
    content: `Ürününüzü teslim aldıktan sonra:

1. Ürünü teslim aldığınız gün kontrol edin
2. Sorun tespit etmeniz halinde 3 iş günü içinde bize ulaşın
3. Sorunu gösteren fotoğraf veya video gönderin
4. Sipariş numaranızı bildirin

3 iş günü geçtikten sonra yapılan hasar şikayetleri değerlendirilemez.

Garanti kapsamındaki arızalar için süre, teslim tarihinden itibaren 2 yıldır.

Bize ulaşmak için:
• WhatsApp: 0552 230 33 33
• E-posta: info@smartdiafon.com.tr
• Canlı destek: smartdiafon.com`,
  },
  {
    icon: AlertCircle,
    color: '#F59E0B',
    title: '5. Kurulum Hizmeti',
    content: `Kurulum hizmeti satın alındığında:

• Kurulum ekibimiz randevu günü ve saatinde adreste hazır bulunur
• Kurulum tamamlandıktan sonra hizmet bedeli iade edilmez
• Randevu iptali en az 24 saat önceden bildirilmelidir; geç iptal durumunda hizmet bedeli kesilir
• Teknik arızadan kaynaklanan yeniden kurulum ziyareti ücretsizdir`,
  },
  {
    icon: ShieldCheck,
    color: '#6366F1',
    title: '6. Garanti Koşulları',
    content: `Tüm Multitek ve DiafonBox ürünleri 2 yıl üretici garantisi kapsamındadır.

• Garanti; üretim hatalarını, malzeme kusurlarını ve fabrika arızalarını kapsar
• Fiziksel hasar, nem/su teması, aşırı gerilim ve yetkisiz müdahale garantiyi geçersiz kılar
• Garanti servisi için ürünü kargolayabilir veya teknik ekibimizden destek talep edebilirsiniz
• Garanti kapsamı dışındaki onarımlar için ücret teklifi sunulur; onayınız alınmadan işlem yapılmaz`,
  },
]

export default function IadeKosullariPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">

          {/* Başlık */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold uppercase tracking-[2px]"
              style={{ background: 'rgba(244,130,31,0.1)', color: '#DC2626' }}>
              <ShieldCheck size={14} />
              Tüketici Hakları
            </div>
            <h1 className="text-[28px] sm:text-[36px] font-black tracking-[-1px] mb-3"
              style={{ color: 'var(--text-primary)' }}>
              İptal ve İade Koşulları
            </h1>
            <p className="text-[14px] leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Smartdiafon'dan satın aldığınız diyafon, interkom ve güvenlik sistemi ürünlerine ait iade ve garanti koşulları.
            </p>
            <p className="text-[12px] mt-2" style={{ color: 'var(--text-muted)' }}>
              Son güncelleme: Haziran 2026
            </p>
          </div>

          {/* Özet kartlar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)' }}>
              <CheckCircle size={24} className="mx-auto mb-2 text-green-600" />
              <p className="text-[13px] font-bold text-green-700">14 Gün Cayma</p>
              <p className="text-[11px] mt-1 text-green-600">Stok ürünlerde geçerli</p>
            </div>
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <ShieldCheck size={24} className="mx-auto mb-2" style={{ color: '#6366F1' }} />
              <p className="text-[13px] font-bold" style={{ color: '#4F46E5' }}>2 Yıl Garanti</p>
              <p className="text-[11px] mt-1" style={{ color: '#6366F1' }}>Tüm Multitek ürünler</p>
            </div>
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
              <Clock size={24} className="mx-auto mb-2 text-blue-600" />
              <p className="text-[13px] font-bold text-blue-700">3 İş Günü</p>
              <p className="text-[11px] mt-1 text-blue-600">Hasar bildirimi süresi</p>
            </div>
          </div>

          {/* Bölümler */}
          <div className="space-y-4">
            {sections.map((s, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3 px-5 py-4"
                  style={{ borderBottom: '1px solid var(--border)', background: `${s.color}08` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}15` }}>
                    <s.icon size={18} style={{ color: s.color }} />
                  </div>
                  <h2 className="text-[15px] font-black" style={{ color: 'var(--text-primary)' }}>
                    {s.title}
                  </h2>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[13px] leading-[1.8] whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                    {s.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* İletişim CTA */}
          <div className="mt-8 rounded-2xl p-6 text-center"
            style={{ background: 'linear-gradient(135deg, #DC2626, #e07010)' }}>
            <Phone size={24} className="mx-auto mb-3 text-white" />
            <h3 className="text-[18px] font-black text-white mb-2">Sorunuz mu var?</h3>
            <p className="text-[13px] text-white/80 mb-4">
              İade ve garanti süreçleri için WhatsApp destek hattımıza ulaşabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/905522303333"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold bg-white text-[#DC2626] hover:opacity-90 transition-all">
                WhatsApp ile Ulaş
              </a>
              <Link href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                İletişim Formu
              </Link>
            </div>
          </div>

          <p className="text-center text-[11px] mt-6" style={{ color: 'var(--text-muted)' }}>
            Bu sayfa 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili yönetmelikler çerçevesinde hazırlanmıştır.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}