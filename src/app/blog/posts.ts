export interface BlogPost {
  slug: string
  title: string
  date: string
  cat: string
  excerpt: string
  // SEO
  metaTitle: string
  metaDescription: string
  keywords: string[]
  // İçerik — basit HTML (başlık, paragraf, liste)
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
    content: `
<p>Apartman veya site yönetimi olarak diyafon sistemi yenilemeye karar verdiğinizde karşınıza çıkan ilk soru şudur: Hangi sistem? Multitek'in başlıca üç sistemi olan <strong>IP interkom</strong>, <strong>Multibus</strong> ve <strong>Linux</strong> arasındaki farkları ve hangi durumda hangisinin uygun olduğunu bu yazıda netleştiriyoruz.</p>

<h2>Önce Altyapınızı Belirleyin</h2>
<p>Sistem seçiminde en belirleyici faktör binanızdaki mevcut kablo altyapısıdır. İki temel senaryo vardır:</p>
<ul>
<li><strong>DT8 kablo (eski/mevcut binalar):</strong> Çoğu mevcut apartmanda bulunan klasik diyafon kablosudur. Bu altyapıda <strong>Multibus</strong> sistemi idealdir; mevcut kablolama büyük ölçüde korunarak görüntülü sisteme geçiş yapılabilir.</li>
<li><strong>Cat5 / Cat6 ethernet (yeni binalar):</strong> Yeni inşa edilen veya altyapısı yenilenen binalarda bulunur. Bu altyapıda <strong>IP</strong> veya <strong>Linux</strong> interkom sistemleri kullanılır.</li>
</ul>

<h2>Multibus Sistemi</h2>
<p>Multibus, DT8 kablo altyapısıyla çalışan, görüntülü diyafon ihtiyacını ekonomik şekilde karşılayan bir sistemdir. Mevcut binalar için en pratik çözümdür çünkü genellikle ek kablo çekmeye gerek kalmaz. Daire içi monitörler, kapı panelleri ve güvenlik konsolu ile tam donanımlı bir sistem kurulabilir.</p>
<p>Multibus'un öne çıkan bir avantajı <strong>DiafonBox</strong> ile uyumlu olmasıdır; bu cihaz sayesinde binanın diyafonu cep telefonlarına bağlanabilir.</p>

<h2>IP İnterkom Sistemi</h2>
<p>IP interkom, ethernet (Cat5/Cat6) altyapısı üzerinden çalışır ve en yüksek görüntü kalitesini sunar. Akıllı ev entegrasyonu, yüksek çözünürlüklü kameralar, yüz tanımalı kapı panelleri gibi ileri özellikler IP sistemlerde mümkündür. Yeni projeler ve teknolojiden ödün vermek istemeyenler için idealdir.</p>

<h2>Linux İnterkom Sistemi</h2>
<p>Linux tabanlı interkom da Cat5/Cat6 altyapısıyla çalışır. Kararlı yazılım altyapısı ve bulut özellikleriyle öne çıkar. IP sistemlere alternatif, dengeli bir çözümdür.</p>

<h2>Hangi Sistemi Seçmeliyim?</h2>
<p>Özetle: Mevcut bir apartmanınız ve DT8 kablonuz varsa Multibus en mantıklı seçimdir. Yeni bir bina veya kapsamlı yenileme yapıyorsanız ve akıllı ev özellikleri istiyorsanız IP veya Linux interkom tercih edilmelidir.</p>
<p>Projenize özel hangi sistemin ne kadara mal olacağını görmek için <a href="/teklif">teklif hesaplama aracımızı</a> kullanabilir, üç sistemi yan yana karşılaştırabilirsiniz.</p>
`,
  },
  {
    slug: 'goruntusuz-diafonu-goruntuluye-cevirme',
    title: 'Görüntüsüz Diyafonu Görüntülüye Çevirmek: Adım Adım Rehber',
    date: '2026-05-20',
    cat: 'Rehber',
    excerpt: 'Mevcut sesli diyafonunuzu görüntülü sisteme yükseltmek istiyor musunuz? Hangi ürünler gerekli, mevcut kablolar kullanılabilir mi, maliyet ne kadar?',
    metaTitle: 'Görüntüsüz Diyafonu Görüntülüye Çevirme Rehberi | Smartdiafon',
    metaDescription: 'Sesli diyafonunuzu görüntülü diyafona çevirmek için ne gerekir? Mevcut kablolama, monitör ve panel seçimi, maliyet hakkında adım adım rehber.',
    keywords: ['görüntülü diyafon', 'diyafon yükseltme', 'sesli diyafonu görüntülüye çevirme', 'apartman diyafon değişimi'],
    content: `
<p>Birçok apartmanda hâlâ yalnızca sesli (görüntüsüz) diyafon sistemleri kullanılıyor. Kapıdaki kişiyi görmeden kapı açmak hem güvenlik açısından risklidir hem de modern konfor beklentilerini karşılamaz. İyi haber: çoğu durumda mevcut altyapıyı kullanarak görüntülü sisteme geçmek mümkündür.</p>

<h2>Mevcut Kablolarım Kullanılabilir mi?</h2>
<p>Çoğu eski apartmanda DT8 tipi diyafon kablosu bulunur. Bu altyapı, Multibus görüntülü diyafon sistemine geçiş için genellikle yeterlidir. Yani duvarları kırıp yeni kablo çekmeden, mevcut hat üzerinden görüntülü sisteme geçebilirsiniz. Bu, hem maliyeti hem de montaj süresini ciddi şekilde azaltır.</p>

<h2>Hangi Ürünler Gerekli?</h2>
<p>Görüntülü sisteme geçiş için temel olarak şunlar gerekir:</p>
<ul>
<li><strong>Daire içi monitörler:</strong> Her daireye bir adet. Ekran boyutu (4.3 inç veya 7 inç), renk ve akıllı ev özelliği gibi tercihlere göre model seçilir.</li>
<li><strong>Kapı paneli:</strong> Bina girişine kameralı kapı paneli. Daire sayısına ve özelliklere (dokunmatik, proximity kart) göre seçilir.</li>
<li><strong>Güç kaynağı ve gerekirse video yükseltici:</strong> Sistemin sağlıklı çalışması için.</li>
</ul>

<h2>Cebe Bağlantı: DiafonBox</h2>
<p>Görüntülü sisteme geçerken bir adım daha ileri gidebilirsiniz. <strong>DiafonBox</strong> cihazı ile binanızın diyafonunu cep telefonlarına bağlayabilirsiniz. Böylece evde olmadığınızda bile kapıdaki ziyaretçiyi telefonunuzdan görüp konuşabilir, kapıyı açabilirsiniz.</p>

<h2>Maliyet Ne Kadar?</h2>
<p>Toplam maliyet daire sayısı, seçilen monitör/panel modeli ve ek özelliklere göre değişir. Projenize özel net bir fiyat için <a href="/teklif">teklif hesaplama aracımızı</a> kullanabilirsiniz — daire ve kapı sayınızı girmeniz yeterli.</p>

<h2>Kurulum</h2>
<p>Ürünleri aldıktan sonra montaj için bölgenizdeki yetkili ekiplerimizden destek alabilirsiniz. Teklif sırasında "kurulum ve montaj istiyorum" seçeneğini işaretlemeniz yeterli.</p>
`,
  },
  {
    slug: 'diafonbox-nedir',
    title: 'DiafonBox Nedir? Apartman Diyafonunu Cep Telefonuna Bağlama',
    date: '2026-05-10',
    cat: 'Akıllı Ev',
    excerpt: 'DiafonBox ile binanızın diyafon sistemini cep telefonunuza taşıyın. Nasıl çalışır, hangi sistemlerle uyumludur, kimler için uygundur?',
    metaTitle: 'DiafonBox Nedir, Nasıl Çalışır? | Diyafonu Cebe Bağlama',
    metaDescription: 'DiafonBox ile apartman diyafonunu cep telefonuna bağlayın. Evde olmasanız bile kapıyı görüp açın. Çalışma mantığı, uyumluluk ve avantajlar.',
    keywords: ['diafonbox', 'diyafonu cebe bağlama', 'akıllı diyafon', 'cep telefonundan kapı açma', 'multibus diafonbox'],
    content: `
<p>Evde değilken kapınız çaldığında ne olur? Kargonuzu, misafirinizi ya da komşunuzu kaçırırsınız. <strong>DiafonBox</strong>, tam da bu sorunu çözmek için geliştirilmiş bir cihazdır: binanızın diyafon sistemini doğrudan cep telefonunuza bağlar.</p>

<h2>DiafonBox Nasıl Çalışır?</h2>
<p>DiafonBox, mevcut diyafon sisteminize bağlanan bir köprü cihazıdır. Kapı paneli zili çalındığında, çağrı sadece daire içindeki monitöre değil, aynı zamanda akıllı telefonunuzdaki uygulamaya da iletilir. Böylece nerede olursanız olun ziyaretçiyi görebilir, konuşabilir ve kapıyı uzaktan açabilirsiniz.</p>

<h2>Hangi Sistemlerle Uyumlu?</h2>
<p>Önemli bir nokta: DiafonBox, <strong>DT8 kablo ile çalışan Multibus</strong> diyafon sistemleriyle uyumludur. Mevcut görüntülü veya görüntüsüz Multibus diyafonunuz varsa, DiafonBox ekleyerek tüm binayı cebe taşıyabilirsiniz. Bu, özellikle apartman ve site yönetimleri için pratik ve ekonomik bir akıllandırma çözümüdür.</p>

<h2>Kimler İçin Uygun?</h2>
<ul>
<li><strong>Sık seyahat edenler:</strong> Evde olmadığınızda kapınızı kontrol edin.</li>
<li><strong>Apartman yönetimleri:</strong> Tüm binayı tek cihazla akıllandırın.</li>
<li><strong>Güvenlik önceliği olanlar:</strong> Kapıdaki kişiyi her yerden görün.</li>
</ul>

<h2>DiafonBox Modelleri</h2>
<p>Bina büyüklüğüne göre farklı kapasitelerde modeller mevcuttur — tek daireden 100 daireye kadar. Binanızın daire sayısına uygun modeli <a href="/teklif">teklif aracımızdan</a> otomatik olarak görebilirsiniz.</p>

<p>Görüntülü diyafonunuzu akıllı hale getirmek, düşündüğünüzden daha kolay ve ekonomik. Projeniz için <a href="/teklif">hemen teklif alın</a>.</p>
`,
  },

  ,
  {
    slug: 'diafonbox-nedir-nasil-calisir',
    title: 'DiafonBox Nedir? Eski Diyafonunuzu Akıllı Telefona Bağlayın',
    date: '2026-06-05',
    cat: 'Ürün',
    excerpt: 'DiafonBox, mevcut Multitek diyafon sisteminizi değiştirmeden cep telefonunuzdan kapı açmanızı sağlayan akıllı adaptördür. Nasıl çalışır, hangi sistemlerle uyumludur?',
    metaTitle: 'DiafonBox Nedir? Diyafonu Akıllı Telefona Bağlama | Smartdiafon',
    metaDescription: 'DiafonBox ile eski diyafonunuzu değiştirmeden akıllı telefona bağlayın. Kurulum, uyumluluk ve fiyat hakkında her şey.',
    keywords: ['diafonbox', 'akıllı diyafon', 'diyafonu telefona bağlama', 'multitek diyafon uyumlu', 'apartman kapı sistemi'],
    content: `
<p>Apartmanınızda yıllardır kullandığınız diyafon sistemi hâlâ çalışıyor ama siz artık kapıyı telefonsuz açmak ya da dışarıdayken misafirinize kapı açmak istiyorsunuz. İşte tam bu noktada <strong>DiafonBox</strong> devreye giriyor.</p>

<h2>DiafonBox Nedir?</h2>
<p>DiafonBox, mevcut Multitek diyafon sisteminizin iç ünitesine (monitör veya ahize) bağlanan küçük bir adaptördür. Sistemi değiştirmenize gerek kalmadan diyafonunuzu internete bağlar ve cep telefonunuzdan yönetmenizi sağlar.</p>

<h2>Ne Yapabilirsiniz?</h2>
<ul>
<li>Evde olmadığınızda bile kapı zilini cep telefonunuzda görüntülü alabilirsiniz</li>
<li>Ziyaretçinizi görerek konuşabilir, dilediğinizde kapıyı açabilirsiniz</li>
<li>Kapıya gelenin fotoğrafı otomatik olarak kaydedilir</li>
<li>Birden fazla telefona bildirim gönderebilirsiniz</li>
</ul>

<h2>Hangi Sistemlerle Uyumludur?</h2>
<p>DiafonBox; Multitek Multibus, Linux ve bazı IP interkom sistemleriyle uyumludur. Sisteminizin uyumlu olup olmadığını <a href="/uyumluluk">uyumluluk test aracımızdan</a> hızlıca öğrenebilirsiniz.</p>

<h2>Kurulum Ne Kadar Sürer?</h2>
<p>Ortalama 30-45 dakikada tamamlanan kurulum için elektrikçi gerekmez. Mevcut iç üniteye bağlantı yapılır, uygulama kurulur ve sistem çalışmaya başlar. Dilerseniz <a href="/kurulum-ekibi">kurulum ekibimizden</a> randevu alabilirsiniz.</p>
`,
  },
  {
    slug: 'apartman-kamera-sistemi-secimi',
    title: 'Apartman Güvenlik Kamerası Seçerken Dikkat Edilmesi Gerekenler',
    date: '2026-05-28',
    cat: 'Rehber',
    excerpt: 'Apartman veya site girişi için doğru güvenlik kamerasını seçmek, yanlış ürünü satın almamak için bilmeniz gerekenler.',
    metaTitle: 'Apartman Güvenlik Kamerası Seçimi Rehberi 2026 | Smartdiafon',
    metaDescription: 'Apartman giriş kamerası seçerken çözünürlük, gece görüşü, depolama ve kurulum gibi kriterleri nasıl değerlendirmelisiniz?',
    keywords: ['apartman kamera', 'güvenlik kamerası', 'ip kamera', 'gece görüşlü kamera', 'apartman güvenlik sistemi'],
    content: `
<p>Apartman ya da site güvenliğini artırmak için kamera sistemi kurmak istiyorsunuz, ancak piyasada onlarca model arasından hangisini seçeceğinizi bilmiyorsunuz. Bu rehber, doğru kararı vermenize yardımcı olacak temel kriterleri açıklıyor.</p>

<h2>Çözünürlük</h2>
<p>Apartman girişi için minimum <strong>2 Megapiksel (Full HD 1080p)</strong> tercih edin. Yüz ve plaka tanıma gerekiyorsa 4MP veya üzeri gereklidir. Çözünürlük ne kadar yüksekse depolama ihtiyacı da o kadar artar.</p>

<h2>Gece Görüşü</h2>
<p>Infrared (IR) LED'li kameralar karanlıkta siyah-beyaz görüntü verir. Tam renkli gece görüşü için "Color Night Vision" özellikli modellere bakın; bunlar az ışıkta bile renkli görüntü sağlar.</p>

<h2>Montaj Yeri</h2>
<p>Giriş kapısı üstü, otopark girişi ve ortak alan koridorları öncelikli noktalardır. Her nokta için farklı açı ihtiyacı olabilir; geniş açılı (wide angle) veya varifocal lensli modeller tercih edilmelidir.</p>

<h2>Depolama</h2>
<p>SD kart, NVR/DVR veya bulut depolama seçeneklerini değerlendirin. Yasal olarak en az 15 günlük kayıt tutulması önerilir.</p>

<h2>Multitek Kamera Çözümleri</h2>
<p>Multitek'in interkom sistemleriyle entegre çalışan kamera modelleri, tek uygulama üzerinden hem zil hem kamera yönetimine imkân tanır. <a href="/urunler">Ürün kataloğumuzu</a> inceleyebilirsiniz.</p>
`,
  },
  {
    slug: 'interkom-bakim-ipuclari',
    title: 'Diyafon ve İnterkom Sisteminizi Uzun Ömürlü Kullanmanın 5 Yolu',
    date: '2026-05-15',
    cat: 'Bakım',
    excerpt: 'Küçük bakım adımlarıyla diyafon ve interkom sisteminizin ömrünü uzatın, arıza riskini azaltın.',
    metaTitle: 'Diyafon Bakım İpuçları — Sistemi Uzun Ömürlü Kullanın | Smartdiafon',
    metaDescription: 'Diyafon ve interkom sisteminizin ömrünü uzatacak 5 pratik bakım önerisi. Temizlik, nem, güç kaynağı ve yazılım güncellemeleri.',
    keywords: ['diyafon bakım', 'interkom bakım', 'diyafon arıza', 'interkom temizlik', 'diyafon ömrü uzatma'],
    content: `
<p>Kaliteli bir diyafon veya interkom sistemi yıllarca sorunsuz çalışabilir — eğer düzenli bakım yapılırsa. İşte sisteminizin ömrünü uzatacak 5 pratik öneri.</p>

<h2>1. Düzenli Temizlik</h2>
<p>Kapı panelinin lens ve hoparlör alanlarını ayda bir yumuşak, kuru bir bezle temizleyin. Nem veya toz birikimi görüntü ve ses kalitesini düşürür. Kimyasal temizleyici kullanmayın.</p>

<h2>2. Nem ve Suya Karşı Koruma</h2>
<p>Dış mekan panellerinin IP koruma derecesini kontrol edin. Yağmur sularının panel yuvasına dolmaması için çevre drenajını kontrol edin. Rutubet, elektronik devrelerin en büyük düşmanıdır.</p>

<h2>3. Güç Kaynağını Koruyun</h2>
<p>Voltaj dalgalanmalarına karşı bir UPS veya parafudr (surge protector) kullanın. Özellikle fırtınalı havalarda bu önlem sistemi aşırı voltajdan korur.</p>

<h2>4. Yazılım ve Firmware Güncellemeleri</h2>
<p>IP veya Linux tabanlı sistemlerde firmware güncellemelerini takip edin. Güncel yazılım hem güvenlik açıklarını kapatır hem de yeni özellikler ekler.</p>

<h2>5. Yıllık Teknik Kontrol</h2>
<p>Yılda bir kez yetkili teknik servis tarafından kablo bağlantıları, buton kontakları ve kamera odağı kontrol ettirilmelidir. Küçük sorunlar erken yakalanırsa büyük arızaların önüne geçilir.</p>

<p>Herhangi bir sorunla karşılaştığınızda <a href="/iletisim">teknik destek ekibimize</a> ulaşabilirsiniz.</p>
`,
  }
]