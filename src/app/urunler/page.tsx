import type { Metadata } from 'next'
import UrunlerClient from './UrunlerClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartdiafon.com.tr'

export const metadata: Metadata = {
  title: 'Tüm Ürünler — Diyafon & Güvenlik Sistemleri | Smartdiafon',
  description: 'Görüntülü diyafon, IP interkom, daire monitörü, kapı paneli, güvenlik kamerası ve akıllı ev ürünleri. Multitek yetkili satıcı, hızlı teslimat.',
  alternates: { canonical: `${SITE_URL}/urunler` },
  openGraph: {
    title: 'Tüm Ürünler — Diyafon & Güvenlik Sistemleri | Smartdiafon',
    description: 'Görüntülü diyafon, IP interkom, kapı paneli ve güvenlik sistemleri.',
    url: `${SITE_URL}/urunler`,
    siteName: 'Smartdiafon',
    locale: 'tr_TR',
    type: 'website',
  },
}

export default function UrunlerPage() {
  return <UrunlerClient />
}
