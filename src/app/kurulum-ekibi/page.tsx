import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import KurulumEkibiKatil from './KurulumEkibiKatil'

export const metadata: Metadata = {
  title: 'Kurulum ve Montaj Ekibine Katıl — Smartdiafon',
  description: 'Diyafon, interkom ve güvenlik sistemleri montaj uzmanı mısınız? Smartdiafon kurulum ağına katılın, bölgenizden gelen kurulum taleplerini alın.',
}

export default function KurulumEkibiPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh' }}>
        <KurulumEkibiKatil />
      </main>
      <Footer />
    </>
  )
}