'use client'
import Link from 'next/link'
import {
  ShoppingCart, User, Sun, Moon, Search, ChevronDown, Heart,
  ArrowRight, Package, Sparkles, HelpCircle, Phone,
  FileText, BookOpen, Menu, X, ClipboardList,
  Building2, MonitorSmartphone, Home, Wrench, Percent, Headphones, ShoppingBag,
} from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { useTheme } from './ThemeProvider'
import { useState, useRef, useEffect } from 'react'
import api from '@/lib/api'
import Logo from '@/components/ui/Logo'
import { useFavorites } from '@/hooks/useFavorites'
import { useAuthStore } from '@/lib/store/auth'
import SearchOverlay from '@/components/ui/SearchOverlay'

interface Category {
  id: string
  slug: string
  name: string
  icon?: string
  parentId?: string | null
  sortOrder?: number
  children?: Category[]
}

interface Product {
  id: string
  slug: string
  name: string
  shortDesc?: string
  categorySlug: string
  categoryName: string
  mainImageUrl?: string
  featured?: boolean
}

const topUtility = [
  { href: '/kampanyalar',     label: 'Kampanyalar',                icon: Sparkles      },
  { href: '/teklif',          label: 'Teklif Hazırla',             icon: FileText      },
  { href: '/nasil-siparis',   label: 'Nasıl Sipariş Verebilirim?', icon: FileText      },
  { href: '/hesabim',         label: 'Siparişlerim',               icon: ClipboardList },
  { href: '/blog',            label: 'Blog',                       icon: BookOpen      },
  { href: '/yardim',          label: 'Yardım Merkezi',             icon: HelpCircle    },
  { href: '/iletisim',        label: 'İletişim',                   icon: Phone         },
]

// Kategori slug'ına göre ikon ata (lucide)
function catIcon(slug: string, name: string) {
  const s = (slug + ' ' + name).toLowerCase()
  if (s.includes('ip') || s.includes('monitor') || s.includes('linux') || s.includes('android')) return MonitorSmartphone
  if (s.includes('akilli') || s.includes('akıllı') || s.includes('ev')) return Home
  if (s.includes('kurulum') || s.includes('hizmet') || s.includes('aksesuar')) return Wrench
  if (s.includes('kampanya')) return Percent
  if (s.includes('destek') || s.includes('yardim')) return Headphones
  return Building2
}

function getBadge(slug: string): { label: string; bg: string; color: string } | null {
  if (slug.startsWith('hizli-') || slug === 'acil')
    return { label: 'Acil', bg: '#DC2626', color: '#fff' }
  return null
}

function katHref(slug: string): string {
  if (slug === 'teklif') return '/teklif'
  return `/katalog/${slug}`
}

