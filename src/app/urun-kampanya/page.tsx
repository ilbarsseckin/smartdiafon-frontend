'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import { Loader2, Search, X, LayoutGrid, LayoutList, ShoppingCart, Star } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'

interface Product {
  id: string
  slug: string
  name: string
  shortDesc?: string
  categoryName?: string
  categorySlug?: string
  brandName?: string
  mainImageUrl?: string
  hoverImageUrl?: string
  minPriceUsd?: number
  minPriceQty?: number
  featured?: boolean
  badge?: string
  originalPrice?: number
}

interface Category {
  id: string
  slug: string
  name: string
  icon?: string
}

function UrunKampanyaInner() {
  const sp = useSearchParams()
  const initialCat = sp.get('kategori') || 'all'
  const initialView = (sp.get('gorunum') as 'grid' | 'list') || 'grid'
  const kampanyaSlug = sp.get('kampanya') || ''

  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [kur, setKur] = useState(45)
  const [loading, setLoading] = useState(true)
  const [activeCat, setActiveCat] = useState(initialCat)
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>(initialView)
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default')

  useEffect(() => {
    const productReq = kampanyaSlug
      ? api.get(`/api/campaigns/${kampanyaSlug}/products`)
      : api.get('/api/catalog/products')

    Promise.all([
      api.get('/api/catalog/categories/flat').catch(() => api.get('/api/catalog/categories/tree')),
      productReq,
      api.get('/api/settings/public'),
    ]).then(([catRes, prodRes, settRes]) => {
      const cats = catRes.data.data || []
      const flatCats = Array.isArray(cats) ? cats : flattenTree(cats)
      setCategories(flatCats)
      setProducts(prodRes.data.data || [])
      setKur(parseFloat(settRes.data.data?.usd_kur || '45'))
    }).finally(() => setLoading(false))
  }, [kampanyaSlug])

  function flattenTree(tree: any[]): Category[] {
    const result: Category[] = []
    const walk = (items: any[]) => {
      for (const item of items) {
        result.push(item)
        if (item.children?.length) walk(item.children)
      }
    }
    walk(tree)
    return result
  }

  const filtered = products
    .filter(p => activeCat === 'all' || p.categorySlug === activeCat)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price_asc') return (a.minPriceUsd || 0) - (b.minPriceUsd || 0)
      if (sortBy === 'price_desc') return (b.minPriceUsd || 0) - (a.minPriceUsd || 0)
      return 0
    })

  return (
    <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13 }}>← Ana Sayfa</Link>
            <h1 style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 900, flex: 1 }}>Ürünler</h1>
            {/* View toggle */}
            <div style={{ display: 'flex', gap: 4, background: 'var(--bg-secondary)', borderRadius: 8, padding: 3 }}>
              <button onClick={() => setView('grid')}
                style={{ padding: '6px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', background: view === 'grid' ? '#F4821F' : 'transparent', color: view === 'grid' ? '#fff' : 'var(--text-muted)' }}>
                <LayoutGrid size={15} />
              </button>
              <button onClick={() => setView('list')}
                style={{ padding: '6px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', background: view === 'list' ? '#F4821F' : 'transparent', color: view === 'list' ? '#fff' : 'var(--text-muted)' }}>
                <LayoutList size={15} />
              </button>
            </div>
          </div>

          {/* Search + Sort */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Ürün ara..."
                style={{ width: '100%', paddingLeft: 32, paddingRight: 32, paddingTop: 8, paddingBottom: 8, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13, boxSizing: 'border-box' }} />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <X size={13} />
                </button>
              )}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
              style={{ padding: '8px 10px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13 }}>
              <option value="default">Sıralama</option>
              <option value="price_asc">Fiyat ↑</option>
              <option value="price_desc">Fiyat ↓</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 16px' }}>
        {/* Kategori filtreleri - horizontal scroll */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 16 }}
          className="hide-scrollbar">
          <button onClick={() => setActiveCat('all')}
            style={{ whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: activeCat === 'all' ? '#F4821F' : 'var(--bg-card)', color: activeCat === 'all' ? '#fff' : 'var(--text-secondary)', flexShrink: 0 }}>
            Tümü ({products.length})
          </button>
          {categories.slice(0, 12).map(cat => {
            const count = products.filter(p => p.categorySlug === cat.slug).length
            if (count === 0) return null
            return (
              <button key={cat.id} onClick={() => setActiveCat(cat.slug)}
                style={{ whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: activeCat === cat.slug ? '#F4821F' : 'var(--bg-card)', color: activeCat === cat.slug ? '#fff' : 'var(--text-secondary)', flexShrink: 0 }}>
                {cat.icon && <span style={{ marginRight: 4 }}>{cat.icon}</span>}{cat.name} ({count})
              </button>
            )
          })}
        </div>

        {/* Sonuç sayısı */}
        <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 12 }}>
          {filtered.length} ürün bulundu
        </p>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
            <Loader2 size={28} color="#F4821F" className="animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
            <p style={{ fontSize: 15 }}>Ürün bulunamadı</p>
          </div>
        ) : view === 'grid' ? (
          /* GRID VIEW */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {filtered.map(p => <GridCard key={p.id} p={p} kur={kur} />)}
          </div>
        ) : (
          /* LIST VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(p => <ListCard key={p.id} p={p} kur={kur} />)}
          </div>
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function GridCard({ p, kur }: { p: Product; kur: number }) {
  const price = p.minPriceUsd ? Math.round(p.minPriceUsd * kur * 1.2) : null
  const origPrice = p.originalPrice ? Math.round(Number(p.originalPrice) * kur * 1.2) : null
  const discPct = price && origPrice && origPrice > price ? Math.round((1 - price / origPrice) * 100) : 0

  return (
    <Link href={`/urun/${p.slug}`} style={{ textDecoration: 'none' }}>
      <div className="product-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}>
        <div style={{ position: 'relative', aspectRatio: '1', background: 'var(--bg-secondary)' }}>
          {p.mainImageUrl
            ? <img src={p.mainImageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>📡</div>
          }
          {discPct > 0 && (
            <span style={{ position: 'absolute', top: 8, left: 8, background: '#DC2626', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>-%{discPct}</span>
          )}
          {p.badge && !discPct && (
            <span style={{ position: 'absolute', top: 8, left: 8, background: 'linear-gradient(135deg, #ef4444, #ec4899)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>⚡ {p.badge}</span>
          )}
          {p.featured && (
            <span style={{ position: 'absolute', top: 8, right: 8 }}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
            </span>
          )}
        </div>
        <div style={{ padding: '10px 12px 12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 10, marginBottom: 2 }}>{p.brandName}</p>
          <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, lineHeight: 1.3, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</p>
          {price ? (
            <div>
              {origPrice && origPrice > price && (
                <p style={{ color: 'var(--text-muted)', fontSize: 11, textDecoration: 'line-through' }}>₺{origPrice.toLocaleString('tr-TR')}</p>
              )}
              <p style={{ color: '#F4821F', fontSize: 15, fontWeight: 900 }}>₺{price.toLocaleString('tr-TR')}</p>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: 12, fontStyle: 'italic' }}>Fiyat için iletişim</p>
          )}
        </div>
      </div>
    </Link>
  )
}

function ListCard({ p, kur }: { p: Product; kur: number }) {
  const price = p.minPriceUsd ? Math.round(p.minPriceUsd * kur * 1.2) : null
  const origPrice = p.originalPrice ? Math.round(Number(p.originalPrice) * kur * 1.2) : null
  const discPct = price && origPrice && origPrice > price ? Math.round((1 - price / origPrice) * 100) : 0

  return (
    <Link href={`/urun/${p.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: 12, background: 'var(--bg-secondary)', flexShrink: 0, overflow: 'hidden' }}>
          {p.mainImageUrl
            ? <img src={p.mainImageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📡</div>
          }
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 10, marginBottom: 2 }}>{p.categoryName}</p>
          <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 700, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
          {p.shortDesc && (
            <p style={{ color: 'var(--text-muted)', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>{p.shortDesc}</p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {discPct > 0 && (
              <span style={{ background: '#DC2626', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 4 }}>-%{discPct}</span>
            )}
            {price ? (
              <p style={{ color: '#F4821F', fontSize: 15, fontWeight: 900 }}>₺{price.toLocaleString('tr-TR')}</p>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: 12, fontStyle: 'italic' }}>Fiyat için iletişim</p>
            )}
          </div>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 18 }}>›</div>
      </div>
    </Link>
  )
}

export default function UrunKampanyaPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={28} color="#F4821F" className="animate-spin" />
      </div>
    }>
      <UrunKampanyaInner />
    </Suspense>
  )
}