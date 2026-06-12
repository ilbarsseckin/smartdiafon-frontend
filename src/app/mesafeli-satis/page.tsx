import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { FileText, ShieldCheck, Package, CreditCard, Truck, Phone } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Mesafeli Satýþ Sözleþmesi | baskiurunleri.com',
  description: 'baskiurunleri.com mesafeli satýþ sözleþmesi. 6502 sayýlý Tüketicinin Korunmasý Hakkýnda Kanun kapsamýnda hazýrlanmýþtýr.',
}

export default function MesafeliSatisPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">

          {/* Baþlýk */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold uppercase tracking-[2px]"
              style={{ background: 'rgba(244,130,31,0.1)', color: '#DC2626' }}>
              <FileText size={14} />
              Yasal Belge
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-black tracking-[-1px] mb-3"
              style={{ color: 'var(--text-primary)' }}>
              Mesafeli Satýþ Sözleþmesi
            </h1>
            <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
              6502 sayýlý Tüketicinin Korunmasý Hakkýnda Kanun ve Mesafeli Sözleþmeler Yönetmeliði kapsamýnda hazýrlanmýþtýr.
            </p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>Son güncelleme: Haziran 2026</p>
          </div>

          <div className="space-y-4 text-[13px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>

            {/* Madde 1 */}
            <Section title="MADDE 1 – TARAFLAR" icon={ShieldCheck}>
              <p><strong>SATICI:</strong></p>
              <p>Ünvaný: baskiurunleri.com</p>
              <p>Adresi: Ýkitelli Organize Sanayi Bölgesi, Ýstanbul</p>
              <p>E-posta: info@baskiurunleri.com</p>
              <p>Telefon: +90 212 555 55 55</p>
              <br />
              <p><strong>ALICI:</strong></p>
              <p>Sipariþ formunda belirtilen ad, adres ve iletiþim bilgilerine sahip kiþi.</p>
            </Section>

            {/* Madde 2 */}
            <Section title="MADDE 2 – KONU" icon={Package}>
              <p>
                Ýþbu sözleþme, ALICI'nýn SATICI'ya ait baskiurunleri.com internet sitesi üzerinden elektronik ortamda sipariþini
                verdiði aþaðýda nitelikleri ve satýþ fiyatý belirtilen ürünün satýþý ve teslimi ile ilgili olarak 6502 sayýlý
                Tüketicinin Korunmasý Hakkýnda Kanun ve Mesafeli Sözleþmelere Dair Yönetmelik hükümleri gereðince taraflarýn
                hak ve yükümlülüklerini kapsar.
              </p>
            </Section>

            {/* Madde 3 */}
            <Section title="MADDE 3 – ÜRÜN BÝLGÝLERÝ" icon={Package}>
              <p>
                Sözleþme konusu ürün/ürünler, sipariþ özetinde belirtilen ve ALICI tarafýndan seçilen katalog ürünleridir.
                Ürünlerin temel özellikleri (tür, miktar, marka/model, renk, ebat vb.) ürün sayfasýnda ve sipariþ özetinde
                yer almaktadýr. Ürünler, ALICI'nýn yüklediði veya onayladýðý tasarýma göre özel olarak üretilmektedir.
              </p>
            </Section>

            {/* Madde 4 */}
            <Section title="MADDE 4 – SATIÞ FÝYATI VE ÖDEME" icon={CreditCard}>
              <p>
                Ürünün KDV dahil satýþ fiyatý sipariþ özetinde gösterilmektedir. Ödeme; kredi kartý, banka kartý veya
                diðer elektronik ödeme yöntemleriyle yapýlabilir. Ödeme iþlemi iyzico altyapýsý üzerinden 256-bit SSL
                þifreleme ile güvenli þekilde gerçekleþtirilir. Kart bilgileri SATICI tarafýndan saklanmaz.
              </p>
              <p className="mt-2">
                Taksitli alýmlarda ilgili banka taksit koþullarý geçerlidir. Sipariþ toplamý, seçilen taksit sayýsýna
                bölünerek banka tarafýndan tahsil edilir.
              </p>
            </Section>

            {/* Madde 5 */}
            <Section title="MADDE 5 – TESLÝMAT" icon={Truck}>
              <p>
                Ürünler, ödeme onayýnýn ardýndan tasarým onay sürecinin tamamlanmasýný takiben üretilir ve kargo firmasý
                aracýlýðýyla ALICI'nýn belirttiði adrese teslim edilir. Teslimat süresi ortalama 3-7 iþ günüdür;
                bu süre sipariþ yoðunluðuna ve kargo firmasýna göre deðiþebilir.
              </p>
              <p className="mt-2">
                Teslimat adresi ALICI tarafýndan sipariþ formunda beyan edilmiþ olup hatalý veya eksik adres bilgisinden
                kaynaklanan gecikmeler SATICI'nýn sorumluluðunda deðildir.
              </p>
            </Section>

            {/* Madde 6 */}
            <Section title="MADDE 6 – CAYMA HAKKI" icon={ShieldCheck}>
              <p>
                6502 sayýlý Kanun'un 15. maddesi ve Mesafeli Sözleþmeler Yönetmeliði'nin 16. maddesi uyarýnca;
                tüketicinin istekleri veya açýkça onun kiþisel ihtiyaçlarý doðrultusunda hazýrlanan, niteliði
                itibarýyla geri gönderilmeye elveriþli olmayan ve çabuk bozulma tehlikesi olan mallarda cayma
                hakký kullanýlamaz.
              </p>
              <p className="mt-2">
                Baskiurunleri.com'da satýlan tüm ürünler, ALICI'nýn saðladýðý veya onayladýðý tasarýma göre
                özel üretim olduðundan <strong>cayma hakký kullanýlamaz.</strong>
              </p>
              <p className="mt-2">
                Ancak aþaðýdaki durumlarda ALICI, ürünü teslim aldýðý tarihten itibaren <strong>3 iþ günü</strong> içinde
                þikâyetini bildirerek yeniden üretim veya iade talep edebilir:
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>SATICI'dan kaynaklanan üretim veya baský hatasý</li>
                <li>Sipariþ edilenden farklý ürün gönderilmesi</li>
                <li>Kargo sýrasýnda oluþan ve tutanakla belgelenen hasar</li>
              </ul>
            </Section>

            {/* Madde 7 */}
            <Section title="MADDE 7 – GÝZLÝLÝK" icon={ShieldCheck}>
              <p>
                ALICI'ya ait kiþisel bilgiler, 6698 sayýlý Kiþisel Verilerin Korunmasý Kanunu kapsamýnda iþlenir
                ve üçüncü þahýslarla paylaþýlmaz. Ayrýntýlý bilgi için{' '}
                <Link href="/gizlilik" className="underline hover:text-[#DC2626]">Gizlilik Politikamýzý</Link>
                {' '}inceleyebilirsiniz.
              </p>
            </Section>

            {/* Madde 8 */}
            <Section title="MADDE 8 – UYUÞMAZLIKLARIN ÇÖZÜMÜ" icon={ShieldCheck}>
              <p>
                Ýþbu sözleþmeden doðabilecek uyuþmazlýklarda, ALICI'nýn ikametgahýndaki veya satýn alma iþleminin
                yapýldýðý yerdeki Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir. Baþvuru sýnýrlarý
                her yýl Gümrük ve Ticaret Bakanlýðý tarafýndan güncellenmektedir.
              </p>
            </Section>

            {/* Madde 9 */}
            <Section title="MADDE 9 – YÜRÜRLÜK" icon={ShieldCheck}>
              <p>
                ALICI, sipariþ iþlemini tamamlayarak bu sözleþmeyi okuduðunu, anladýðýný ve tüm hükümlerini
                kabul ettiðini beyan eder. Sözleþme, sipariþin SATICI tarafýndan onaylanmasýyla yürürlüðe girer.
              </p>
            </Section>

          </div>

          {/* Ýletiþim */}
          <div className="mt-8 rounded-2xl p-6 text-center"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <Phone size={20} className="mx-auto mb-2" style={{ color: '#DC2626' }} />
            <p className="text-[14px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Sorularýnýz mý var?</p>
            <p className="text-[12px] mb-3" style={{ color: 'var(--text-muted)' }}>
              Sözleþme hakkýnda bilgi almak için bize ulaþýn.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a href="mailto:info@baskiurunleri.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white"
                style={{ background: '#DC2626' }}>
                info@baskiurunleri.com
              </a>
              <Link href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                Ýletiþim Formu
              </Link>
            </div>
          </div>

          <p className="text-center text-[11px] mt-6" style={{ color: 'var(--text-muted)' }}>
            Bu sözleþme 6502 sayýlý Tüketicinin Korunmasý Hakkýnda Kanun ve Mesafeli Sözleþmeler Yönetmeliði kapsamýnda hazýrlanmýþtýr.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(244,130,31,0.04)' }}>
        <Icon size={15} style={{ color: '#DC2626', flexShrink: 0 }} />
        <h2 className="text-[13px] font-black" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      <div className="px-5 py-4 text-[13px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </div>
  )
}
