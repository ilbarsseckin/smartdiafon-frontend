import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { posts, getPost } from '../posts'

const SITE_URL = 'https://smartdiafon.com.tr'

// Statik sayfalar için tüm slug'ları üret
export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return { title: 'Yazı bulunamadı' }
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Smartdiafon' },
    publisher: { '@type': 'Organization', name: 'Smartdiafon', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }

  // İlgili yazılar (aynı kategoriden veya diğerleri)
  const ilgili = posts.filter(p => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Üst bilgi */}
        <Link href="/blog" className="text-[13px] font-bold mb-6 inline-block transition-colors hover:text-[#DC2626]"
          style={{ color: 'var(--text-muted)' }}>
          ← Tüm Yazılar
        </Link>
        <span className="text-[11px] font-bold text-[#DC2626] uppercase tracking-[1.5px]">{post.cat}</span>
        <h1 className="text-[28px] md:text-[36px] font-black tracking-[-1px] leading-tight mt-2 mb-3"
          style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h1>
        <p className="text-[13px] mb-8" style={{ color: 'var(--text-muted)' }}>
          {new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* İçerik */}
        <article className="blog-content" style={{ color: 'var(--text-secondary)' }}
          dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* CTA */}
        <div className="mt-10 p-6 rounded-2xl text-center"
          style={{ background: 'rgba(244,130,31,0.08)', border: '1px solid rgba(244,130,31,0.2)' }}>
          <h3 className="text-[18px] font-black mb-2" style={{ color: 'var(--text-primary)' }}>
            Projeniz için teklif alın
          </h3>
          <p className="text-[13px] mb-4" style={{ color: 'var(--text-muted)' }}>
            Daire ve kapı sayınızı girin, size özel paketleri saniyeler içinde görün.
          </p>
          <Link href="/teklif"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[14px] text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg,#DC2626,#ff9f47)' }}>
            Hemen Teklif Al →
          </Link>
        </div>

        {/* İlgili yazılar */}
        {ilgili.length > 0 && (
          <div className="mt-12">
            <h3 className="text-[16px] font-black mb-4" style={{ color: 'var(--text-primary)' }}>İlgili Yazılar</h3>
            <div className="space-y-3">
              {ilgili.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`}
                  className="block p-4 rounded-xl transition-all hover:scale-[1.01]"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <span className="text-[10px] font-bold text-[#DC2626] uppercase">{p.cat}</span>
                  <p className="text-[14px] font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />

      {/* Blog içerik stilleri */}
      <style>{`
        .blog-content h2 {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 28px 0 12px;
          letter-spacing: -0.5px;
        }
        .blog-content p { margin: 0 0 16px; line-height: 1.8; font-size: 15px; }
        .blog-content ul { margin: 0 0 16px; padding-left: 20px; }
        .blog-content li { margin-bottom: 8px; line-height: 1.7; font-size: 15px; }
        .blog-content a { color: #DC2626; font-weight: 600; text-decoration: underline; }
        .blog-content strong { color: var(--text-primary); }
      `}</style>
    </>
  )
}