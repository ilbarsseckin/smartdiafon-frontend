import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/hesabim/', '/odeme/', '/sepet/', '/giris', '/kayit'],
      },
    ],
    sitemap: 'https://smartdiafon.com.tr/sitemap.xml',
    host: 'https://smartdiafon.com.tr',
  }
}
