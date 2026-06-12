import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TeklifClient from './TeklifClient'

export const metadata: Metadata = {
  title: 'Proje Teklif Hesaplama — Multibus Diyafon Sistemi',
  description: 'Binanız için Multibus görüntülü diyafon sistemi teklifini birkaç adımda hesaplayın. Daire ve kapı sayısına göre otomatik fiyat, hazır paketler.',
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
