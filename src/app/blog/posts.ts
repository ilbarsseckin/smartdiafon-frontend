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
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}