import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { FileText, ShieldCheck, Package, CreditCard, Truck, Phone } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Mesafeli Sat�� S�zle�mesi | baskiurunleri.com',
  description: 'baskiurunleri.com mesafeli sat�� s�zle�mesi. 6502 say�l� T�keticinin Korunmas� Hakk�nda Kanun kapsam�nda haz�rlanm��t�r.',
}

export default function MesafeliSatisPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">

          {/* Ba�l�k */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold uppercase tracking-[2px]"
              style={{ background: 'rgba(244,130,31,0.1)', color: '#F4821F' }}>
              <FileText size={14} />
              Yasal Belge
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-black tracking-[-1px] mb-3"
              style={{ color: 'var(--text-primary)' }}>
              Mesafeli Sat�� S�zle�mesi
            </h1>
            <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
              6502 say�l� T�keticinin Korunmas� Hakk�nda Kanun ve Mesafeli S�zle�meler Y�netmeli�i kapsam�nda haz�rlanm��t�r.
            </p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>Son g�ncelleme: Haziran 2026</p>
          </div>

          <div className="space-y-4 text-[13px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>

            {/* Madde 1 */}
            <Section title="MADDE 1 � TARAFLAR" icon={ShieldCheck}>
              <p><strong>SATICI:</strong></p>
              <p>�nvan�: baskiurunleri.com</p>
              <p>Adresi: �kitelli Organize Sanayi B�lgesi, �stanbul</p>
              <p>E-posta: info@baskiurunleri.com</p>
              <p>Telefon: +90 212 555 55 55</p>
              <br />
              <p><strong>ALICI:</strong></p>
              <p>Sipari� formunda belirtilen ad, adres ve ileti�im bilgilerine sahip ki�i.</p>
            </Section>

            {/* Madde 2 */}
            <Section title="MADDE 2 � KONU" icon={Package}>
              <p>
                ��bu s�zle�me, ALICI'n�n SATICI'ya ait baskiurunleri.com internet sitesi �zerinden elektronik ortamda sipari�ini
                verdi�i a�a��da nitelikleri ve sat�� fiyat� belirtilen �r�n�n sat��� ve teslimi ile ilgili olarak 6502 say�l�
                T�keticinin Korunmas� Hakk�nda Kanun ve Mesafeli S�zle�melere Dair Y�netmelik h�k�mleri gere�ince taraflar�n
                hak ve y�k�ml�l�klerini kapsar.
              </p>
            </Section>

            {/* Madde 3 */}
            <Section title="MADDE 3 � �R�N B�LG�LER�" icon={Package}>
              <p>
                S�zle�me konusu �r�n/�r�nler, sipari� �zetinde belirtilen ve ALICI taraf�ndan se�ilen katalog �r�nleridir.
                �r�nlerin temel �zellikleri (t�r, miktar, marka/model, renk, ebat vb.) �r�n sayfas�nda ve sipari� �zetinde
                yer almaktad�r. �r�nler, ALICI'n�n y�kledi�i veya onaylad��� tasar�ma g�re �zel olarak �retilmektedir.
              </p>
            </Section>

            {/* Madde 4 */}
            <Section title="MADDE 4 � SATI� F�YATI VE �DEME" icon={CreditCard}>
              <p>
                �r�n�n KDV dahil sat�� fiyat� sipari� �zetinde g�sterilmektedir. �deme; kredi kart�, banka kart� veya
                di�er elektronik �deme y�ntemleriyle yap�labilir. �deme i�lemi iyzico altyap�s� �zerinden 256-bit SSL
                �ifreleme ile g�venli �ekilde ger�ekle�tirilir. Kart bilgileri SATICI taraf�ndan saklanmaz.
              </p>
              <p className="mt-2">
                Taksitli al�mlarda ilgili banka taksit ko�ullar� ge�erlidir. Sipari� toplam�, se�ilen taksit say�s�na
                b�l�nerek banka taraf�ndan tahsil edilir.
              </p>
            </Section>

            {/* Madde 5 */}
            <Section title="MADDE 5 � TESL�MAT" icon={Truck}>
              <p>
                �r�nler, �deme onay�n�n ard�ndan tasar�m onay s�recinin tamamlanmas�n� takiben �retilir ve kargo firmas�
                arac�l���yla ALICI'n�n belirtti�i adrese teslim edilir. Teslimat s�resi ortalama 3-7 i� g�n�d�r;
                bu s�re sipari� yo�unlu�una ve kargo firmas�na g�re de�i�ebilir.
              </p>
              <p className="mt-2">
                Teslimat adresi ALICI taraf�ndan sipari� formunda beyan edilmi� olup hatal� veya eksik adres bilgisinden
                kaynaklanan gecikmeler SATICI'n�n sorumlulu�unda de�ildir.
              </p>
            </Section>

            {/* Madde 6 */}
            <Section title="MADDE 6 � CAYMA HAKKI" icon={ShieldCheck}>
              <p>
                6502 say�l� Kanun'un 15. maddesi ve Mesafeli S�zle�meler Y�netmeli�i'nin 16. maddesi uyar�nca;
                t�keticinin istekleri veya a��k�a onun ki�isel ihtiya�lar� do�rultusunda haz�rlanan, niteli�i
                itibar�yla geri g�nderilmeye elveri�li olmayan ve �abuk bozulma tehlikesi olan mallarda cayma
                hakk� kullan�lamaz.
              </p>
              <p className="mt-2">
                Baskiurunleri.com'da sat�lan t�m �r�nler, ALICI'n�n sa�lad��� veya onaylad��� tasar�ma g�re
                �zel �retim oldu�undan <strong>cayma hakk� kullan�lamaz.</strong>
              </p>
              <p className="mt-2">
                Ancak a�a��daki durumlarda ALICI, �r�n� teslim ald��� tarihten itibaren <strong>3 i� g�n�</strong> i�inde
                �ik�yetini bildirerek yeniden �retim veya iade talep edebilir:
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>SATICI'dan kaynaklanan �retim veya bask� hatas�</li>
                <li>Sipari� edilenden farkl� �r�n g�nderilmesi</li>
                <li>Kargo s�ras�nda olu�an ve tutanakla belgelenen hasar</li>
              </ul>
            </Section>

            {/* Madde 7 */}
            <Section title="MADDE 7 � G�ZL�L�K" icon={ShieldCheck}>
              <p>
                ALICI'ya ait ki�isel bilgiler, 6698 say�l� Ki�isel Verilerin Korunmas� Kanunu kapsam�nda i�lenir
                ve ���nc� �ah�slarla payla��lmaz. Ayr�nt�l� bilgi i�in{' '}
                <Link href="/gizlilik" className="underline hover:text-[#F4821F]">Gizlilik Politikam�z�</Link>
                {' '}inceleyebilirsiniz.
              </p>
            </Section>

            {/* Madde 8 */}
            <Section title="MADDE 8 � UYU�MAZLIKLARIN ��Z�M�" icon={ShieldCheck}>
              <p>
                ��bu s�zle�meden do�abilecek uyu�mazl�klarda, ALICI'n�n ikametgah�ndaki veya sat�n alma i�leminin
                yap�ld��� yerdeki T�ketici Hakem Heyetleri ve T�ketici Mahkemeleri yetkilidir. Ba�vuru s�n�rlar�
                her y�l G�mr�k ve Ticaret Bakanl��� taraf�ndan g�ncellenmektedir.
              </p>
            </Section>

            {/* Madde 9 */}
            <Section title="MADDE 9 � Y�R�RL�K" icon={ShieldCheck}>
              <p>
                ALICI, sipari� i�lemini tamamlayarak bu s�zle�meyi okudu�unu, anlad���n� ve t�m h�k�mlerini
                kabul etti�ini beyan eder. S�zle�me, sipari�in SATICI taraf�ndan onaylanmas�yla y�r�rl��e girer.
              </p>
            </Section>

          </div>

          {/* �leti�im */}
          <div className="mt-8 rounded-2xl p-6 text-center"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <Phone size={20} className="mx-auto mb-2" style={{ color: '#F4821F' }} />
            <p className="text-[14px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Sorular�n�z m� var?</p>
            <p className="text-[12px] mb-3" style={{ color: 'var(--text-muted)' }}>
              S�zle�me hakk�nda bilgi almak i�in bize ula��n.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a href="mailto:info@baskiurunleri.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white"
                style={{ background: '#F4821F' }}>
                info@baskiurunleri.com
              </a>
              <Link href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                �leti�im Formu
              </Link>
            </div>
          </div>

          <p className="text-center text-[11px] mt-6" style={{ color: 'var(--text-muted)' }}>
            Bu s�zle�me 6502 say�l� T�keticinin Korunmas� Hakk�nda Kanun ve Mesafeli S�zle�meler Y�netmeli�i kapsam�nda haz�rlanm��t�r.
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
        <Icon size={15} style={{ color: '#F4821F', flexShrink: 0 }} />
        <h2 className="text-[13px] font-black" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      <div className="px-5 py-4 text-[13px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </div>
  )
}