export default function Navbar() {
  const itemCount = useCartStore(s => s.items.length)
  const { favorites } = useFavorites()
  const favCount = favorites.length
  const { theme, toggle } = useTheme()
  const user = useAuthStore(s => s.user)

  const [categories, setCategories] = useState<Category[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const megaTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    Promise.all([
      api.get('/api/catalog/categories/tree'),
      api.get('/api/catalog/products'),
    ]).then(([catRes, prodRes]) => {
      const raw: Category[] = catRes.data.data || []
      const flat: Category[] = []
      raw.forEach(cat => {
        flat.push({ ...cat, parentId: cat.parentId ?? null })
        if (cat.children?.length) {
          cat.children.forEach(child => flat.push({ ...child, parentId: cat.id }))
        }
      })
      setCategories(flat.filter(c => !c.parentId))
      setAllCategories(flat)
      setProducts(prodRes.data.data || [])
    }).catch(err => console.error('Navbar veri yüklenemedi:', err))
  }, [])

  const openMega = (slug: string) => { clearTimeout(megaTimer.current); setMegaOpen(slug) }
  const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(null), 150) }
  const keepMega = () => clearTimeout(megaTimer.current)

  const activeKat = categories.find(k => k.slug === megaOpen)
  const subCats = activeKat
    ? allCategories.filter(c => c.parentId === activeKat.id).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : []
  const subSlugs = subCats.map(c => c.slug)
  const megaProducts = megaOpen
    ? products.filter(p => p.categorySlug === megaOpen || subSlugs.includes(p.categorySlug))
    : []
  const featuredCards = megaProducts.filter(p => p.featured).slice(0, 8)
  const cardsList = featuredCards.length >= 4 ? featuredCards : megaProducts.slice(0, 8)

  const userInitial = user?.name?.charAt(0).toUpperCase() || ''

  return (
    <>
      <header className="sticky top-0 z-50">

        {/* ROW 1 — Üst utility bar (masaüstü) */}
        <div className="hidden md:block"
          style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between gap-4">
            <div className="flex items-center gap-5 flex-wrap">
              {topUtility.map(l => (
                <Link key={l.href} href={l.href}
                  className="flex items-center gap-1 text-[11px] font-medium transition-colors hover:text-[#E63946] whitespace-nowrap"
                  style={{ color: 'var(--text-secondary)' }}>
                  <l.icon size={11} />
                  {l.label}
                </Link>
              ))}
            </div>
            <button onClick={toggle}
              className="flex items-center justify-center w-6 h-6 rounded transition-colors hover:bg-red-500/10"
              style={{ color: 'var(--text-muted)' }}>
              {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
            </button>
          </div>
        </div>

        {/* ROW 2 — Ana bar */}
        <div style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-[64px] md:h-[88px] flex items-center gap-3 md:gap-5">

            <Link href="/" className="flex flex-col flex-shrink-0">
              <Logo className="h-7 md:h-9" />
              <span className="hidden md:block text-[9px] font-bold tracking-[2px] mt-0.5"
                style={{ color: 'var(--text-muted)' }}>
                TÜRKİYE'NİN ONLİNE DİAFON PLATFORMU
              </span>
            </Link>

            {/* Masaüstü arama */}
            <button onClick={() => setSearchOpen(true)}
              className="hidden md:flex flex-1 max-w-[560px] items-center gap-3 px-5 py-3.5 rounded-2xl text-[14px] transition-all hover:border-[#E63946]"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <span>Ürün, marka veya model ara...</span>
            </button>

            {/* Mobil sağ ikonlar */}
            <div className="md:hidden flex items-center gap-1.5 ml-auto">
              <button onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ border: '1px solid var(--border)' }}>
                <Search size={15} style={{ color: 'var(--text-secondary)' }} />
              </button>
              <Link href="/sepet" className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ border: '1px solid var(--border)' }}>
                <ShoppingCart size={15} style={{ color: 'var(--text-secondary)' }} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#E63946] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setMobileMenu(o => !o)}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ border: '1px solid var(--border)' }}>
                {mobileMenu ? <X size={16} style={{ color: 'var(--text-secondary)' }} /> : <Menu size={16} style={{ color: 'var(--text-secondary)' }} />}
              </button>
            </div>

            {/* Masaüstü sağ — Favoriler / Hesabım / Sepetim + Teklif */}
            <div className="hidden md:flex items-center gap-6 flex-shrink-0 ml-auto">

              <Link href="/favorilerim" className="flex flex-col items-center gap-1 group">
                <div className="relative">
                  <Heart size={22} fill={favCount > 0 ? '#E63946' : 'none'}
                    className="transition-colors group-hover:text-[#E63946]"
                    style={{ color: favCount > 0 ? '#E63946' : 'var(--text-secondary)' }} />
                  {favCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 bg-[#E63946] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {favCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>Favoriler</span>
              </Link>

              <Link href="/hesabim" className="flex flex-col items-center gap-1 group">
                {user ? (
                  <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: '#E63946' }}>
                    {userInitial}
                  </div>
                ) : (
                  <User size={22} className="transition-colors group-hover:text-[#E63946]"
                    style={{ color: 'var(--text-secondary)' }} />
                )}
                <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>Hesabım</span>
              </Link>

              <Link href="/sepet" className="flex flex-col items-center gap-1 group">
                <div className="relative">
                  <ShoppingCart size={22} className="transition-colors group-hover:text-[#E63946]"
                    style={{ color: 'var(--text-secondary)' }} />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 bg-[#E63946] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>Sepetim</span>
              </Link>

              {/* TEKLİF OLUŞTUR büyük buton */}
              <Link href="/teklif"
                className="flex items-center gap-3 pl-5 pr-4 py-3 rounded-2xl text-white transition-all hover:shadow-lg"
                style={{ background: '#E63946' }}>
                <ClipboardList size={22} />
                <div className="flex flex-col leading-tight">
                  <span className="text-[14px] font-black">TEKLİF OLUŞTUR</span>
                  <span className="text-[10px] opacity-90">3 Dakikada Teklif Alın</span>
                </div>
                <ChevronDown size={16} className="-rotate-90" />
              </Link>
            </div>
          </div>
        </div>

        {/* ROW 3 — Kategori bar (masaüstü) ikonlu */}
        <div className="hidden lg:block relative"
          style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto px-4 h-[68px] flex items-center gap-1">
            {categories.map((k, idx) => {
              const isActive = megaOpen === k.slug
              const Icon = catIcon(k.slug, k.name)
              return (
                <div key={k.slug}
                  onMouseEnter={() => k.slug !== 'teklif' && openMega(k.slug)}
                  onMouseLeave={closeMega}
                  className="relative h-full flex items-center">
                  {idx > 0 && (
                    <div className="w-px h-8 mx-2" style={{ background: 'var(--border)' }} />
                  )}
                  <Link href={katHref(k.slug)}
                    className="relative flex items-center gap-2.5 px-2 py-2 transition-all whitespace-nowrap group">
                    <Icon size={26} strokeWidth={1.5}
                      className="transition-colors"
                      style={{ color: isActive ? '#E63946' : 'var(--text-secondary)' }} />
                    <span className="text-[13px] font-bold leading-tight"
                      style={{ color: isActive ? '#E63946' : 'var(--text-primary)' }}>
                      {k.name}
                    </span>
                    <ChevronDown size={14} className="transition-transform"
                      style={{ color: 'var(--text-muted)', transform: isActive ? 'rotate(180deg)' : 'none' }} />
                    {isActive && (
                      <span className="absolute left-2 right-7 -bottom-0 h-[3px] rounded-full" style={{ background: '#E63946' }} />
                    )}
                  </Link>
                </div>
              )
            })}

            <div className="flex-1" />

            {/* DiafonBox Uyumluluk Testi — outline */}
            <Link href="/uyumluluk"
              className="flex items-center gap-2.5 px-4 py-3 rounded-2xl transition-all whitespace-nowrap hover:bg-red-500/5"
              style={{ border: '1.5px solid #E63946' }}>
              <Search size={20} style={{ color: '#E63946' }} />
              <span className="text-[13px] font-bold leading-tight" style={{ color: '#E63946' }}>
                DiafonBox<br />Uyumluluk Testi
              </span>
            </Link>
          </div>
        </div>

        {/* MOBİL MENÜ */}
        {mobileMenu && (
          <div className="md:hidden absolute top-full left-0 right-0 shadow-lg z-50"
            style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
            <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Link href="/teklif" onClick={() => setMobileMenu(false)}
                  className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-bold text-[13px] text-white"
                  style={{ background: '#E63946' }}>
                  <ClipboardList size={16} /> Ücretsiz Teklif Al
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/kurulum-ekibi" onClick={() => setMobileMenu(false)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-[12px]"
                    style={{ border: '1.5px solid #E63946', color: '#E63946' }}>
                    <Wrench size={14} /> Kurulum Ekibi
                  </Link>
                  <Link href="/uyumluluk" onClick={() => setMobileMenu(false)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-[12px] text-white"
                    style={{ background: '#E63946' }}>
                    <Search size={14} /> Uyumluluk Testi
                  </Link>
                </div>
              </div>

              <Link href="/hesabim" onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                style={{ background: 'var(--bg-secondary)' }}>
                {user ? (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                    style={{ background: '#E63946' }}>
                    {userInitial}
                  </div>
                ) : (
                  <User size={14} style={{ color: 'var(--text-secondary)' }} />
                )}
                <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>
                  {user ? 'Hesabım' : 'Üye Giriş / Üye Ol'}
                </span>
              </Link>

              <Link href="/hesabim" onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                style={{ background: 'var(--bg-secondary)' }}>
                <ClipboardList size={14} style={{ color: 'var(--text-secondary)' }} />
                <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>Siparişlerim</span>
              </Link>

              <Link href="/favorilerim" onClick={() => setMobileMenu(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                style={{ background: 'var(--bg-secondary)' }}>
                <span className="flex items-center gap-2">
                  <Heart size={14} fill={favCount > 0 ? '#E63946' : 'none'}
                    style={{ color: favCount > 0 ? '#E63946' : 'var(--text-secondary)' }} />
                  <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>Favorilerim</span>
                </span>
                {favCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E63946] text-white text-[10px] font-bold">{favCount}</span>
                )}
              </Link>

              <Link href="/sepet" onClick={() => setMobileMenu(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                style={{ background: 'var(--bg-secondary)' }}>
                <span className="flex items-center gap-2">
                  <ShoppingCart size={14} style={{ color: 'var(--text-secondary)' }} />
                  <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>Sepetim</span>
                </span>
                {itemCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E63946] text-white text-[10px] font-bold">{itemCount}</span>
                )}
              </Link>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[1px] mb-2 mt-3" style={{ color: 'var(--text-muted)' }}>
                  Kategoriler
                </p>
                {categories.map(k => {
                  const Icon = catIcon(k.slug, k.name)
                  return (
                    <Link key={k.slug} href={katHref(k.slug)} onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px]"
                      style={{ color: 'var(--text-secondary)' }}>
                      <Icon size={18} strokeWidth={1.5} /> {k.name}
                    </Link>
                  )
                })}
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[1px] mb-2 mt-3" style={{ color: 'var(--text-muted)' }}>
                  Hızlı Bağlantılar
                </p>
                {topUtility.map(l => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px]"
                    style={{ color: 'var(--text-secondary)' }}>
                    <l.icon size={13} /> {l.label}
                  </Link>
                ))}
              </div>

              <button onClick={() => { toggle(); setMobileMenu(false) }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl w-full"
                style={{ background: 'var(--bg-secondary)' }}>
                {theme === 'dark' ? <Sun size={14} className="text-[#E63946]" /> : <Moon size={14} style={{ color: 'var(--text-secondary)' }} />}
                <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>
                  {theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MEGA MENÜ */}
      {!!megaOpen && (
        <div className="fixed left-0 right-0 z-40 shadow-2xl"
          style={{ top: 'calc(36px + 88px + 68px)', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
          onMouseEnter={keepMega} onMouseLeave={closeMega}>
          <div className="max-w-7xl mx-auto px-6 py-7">
            <h3 className="text-[24px] font-black tracking-[-0.5px] mb-5" style={{ color: 'var(--text-primary)' }}>
              {activeKat?.name}
            </h3>

            {subCats.length > 0 && (
              <div className="flex gap-10">
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-2 gap-x-8">
                    {subCats.map(sub => {
                      const badge = getBadge(sub.slug)
                      return (
                        <Link key={sub.slug} href={`/katalog/${sub.slug}`} onClick={() => setMegaOpen(null)}
                          className="flex items-center justify-between py-2.5 text-[14px] font-medium border-b transition-colors hover:text-[#E63946]"
                          style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
                          <span>{sub.name}</span>
                          {badge && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ml-2"
                              style={{ background: badge.bg, color: badge.color }}>
                              {badge.label}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                  <Link href={`/katalog/${megaOpen}`} onClick={() => setMegaOpen(null)}
                    className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-bold transition-colors hover:text-[#E63946]"
                    style={{ color: 'var(--text-primary)' }}>
                    Tüm Ürünler <ArrowRight size={13} />
                  </Link>
                </div>
                {cardsList.length > 0 && (
                  <div className="w-[560px] flex-shrink-0">
                    <div className="grid grid-cols-4 gap-3">
                      {cardsList.slice(0, 8).map(p => (
                        <Link key={p.slug} href={`/urun/${p.slug}`} onClick={() => setMegaOpen(null)}
                          className="group flex flex-col rounded-xl overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
                          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                          <div className="aspect-square overflow-hidden flex items-center justify-center"
                            style={{ background: 'var(--bg-secondary)' }}>
                            {p.mainImageUrl ? (
                              <img src={p.mainImageUrl} alt={p.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={e => (e.currentTarget.style.display = 'none')} />
                            ) : (
                              <Package size={28} className="opacity-30" />
                            )}
                          </div>
                          <p className="text-[11px] font-bold leading-tight text-center px-1.5 py-2 line-clamp-2"
                            style={{ color: 'var(--text-primary)' }}>
                            {p.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {subCats.length === 0 && cardsList.length > 0 && (
              <div className="flex gap-10">
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-x-6 gap-y-1.5 mb-5">
                    {megaProducts.slice(0, 12).map(p => (
                      <Link key={p.slug} href={`/urun/${p.slug}`} onClick={() => setMegaOpen(null)}
                        className="text-[13px] py-1 transition-colors hover:text-[#E63946]"
                        style={{ color: 'var(--text-secondary)' }}>
                        {p.name}
                      </Link>
                    ))}
                  </div>
                  <Link href={`/katalog/${megaOpen}`} onClick={() => setMegaOpen(null)}
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold hover:text-[#E63946]"
                    style={{ color: 'var(--text-primary)' }}>
                    Tüm Ürünler <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}

            {subCats.length === 0 && cardsList.length === 0 && (
              <div className="py-12 text-center">
                <Package size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-[14px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Bu kategoride henüz ürün veya alt kategori yok.
                </p>
                <Link href={`/katalog/${megaOpen}`} onClick={() => setMegaOpen(null)}
                  className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-bold hover:text-[#E63946]"
                  style={{ color: '#E63946' }}>
                  Kategori sayfasını ziyaret et <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ARAMA OVERLAY */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        categories={allCategories.filter(c => !c.parentId)}
        allProducts={products}
      />
    </>
  )
}