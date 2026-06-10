import type { Metadata } from 'next'
import HeroCarousel from '@/components/sections/HeroCarousel'
import UrunlerSection from '@/components/sections/UrunlerSection'
import YeniGelenler from '@/components/sections/YeniGelenler'
import EnCokSatan from '@/components/sections/EnCokSatan'
import Favorilerim from '@/components/sections/Favorilerim'
import SonBaktiklarin from '@/components/sections/SonBaktiklarin'
import NedenBiz from '@/components/sections/NedenBiz'
import Sektorler from '@/components/sections/Sektorler'
import ReferencesSection from '@/components/sections/ReferencesSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import KampanyaSerit from '@/components/sections/KampanyaSerit'
import GuvenRozetleri from '@/components/sections/GuvenRozetleri'
import FloatingCardsSection from '@/components/sections/FloatingCardsSection'
import AkilliEvShowcase from '@/components/sections/AkilliEvShowcase'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartdiafon.com.tr'

export const metadata: Metadata = {
  title: 'Smartdiafon — Multitek Diyafon, İnterkom ve Güvenlik Sistemleri',
  description: 'Multitek IP interkom, görüntülü diyafon, daire monitörü, kapı paneli, yangın alarm ve akıllı ev sistemleri. Yetkili satıcı, hızlı teslimat, uygun fiyat.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Smartdiafon — Multitek Diyafon, İnterkom ve Güvenlik Sistemleri',
    description: 'Multitek IP interkom, görüntülü diyafon, daire monitörü, kapı paneli, yangın alarm ve akıllı ev sistemleri.',
    url: SITE_URL,
    siteName: 'smartdiafon.com',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smartdiafon — Multitek Diyafon ve İnterkom Sistemleri',
    description: 'Multitek IP interkom, görüntülü diyafon, yangın alarm ve akıllı ev sistemleri.',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'smartdiafon.com',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Turkish',
  },
  sameAs: [],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6">
          <HeroCarousel />
        </div>
        <AkilliEvShowcase />
        <ReferencesSection />
        <GuvenRozetleri />
        <KampanyaSerit />
       // <FloatingCardsSection />
        <Favorilerim />
        <UrunlerSection />
        <YeniGelenler />
        <EnCokSatan />
        <SonBaktiklarin />
        <Sektorler />
        <NedenBiz />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  )
}