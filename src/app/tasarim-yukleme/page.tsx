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
              Tasarým Yükleme ve Onay Süreci
            </h1>
            <p className="text-[16px] max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Sipariþinizi tamamladýktan sonra tasarýmýnýzý istediðiniz zaman ilgili sipariþ sayfasýndan yükleyebilirsiniz.
              Tasarýmý yükledikten sonra baský onay süreci baþlayacaktýr.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Ýki seçenek */}
          <div className="text-center mb-10">
            <h2 className="text-[22px] font-black tracking-[-0.5px] mb-2" style={{ color: 'var(--text-primary)' }}>
              Tasarým yükleme adýmýnda <span style={{ color: '#DC2626' }}>2 seçenek</span> vardýr.
            </h2>
            <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
              Tasarýmýnýzý "hýzlý otomasyon kontrolü" ya da "uzman grafiker kontrolü" seçeneklerinden birini seçerek yükleyebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {/* Hýzlý Otomasyon */}
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
                ? Hýzlý Otomasyon Kontrolü
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                15 dakika içinde otomatik kontrol. Grafik konusunda deneyimli kullanýcýlar için ideal.
              </p>
              <div className="mt-3 text-[11px] font-bold px-3 py-1 rounded-full inline-block"
                style={{ background: 'rgba(244,130,31,0.1)', color: '#DC2626' }}>
                Önerilen
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
                ?? Uzman Grafiker Kontrolü
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Uzman grafiker ekibimiz dosyanýzý inceler ve gerekirse düzeltme önerisinde bulunur.
              </p>
            </div>
          </div>

          {/* Hýzlý Otomasyon Detay */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
                style={{ background: '#DC2626' }}>1</div>
              <h2 className="text-[20px] font-black" style={{ color: '#DC2626' }}>
                Hýzlý Otomasyon Kontrolü
              </h2>
            </div>
            <p className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>
              Baský öncesi grafik konusunda bilgisi olan kullanýcýlara tavsiye edilir. Otomasyon 15 dk içerisinde tarafýnýza dönüþ yapar. Otomasyon 2 farklý þekilde dönüþ yapabilir:
            </p>

            <div className="space-y-4">
              {/* Onaylý */}
              <div className="rounded-xl p-6"
                style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[14px] font-bold text-emerald-600">1) Otomasyon Tasarýmý Baskýya Uygun Hale Getirdi.</h3>
                </div>
                <ul className="space-y-1.5 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    Tasarýmýnýzý tüm uyarýlarý kontrol ederek baskýya uygun hale getirdi, hemen sipariþ verebilirsiniz.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    Onaylamadan önce tasarýmý grafiker kontrolüne göndermek istemiyorsanýz <strong>"Onaylýyorum"</strong> butonuna týklayarak ilerleyebilirsiniz.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    Tasarýmý onay vermeden, yeni dosya yüklemek veya <strong>"Onaylamýyorum, uzman grafiker kontrolü istiyorum"</strong> seçeneklerinden birini seçerek devam edebilirsiniz.
                  </li>
                </ul>
              </div>

              {/* Onaysýz */}
              <div className="rounded-xl p-6"
                style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[14px] font-bold text-red-600">2) Otomasyon Tasarýmýnýzý Baskýya Uygun Hale Getiremedi.</h3>
                </div>
                <ul className="space-y-1.5 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Tasarýmýnýzda çeþitli düzeltmeler yaparak tasarým dosyanýzý tekrar yüklemeniz gerekmektedir.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Uzman grafiker kontrolü seçeneðini seçerek uzman grafikerin tarafýnýza dönüþ yapmasýný bekleyebilirsiniz.
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
                Uzman Grafiker Kontrolü
              </h2>
            </div>

            <div className="rounded-xl p-6"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <ul className="space-y-3 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ background: '#6366F1' }}>1</span>
                  Uzman grafiker ekibimiz dosyanýzý inceleyerek baskýya uygunluðunu kontrol eder.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ background: '#6366F1' }}>2</span>
                  Dosyanýz uygunsa onaylanýr ve baský sürecine alýnýr.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ background: '#6366F1' }}>3</span>
                  Dosyanýzda sorun varsa grafiker tarafýnýza bildirim gönderir ve düzeltme ister.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ background: '#6366F1' }}>4</span>
                  Çalýþma saatleri içinde ortalama 2-4 saat içinde dönüþ yapýlýr.
                </li>
              </ul>
            </div>
          </div>

          {/* Tasarým Ýpuçlarý */}
          <div className="rounded-2xl p-8"
            style={{ background: 'rgba(244,130,31,0.04)', border: '1px solid rgba(244,130,31,0.2)' }}>
            <h2 className="text-[18px] font-black mb-4" style={{ color: '#DC2626' }}>
              ?? Tasarým Hazýrlarken Dikkat Edilmesi Gerekenler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Dosya formatý: PDF, AI, EPS veya yüksek çözünürlüklü PNG/JPEG',
                'Çözünürlük en az 300 DPI olmalýdýr',
                'Yazý tipleri dosyaya gömülü veya outline/contour yapýlmýþ olmalýdýr',
                'Renk modu CMYK olmalýdýr (RGB deðil)',
                'Tasarým boyutu ürün boyutuna uygun olmalýdýr',
                'Kenar boþluklarýna (taþma payý) dikkat edilmelidir',
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
              Tasarým konusunda yardýma ihtiyaç duyarsanýz uzman ekibimiz size destek olur.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/iletisim"
                className="px-6 py-3 rounded-xl text-[13px] font-bold text-white"
                style={{ background: '#DC2626' }}>
                Ýletiþime Geç
              </Link>
              <Link href="/nasil-siparis"
                className="px-6 py-3 rounded-xl text-[13px] font-bold"
                style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', background: 'var(--bg-card)' }}>
                Sipariþ Rehberi
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
