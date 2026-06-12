import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { posts } from './posts'

export const metadata: Metadata = {
  title: 'Blog — Diyafon, İnterkom ve Güvenlik Rehberi | Smartdiafon',
  description: 'Diyafon sistemleri, IP interkom, görüntülü diyafona geçiş, DiafonBox ve akıllı ev hakkında uzman rehber yazıları.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-[11px] tracking-[2.5px] uppercase font-bold text-[#F4821F] mb-3">Blog</p>
        <h1 className="text-[40px] font-bold tracking-[-1px] mb-12"
          style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif' }}>
          Diyafon ve güvenlik dünyasından
        </h1>
        <div className="space-y-4">
          {posts.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}`}
              className="group flex items-start justify-between p-6 rounded-2xl transition-all hover:scale-[1.01] block"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div>
                <span className="text-[10px] font-bold text-[#F4821F] uppercase tracking-[1px]">{p.cat}</span>
                <h2 className="text-[17px] font-bold mt-1"
                  style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif' }}>{p.title}</h2>
                <p className="text-[13px] mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.excerpt}</p>
                <p className="text-[12px] mt-2" style={{ color: 'var(--text-muted)' }}>
                  {new Date(p.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}
                </p>
              </div>
              <span className="text-[#F4821F] group-hover:translate-x-1 transition-transform mt-2 flex-shrink-0">→</span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
