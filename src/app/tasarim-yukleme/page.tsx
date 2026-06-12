'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function TasarimYuklemePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

        {/* Hero */}
        <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <p className="text-[11px] tracking-[2.5px] uppercase font-bold text-[#DC2626] mb-3">Rehber</p>
            <h1 className="text-[36px] md:text-[48px] font-black tracking-[-1.5px] mb-4" style={{ color: 'var(--text-primary)' }}>
              Tasar�m Y�kleme ve Onay S�reci
            </h1>
            <p className="text-[16px] max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Sipari�inizi tamamlad�ktan sonra tasar�m�n�z� istedi�iniz zaman ilgili sipari� sayfas�ndan y�kleyebilirsiniz.
              Tasar�m� y�kledikten sonra bask� onay s�reci ba�layacakt�r.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* �ki se�enek */}
          <div className="text-center mb-10">
            <h2 className="text-[22px] font-black tracking-[-0.5px] mb-2" style={{ color: 'var(--text-primary)' }}>
              Tasar�m y�kleme ad�m�nda <span style={{ color: '#DC2626' }}>2 se�enek</span> vard�r.
            </h2>
            <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
              Tasar�m�n�z� "h�zl� otomasyon kontrol�" ya da "uzman grafiker kontrol�" se�eneklerinden birini se�erek y�kleyebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {/* H�zl� Otomasyon */}
            <div className="rounded-2xl p-8 text-center"
              style={{ background: 'var(--bg-card)', border: '2px solid #DC2626' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(244,130,31,0.1)' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4a12 12 0 100 24A12 12 0 0016 4z" stroke="#DC2626" strokeWidth="1.8"/>
                  <path d="M11 16l3.5 3.5L21 12" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="8" r="4" fill="#DC2626"/>
                  <path d="M23 8h2M24 7v2" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-[16px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                ? H�zl� Otomasyon Kontrol�
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                15 dakika i�inde otomatik kontrol. Grafik konusunda deneyimli kullan�c�lar i�in ideal.
              </p>
              <div className="mt-3 text-[11px] font-bold px-3 py-1 rounded-full inline-block"
                style={{ background: 'rgba(244,130,31,0.1)', color: '#DC2626' }}>
                �nerilen
              </div>
            </div>

            {/* Uzman Grafiker */}
            <div className="rounded-2xl p-8 text-center"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(99,102,241,0.1)' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="11" r="5" stroke="#6366F1" strokeWidth="1.8"/>
                  <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M22 8l2 2-5 5-2-2 5-5z" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-[16px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                ?? Uzman Grafiker Kontrol�
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Uzman grafiker ekibimiz dosyan�z� inceler ve gerekirse d�zeltme �nerisinde bulunur.
              </p>
            </div>
          </div>

          {/* H�zl� Otomasyon Detay */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
                style={{ background: '#DC2626' }}>1</div>
              <h2 className="text-[20px] font-black" style={{ color: '#DC2626' }}>
                H�zl� Otomasyon Kontrol�
              </h2>
            </div>
            <p className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>
              Bask� �ncesi grafik konusunda bilgisi olan kullan�c�lara tavsiye edilir. Otomasyon 15 dk i�erisinde taraf�n�za d�n�� yapar. Otomasyon 2 farkl� �ekilde d�n�� yapabilir:
            </p>

            <div className="space-y-4">
              {/* Onayl� */}
              <div className="rounded-xl p-6"
                style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[14px] font-bold text-emerald-600">1) Otomasyon Tasar�m� Bask�ya Uygun Hale Getirdi.</h3>
                </div>
                <ul className="space-y-1.5 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">�</span>
                    Tasar�m�n�z� t�m uyar�lar� kontrol ederek bask�ya uygun hale getirdi, hemen sipari� verebilirsiniz.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">�</span>
                    Onaylamadan �nce tasar�m� grafiker kontrol�ne g�ndermek istemiyorsan�z <strong>"Onayl�yorum"</strong> butonuna t�klayarak ilerleyebilirsiniz.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">�</span>
                    Tasar�m� onay vermeden, yeni dosya y�klemek veya <strong>"Onaylam�yorum, uzman grafiker kontrol� istiyorum"</strong> se�eneklerinden birini se�erek devam edebilirsiniz.
                  </li>
                </ul>
              </div>

              {/* Onays�z */}
              <div className="rounded-xl p-6"
                style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[14px] font-bold text-red-600">2) Otomasyon Tasar�m�n�z� Bask�ya Uygun Hale Getiremedi.</h3>
                </div>
                <ul className="space-y-1.5 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">�</span>
                    Tasar�m�n�zda �e�itli d�zeltmeler yaparak tasar�m dosyan�z� tekrar y�klemeniz gerekmektedir.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">�</span>
                    Uzman grafiker kontrol� se�ene�ini se�erek uzman grafikerin taraf�n�za d�n�� yapmas�n� bekleyebilirsiniz.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Uzman Grafiker Detay */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
                style={{ background: '#6366F1' }}>2</div>
              <h2 className="text-[20px] font-black" style={{ color: '#6366F1' }}>
                Uzman Grafiker Kontrol�
              </h2>
            </div>

            <div className="rounded-xl p-6"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <ul className="space-y-3 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ background: '#6366F1' }}>1</span>
                  Uzman grafiker ekibimiz dosyan�z� inceleyerek bask�ya uygunlu�unu kontrol eder.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ background: '#6366F1' }}>2</span>
                  Dosyan�z uygunsa onaylan�r ve bask� s�recine al�n�r.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ background: '#6366F1' }}>3</span>
                  Dosyan�zda sorun varsa grafiker taraf�n�za bildirim g�nderir ve d�zeltme ister.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ background: '#6366F1' }}>4</span>
                  �al��ma saatleri i�inde ortalama 2-4 saat i�inde d�n�� yap�l�r.
                </li>
              </ul>
            </div>
          </div>

          {/* Tasar�m �pu�lar� */}
          <div className="rounded-2xl p-8"
            style={{ background: 'rgba(244,130,31,0.04)', border: '1px solid rgba(244,130,31,0.2)' }}>
            <h2 className="text-[18px] font-black mb-4" style={{ color: '#DC2626' }}>
              ?? Tasar�m Haz�rlarken Dikkat Edilmesi Gerekenler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Dosya format�: PDF, AI, EPS veya y�ksek ��z�n�rl�kl� PNG/JPEG',
                '��z�n�rl�k en az 300 DPI olmal�d�r',
                'Yaz� tipleri dosyaya g�m�l� veya outline/contour yap�lm�� olmal�d�r',
                'Renk modu CMYK olmal�d�r (RGB de�il)',
                'Tasar�m boyutu �r�n boyutuna uygun olmal�d�r',
                'Kenar bo�luklar�na (ta�ma pay�) dikkat edilmelidir',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-[#DC2626] mt-0.5 flex-shrink-0">?</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <h2 className="text-[20px] font-black mb-3" style={{ color: 'var(--text-primary)' }}>
              Sorunuz mu var?
            </h2>
            <p className="text-[14px] mb-6" style={{ color: 'var(--text-secondary)' }}>
              Tasar�m konusunda yard�ma ihtiya� duyarsan�z uzman ekibimiz size destek olur.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/iletisim"
                className="px-6 py-3 rounded-xl text-[13px] font-bold text-white"
                style={{ background: '#DC2626' }}>
                �leti�ime Ge�
              </Link>
              <Link href="/nasil-siparis"
                className="px-6 py-3 rounded-xl text-[13px] font-bold"
                style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', background: 'var(--bg-card)' }}>
                Sipari� Rehberi
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
