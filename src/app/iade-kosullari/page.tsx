import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ShieldCheck, AlertCircle, CheckCircle, XCircle, Clock, Phone } from 'lucide-react'

export const metadata = {
  title: '�ptal ve �ade Ko�ullar� | Smartdiafon',
  description: 'Smartdiafon.com iptal, iade ve cayma hakk� ko�ullar�. Diyafon, interkom ve g�venlik sistemi �r�nlerinde iade politikam�z.',
}

const sections = [
  {
    icon: ShieldCheck,
    color: '#DC2626',
    title: '1. Genel Bilgi',
    content: `Smartdiafon.com �zerinden sat�n ald���n�z diyafon, interkom, DiafonBox ve g�venlik sistemi �r�nleri, Mesafeli Sat�� S�zle�mesi kapsam�nda de�erlendirilmektedir.

6502 say�l� T�keticinin Korunmas� Hakk�nda Kanun ve Mesafeli S�zle�meler Y�netmeli�i h�k�mleri �er�evesinde; standart stok �r�nlerde 14 g�nl�k cayma hakk�n�z bulunmaktad�r. Kurulum gerektiren veya ki�iye �zel yap�land�r�lan �r�nlerde bu hak a�a��daki ko�ullara tabidir.`,
  },
  {
    icon: XCircle,
    color: '#DC2626',
    title: '2. Cayma Hakk� Kullan�lamayan Durumlar',
    content: `A�a��daki durumlarda cayma hakk� ve iade talepleri kabul edilmez:

� Kurulum ve montaj� tamamlanm�� diyafon, interkom veya g�venlik sistemleri
� M��teri talebiyle �zel yap�land�r�lm�� ya da programlanm�� cihazlar
� Ambalaj� a��lm�� ve kullan�lm�� elektronik �r�nler (hijyen ve teknik g�venlik gerek�esiyle)
� M��teri kaynakl� fiziksel hasar veya yanl�� kullan�m
� Yaz�l�m lisans� aktivasyonu tamamlanm�� �r�nler`,
  },
  {
    icon: CheckCircle,
    color: '#16A34A',
    title: '3. �ade Kabul Edilen Durumlar',
    content: `A�a��daki durumlarda �cretsiz de�i�im veya iade hakk�n�z bulunmaktad�r:

� Taraf�m�zdan kaynaklanan �retim veya sevkiyat hatas� (yanl�� �r�n, eksik par�a)
� Kargo s�ras�nda meydana gelen fiziksel hasar (kargo firmas�ndan tutanak al�nm�� olmas� �art�yla)
� Garanti kapsam�nda ar�za (2 y�l i�inde)
� �r�n�n ilan edilen teknik �zelliklerini kar��lamamas�

Bu durumlarda iade veya de�i�im tamamen �cretsizdir.`,
  },
  {
    icon: Clock,
    color: '#2563EB',
    title: '4. �ikayet ve �ade S�reci',
    content: `�r�n�n�z� teslim ald�ktan sonra:

1. �r�n� teslim ald���n�z g�n kontrol edin
2. Sorun tespit etmeniz halinde 3 i� g�n� i�inde bize ula��n
3. Sorunu g�steren foto�raf veya video g�nderin
4. Sipari� numaran�z� bildirin

3 i� g�n� ge�tikten sonra yap�lan hasar �ikayetleri de�erlendirilemez.

Garanti kapsam�ndaki ar�zalar i�in s�re, teslim tarihinden itibaren 2 y�ld�r.

Bize ula�mak i�in:
� WhatsApp: 0552 230 33 33
� E-posta: destek@smartdiafon.com
� Canl� destek: smartdiafon.com`,
  },
  {
    icon: AlertCircle,
    color: '#F59E0B',
    title: '5. Kurulum Hizmeti',
    content: `Kurulum hizmeti sat�n al�nd���nda:

� Kurulum ekibimiz randevu g�n� ve saatinde adreste haz�r bulunur
� Kurulum tamamland�ktan sonra hizmet bedeli iade edilmez
� Randevu iptali en az 24 saat �nceden bildirilmelidir; ge� iptal durumunda hizmet bedeli kesilir
� Teknik ar�zadan kaynaklanan yeniden kurulum ziyareti �cretsizdir`,
  },
  {
    icon: ShieldCheck,
    color: '#6366F1',
    title: '6. Garanti Ko�ullar�',
    content: `T�m Multitek ve DiafonBox �r�nleri 2 y�l �retici garantisi kapsam�ndad�r.

� Garanti; �retim hatalar�n�, malzeme kusurlar�n� ve fabrika ar�zalar�n� kapsar
� Fiziksel hasar, nem/su temas�, a��r� gerilim ve yetkisiz m�dahale garantiyi ge�ersiz k�lar
� Garanti servisi i�in �r�n� kargolayabilir veya teknik ekibimizden destek talep edebilirsiniz
� Garanti kapsam� d���ndaki onar�mlar i�in �cret teklifi sunulur; onay�n�z al�nmadan i�lem yap�lmaz`,
  },
]

