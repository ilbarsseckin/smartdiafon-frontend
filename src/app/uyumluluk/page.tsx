import { Metadata } from 'next'
import UyumlulukClient from './UyumlulukClient'

export const metadata: Metadata = {
  title: 'Diyafon Uyumluluk Kontrolü | Mevcut Sisteminize Uygun mu? | Smartdiafon',
  description: 'Mevcut diyafonunuzun fotoğrafını yükleyin, DiafonBox veya Akıllı Diafon ile uyumlu olup olmadığını anında öğrenin. Ücretsiz uyumluluk analizi.',
  keywords: 'diyafon uyumluluk, diafonbox uyumlu mu, akıllı diafon, mevcut diyafon değiştirme, görüntülü diyafon',
}

export default function UyumlulukPage() {
  return <UyumlulukClient />
}
