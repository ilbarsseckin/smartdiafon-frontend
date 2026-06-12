export interface BlogPost {
  slug: string
  title: string
  date: string
  cat: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  content: string
}

export const posts: BlogPost[] = [
  {
    slug: 'ip-interkom-mu-multibus-mu',
    title: 'IP İnterkom mu Multibus mu? Doğru Diyafon Sistemini Seçme Rehberi',
    date: '2026-06-01',
    cat: 'Rehber',
    excerpt: 'Apartmanınız veya siteniz için hangi diyafon sistemi uygun? IP, Multibus ve Linux sistemlerini kablo altyapısı, maliyet ve özellik açısından karşılaştırıyoruz.',
    metaTitle: 'IP İnterkom mu Multibus mu? Diyafon Sistemi Seçim Rehberi 2026',
    metaDescription: 'IP interkom, Multibus ve Linux diyafon sistemlerini karşılaştırın. Hangi kablo altyapısına hangi sistem uygun, maliyetler ne? Uzman seçim rehberi.',
    keywords: ['ip interkom', 'multibus diyafon', 'diyafon sistemi seçimi', 'görüntülü diyafon', 'apartman diyafon sistemi'],
    content: `<p>Apartman veya site yönetimi olarak diyafon sistemi yenilemeye karar verdiğinizde karşınıza çıkan ilk soru şudur: Hangi sistem?</p>
<h2>Önce Altyapınızı Belirleyin</h2>
<p>Sistem seçiminde en belirleyici faktör binanızdaki mevcut kablo altyapısıdır.</p>
<ul>
<li><strong>DT8 kablo:</strong> Multibus sistemi idealdir.</li>
<li><strong>Cat5/Cat6:</strong> IP veya Linux interkom sistemleri uygundur.</li>
</ul>
<h2>Multibus Sistemi</h2>
<p>DT8 kablo altyapısıyla çalışan, görüntülü diyafon ihtiyacını ekonomik şekilde karşılayan bir sistemdir.</p>
<h2>IP İnterkom</h2>
<p>Ethernet altyapısı üzerinden çalışır ve en yüksek görüntü kalitesini sunar.</p>
<h2>Linux İnterkom</h2>
<p>Cat5/Cat6 altyapısıyla çalışır. Kararlı yazılım altyapısı ile öne çıkar.</p>
<p>Projenize özel teklif için <a href="/teklif">teklif hesaplama aracımızı</a> kullanabilirsiniz.</p>`,
  },
  {
    slug: 'goruntusuz-diafonu-goruntuluye-cevirme',
    title: 'Görüntüsüz Diyafonu Görüntülüye Çevirmek: Adım Adım Rehber',
    date: '2026-05-20',
    cat: 'Rehber',
    excerpt: 'Mevcut sesli diyafonunuzu görüntülü sisteme yükseltmek istiyor musunuz? Hangi ürünler gerekli, mevcut kablolar kullanılabilir mi?',
    metaTitle: 'Görüntüsüz Diyafonu Görüntülüye Çevirme Rehberi | Smartdiafon',
    metaDescription: 'Sesli diyafonunuzu görüntülü diyafona çevirmek için ne gerekir? Mevcut kablolama, monitör ve panel seçimi hakkında adım adım rehber.',
    keywords: ['görüntülü diyafon', 'diyafon yükseltme', 'sesli diyafonu görüntülüye çevirme', 'apartman diyafon değişimi'],
    content: `<p>Birçok apartmanda hâlâ sesli diyafon sistemleri kullanılıyor. İyi haber: çoğu durumda mevcut altyapıyı kullanarak görüntülü sisteme geçmek mümkündür.</p>
<h2>Mevcut Altyapınızı Kontrol Edin</h2>
<p>DT8 kablo varsa Multibus sistemiyle görüntülü geçiş yapılabilir. Ek kablo çekmeye genellikle gerek kalmaz.</p>
<h2>Gerekli Ekipmanlar</h2>
<ul>
<li>Görüntülü kapı paneli</li>
<li>Daire içi monitör</li>
<li>Gerekirse sinyal güçlendirici</li>
</ul>
<p>Sisteminizin uyumluluğunu öğrenmek için <a href="/uyumluluk">uyumluluk testini</a> kullanın.</p>`,
  },
  {
    slug: 'diafonbox-nedir-nasil-calisir',
    title: 'DiafonBox Nedir? Eski Diyafonunuzu Akıllı Telefona Bağlayın',
    date: '2026-06-05',
    cat: 'Ürün',
    excerpt: 'DiafonBox, mevcut Multitek diyafon sisteminizi değiştirmeden cep telefonunuzdan kapı açmanızı sağlayan akıllı adaptördür.',
    metaTitle: 'DiafonBox Nedir? Diyafonu Akıllı Telefona Bağlama | Smartdiafon',
    metaDescription: 'DiafonBox ile eski diyafonunuzu değiştirmeden akıllı telefona bağlayın. Kurulum, uyumluluk ve fiyat hakkında her şey.',
    keywords: ['diafonbox', 'akıllı diyafon', 'diyafonu telefona bağlama', 'multitek diyafon uyumlu'],
    content: `<p>DiafonBox, mevcut Multitek diyafon sisteminizin iç ünitesine bağlanan küçük bir adaptördür.</p>
<h2>Ne Yapabilirsiniz?</h2>
<ul>
<li>Evde olmadığınızda kapı zilini cep telefonunuzda görüntülü alabilirsiniz</li>
<li>Ziyaretçinizi görerek konuşabilir, dilediğinizde kapıyı açabilirsiniz</li>
<li>Birden fazla telefona bildirim gönderebilirsiniz</li>
</ul>
<h2>Hangi Sistemlerle Uyumludur?</h2>
<p>DiafonBox; Multitek Multibus, Linux ve bazı IP interkom sistemleriyle uyumludur. <a href="/uyumluluk">Uyumluluk testini</a> yapın.</p>`,
  },
  {
    slug: 'apartman-kamera-sistemi-secimi',
    title: 'Apartman Güvenlik Kamerası Seçerken Dikkat Edilmesi Gerekenler',
    date: '2026-05-28',
    cat: 'Rehber',
    excerpt: 'Apartman veya site girişi için doğru güvenlik kamerasını seçmek için bilmeniz gerekenler.',
    metaTitle: 'Apartman Güvenlik Kamerası Seçimi Rehberi 2026 | Smartdiafon',
    metaDescription: 'Apartman giriş kamerası seçerken çözünürlük, gece görüşü, depolama ve kurulum kriterlerini nasıl değerlendirmelisiniz?',
    keywords: ['apartman kamera', 'güvenlik kamerası', 'ip kamera', 'gece görüşlü kamera'],
    content: `<p>Apartman güvenliği için doğru kamerayı seçmek önemlidir.</p>
<h2>Çözünürlük</h2>
<p>Minimum Full HD 1080p tercih edin. Yüz tanıma için 4MP veya üzeri gereklidir.</p>
<h2>Gece Görüşü</h2>
<p>IR LED'li kameralar karanlıkta siyah-beyaz görüntü verir. Color Night Vision ile renkli görüntü alınır.</p>
<h2>Depolama</h2>
<p>En az 15 günlük kayıt tutulması önerilir. SD kart, NVR veya bulut depolama değerlendirin.</p>
<p><a href="/urunler">Ürün kataloğumuzu</a> inceleyebilirsiniz.</p>`,
  },
  {
    slug: 'interkom-bakim-ipuclari',
    title: 'Diyafon ve İnterkom Sisteminizi Uzun Ömürlü Kullanmanın 5 Yolu',
    date: '2026-05-15',
    cat: 'Bakım',
    excerpt: 'Küçük bakım adımlarıyla diyafon ve interkom sisteminizin ömrünü uzatın, arıza riskini azaltın.',
    metaTitle: 'Diyafon Bakım İpuçları — Sistemi Uzun Ömürlü Kullanın | Smartdiafon',
    metaDescription: 'Diyafon ve interkom sisteminizin ömrünü uzatacak 5 pratik bakım önerisi.',
    keywords: ['diyafon bakım', 'interkom bakım', 'diyafon arıza', 'diyafon ömrü uzatma'],
    content: `<p>Kaliteli bir diyafon yıllarca sorunsuz çalışabilir — eğer düzenli bakım yapılırsa.</p>
<h2>1. Düzenli Temizlik</h2>
<p>Kapı panelini ayda bir yumuşak, kuru bezle temizleyin.</p>
<h2>2. Nem ve Suya Karşı Koruma</h2>
<p>Dış mekan panellerinin IP koruma derecesini kontrol edin.</p>
<h2>3. Güç Kaynağını Koruyun</h2>
<p>Voltaj dalgalanmalarına karşı UPS kullanın.</p>
<h2>4. Firmware Güncellemeleri</h2>
<p>IP veya Linux tabanlı sistemlerde güncellemeleri takip edin.</p>
<h2>5. Yıllık Teknik Kontrol</h2>
<p>Yılda bir kez yetkili servis tarafından kontrol ettirilmesini öneririz.</p>
<p>Sorun yaşarsanız <a href="/iletisim">teknik destek</a> alın.</p>`,
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}