export default function IadeKosullariPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto">

          {/* Ba�l�k */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-[11px] font-bold uppercase tracking-[2px]"
              style={{ background: 'rgba(244,130,31,0.1)', color: '#DC2626' }}>
              <ShieldCheck size={14} />
              T�ketici Haklar�
            </div>
            <h1 className="text-[28px] sm:text-[36px] font-black tracking-[-1px] mb-3"
              style={{ color: 'var(--text-primary)' }}>
              �ptal ve �ade Ko�ullar�
            </h1>
            <p className="text-[14px] leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Smartdiafon'dan sat�n ald���n�z diyafon, interkom ve g�venlik sistemi �r�nlerine ait iade ve garanti ko�ullar�.
            </p>
            <p className="text-[12px] mt-2" style={{ color: 'var(--text-muted)' }}>
              Son g�ncelleme: Haziran 2026
            </p>
          </div>

          {/* �zet kartlar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)' }}>
              <CheckCircle size={24} className="mx-auto mb-2 text-green-600" />
              <p className="text-[13px] font-bold text-green-700">14 G�n Cayma</p>
              <p className="text-[11px] mt-1 text-green-600">Stok �r�nlerde ge�erli</p>
            </div>
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <ShieldCheck size={24} className="mx-auto mb-2" style={{ color: '#6366F1' }} />
              <p className="text-[13px] font-bold" style={{ color: '#4F46E5' }}>2 Y�l Garanti</p>
              <p className="text-[11px] mt-1" style={{ color: '#6366F1' }}>T�m Multitek �r�nler</p>
            </div>
            <div className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
              <Clock size={24} className="mx-auto mb-2 text-blue-600" />
              <p className="text-[13px] font-bold text-blue-700">3 �� G�n�</p>
              <p className="text-[11px] mt-1 text-blue-600">Hasar bildirimi s�resi</p>
            </div>
          </div>

          {/* B�l�mler */}
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

          {/* �leti�im CTA */}
          <div className="mt-8 rounded-2xl p-6 text-center"
            style={{ background: 'linear-gradient(135deg, #DC2626, #b91c1c)' }}>
            <Phone size={24} className="mx-auto mb-3 text-white" />
            <h3 className="text-[18px] font-black text-white mb-2">Sorunuz mu var?</h3>
            <p className="text-[13px] text-white/80 mb-4">
              �ade ve garanti s�re�leri i�in WhatsApp destek hatt�m�za ula�abilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/905522303333"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold bg-white text-[#DC2626] hover:opacity-90 transition-all">
                WhatsApp ile Ula�
              </a>
              <Link href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                �leti�im Formu
              </Link>
            </div>
          </div>

          <p className="text-center text-[11px] mt-6" style={{ color: 'var(--text-muted)' }}>
            Bu sayfa 6502 say�l� T�keticinin Korunmas� Hakk�nda Kanun ve ilgili y�netmelikler �er�evesinde haz�rlanm��t�r.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
