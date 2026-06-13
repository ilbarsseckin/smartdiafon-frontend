import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TeklifClient from './TeklifClient'

export const metadata: Metadata = {
  title: 'Ücretsiz Diyafon Teklifi — Görüntülü Diyafon Fiyat Hesaplama | Smartdiafon',
  description: 'Görüntüsüz diyafonunuzu görüntülüye çevirin. Elektrikçi dolaşmadan ürünü ve montaj ekibini tek yerden bulun. 2 dakikada ücretsiz teklif alın.',
  keywords: ['görüntülü diyafon teklifi', 'diyafon fiyat hesaplama', 'diyafon montaj', 'görüntüsüz diyafonu görüntülüye çevirme', 'apartman diyafon teklifi'],
}

export default function TeklifPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh' }}>
        <TeklifClient />
      </main>
      <Footer />
    </>
  )
}