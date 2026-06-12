'use client'
import { useState, useEffect, useRef } from 'react'
import AdminGuard from '@/components/layout/AdminGuard'
import AdminNavbar from '@/components/layout/AdminNavbar'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import {
  Plus, Edit2, Trash2, Save, X, Loader2, ShoppingCart, Search, CheckCircle,
  ArrowUp, ArrowDown, Eye, EyeOff, Megaphone, Upload,
  Link as LinkIcon, Monitor, Smartphone, ExternalLink, Copy,
} from 'lucide-react'

interface Campaign {
  id: string
  slug?: string
  label?: string
  title: string
  description?: string
  badgeText?: string
  badgeColor?: string
  imageUrl?: string
  mobileImageUrl?: string
  backgroundColor?: string
  ctaText?: string
  ctaLink?: string
  sortOrder: number
  active: boolean
  startsAt?: string
  endsAt?: string
  createdAt?: string
  updatedAt?: string
}

interface FormData {
  slug: string
  label: string
  title: string
  description: string
  badgeText: string
  badgeColor: string
  imageUrl: string
  mobileImageUrl: string
  backgroundColor: string
  ctaText: string
  ctaLink: string
  active: boolean
  startsAt: string
  endsAt: string
}

const EMPTY_FORM: FormData = {
  slug: '',
  label: '', title: '', description: '',
  badgeText: '', badgeColor: '#DC2626',
  imageUrl: '', mobileImageUrl: '',
  backgroundColor: '#fef3c7',
  ctaText: '', ctaLink: '',
  active: true,
  startsAt: '', endsAt: '',
}

const PRESET_COLORS = [
  '#DC2626', '#ef4444', '#16a34a', '#2563eb',
  '#9333ea', '#db2777', '#0891b2', '#fef3c7',
]

type ImageVariant = 'desktop' | 'mobile'

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function KampanyalarInner() {
  const [items, setItems] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [productModalCampaign, setProductModalCampaign] = useState<Campaign | null>(null)
  const [campaignProducts, setCampaignProducts] = useState<any[]>([])
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [productSearch, setProductSearch] = useState('')
  const [addingProduct, setAddingProduct] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url')
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [mobileImageMode, setMobileImageMode] = useState<'url' | 'upload'>('url')
  const [uploadingMobileImage, setUploadingMobileImage] = useState(false)
  const mobileFileInputRef = useRef<HTMLInputElement>(null)

  const load = () => {
    setLoading(true)
    api.get('/api/admin/campaigns')
      .then(r => setItems(r.data.data || []))
      .catch(() => toast.error('Kampanyalar yüklenemedi'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => {
    setEditId(null)
    setForm({ ...EMPTY_FORM })
    setImageMode('url')
    setMobileImageMode('url')
    setModalOpen(true)
  }

  const openProductModal = async (c: Campaign) => {
    setProductModalCampaign(c)
    setProductModalOpen(true)
    setProductSearch('')
    try {
      const [cpRes, prodRes] = await Promise.all([
        api.get(`/api/admin/campaigns/${c.id}/products`),
        api.get('/api/catalog/products'),
      ])
      setCampaignProducts(cpRes.data.data || [])
      setAllProducts(prodRes.data.data || [])
    } catch { toast.error('Yüklenemedi') }
  }

  const addProduct = async (productId: string) => {
    if (!productModalCampaign) return
    setAddingProduct(true)
    try {
      await api.post(`/api/admin/campaigns/${productModalCampaign.id}/products`, { productId })
      const r = await api.get(`/api/admin/campaigns/${productModalCampaign.id}/products`)
      setCampaignProducts(r.data.data || [])
      toast.success('Ürün eklendi')
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Hata')
    } finally { setAddingProduct(false) }
  }

  const removeProduct = async (productId: string) => {
    if (!productModalCampaign) return
    try {
      await api.delete(`/api/admin/campaigns/${productModalCampaign.id}/products/${productId}`)
      setCampaignProducts(p => p.filter(cp => cp.productId !== productId))
      toast.success('Kaldırıldı')
    } catch { toast.error('Hata') }
  }

  const openEdit = (c: Campaign) => {
    setEditId(c.id)
    setForm({
      slug: c.slug || '',
      label: c.label || '',
      title: c.title || '',
      description: c.description || '',
      badgeText: c.badgeText || '',
      badgeColor: c.badgeColor || '#DC2626',
      imageUrl: c.imageUrl || '',
      mobileImageUrl: c.mobileImageUrl || '',
      backgroundColor: c.backgroundColor || '#fef3c7',
      ctaText: c.ctaText || '',
      ctaLink: c.ctaLink || '',
      active: c.active,
      startsAt: c.startsAt ? c.startsAt.substring(0, 16) : '',
      endsAt: c.endsAt ? c.endsAt.substring(0, 16) : '',
    })
    setImageMode('url')
    setMobileImageMode('url')
    setModalOpen(true)
  }

  const handleImageUpload = async (file: File, variant: ImageVariant) => {
    if (file.size > 10 * 1024 * 1024) { toast.error('Resim 10 MB üstü'); return }
    const setUploading = variant === 'mobile' ? setUploadingMobileImage : setUploadingImage
    const formField = variant === 'mobile' ? 'mobileImageUrl' : 'imageUrl'
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'banner')
      const res = await api.post('/api/admin/images/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setForm(f => ({ ...f, [formField]: res.data.data.url }))
      toast.success(variant === 'mobile' ? 'Mobil görsel yüklendi' : 'Görsel yüklendi')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Yüklenemedi')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, variant: ImageVariant) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file, variant)
    e.target.value = ''
  }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Başlık zorunlu'); return }
    if (!form.imageUrl.trim()) { toast.error('Görsel zorunlu'); return }

    setSaving(true)
    const body: any = {
      slug: form.slug.trim() || null,
      label: form.label || null,
      title: form.title,
      description: form.description || null,
      badgeText: form.badgeText || null,
      badgeColor: form.badgeColor || null,
      imageUrl: form.imageUrl || null,
      mobileImageUrl: form.mobileImageUrl || null,
      backgroundColor: form.backgroundColor || null,
      ctaText: form.ctaText || null,
      ctaLink: form.ctaLink || null,
      active: form.active,
      startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : null,
      endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : null,
    }

    try {
      if (editId) {
        await api.put(`/api/admin/campaigns/${editId}`, body)
        toast.success('Kampanya güncellendi')
      } else {
        await api.post('/api/admin/campaigns', body)
        toast.success('Kampanya oluşturuldu')
      }
      setModalOpen(false)
      load()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Kayıt başarısız')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (c: Campaign) => {
    try {
      await api.patch(`/api/admin/campaigns/${c.id}/toggle`)
      load()
    } catch { toast.error('Durum değiştirilemedi') }
  }

  const handleDelete = async (c: Campaign) => {
    if (!confirm(`"${c.title}" kampanyası silinsin mi?`)) return
    try {
      await api.delete(`/api/admin/campaigns/${c.id}`)
      toast.success('Kampanya silindi')
      load()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Silinemedi')
    }
  }

  const handleReorder = async (c: Campaign, dir: 'up' | 'down') => {
    const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder)
    const idx = sorted.findIndex(x => x.id === c.id)
    const swap = dir === 'up' ? idx - 1 : idx + 1
    if (swap < 0 || swap >= sorted.length) return
    const reordered = [...sorted]
    ;[reordered[idx], reordered[swap]] = [reordered[swap], reordered[idx]]
    try {
      await api.post('/api/admin/campaigns/reorder', { ids: reordered.map(x => x.id) })
      load()
    } catch { toast.error('Sıralama başarısız') }
  }

  const copyLpUrl = (slug: string) => {
    const url = `https://smartdiafon.com.tr/lp/${slug}`
    navigator.clipboard.writeText(url)
    toast.success('Link kopyalandı!')
  }

  const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder)

  const renderImageUploader = (variant: ImageVariant) => {
    const isMobile = variant === 'mobile'
    const value = isMobile ? form.mobileImageUrl : form.imageUrl
    const field = isMobile ? 'mobileImageUrl' : 'imageUrl'
    const mode = isMobile ? mobileImageMode : imageMode
    const setMode = isMobile ? setMobileImageMode : setImageMode
    const uploading = isMobile ? uploadingMobileImage : uploadingImage
    const ref = isMobile ? mobileFileInputRef : fileInputRef

  return (
      <div>
        <label className="flex items-center gap-1.5 text-[12px] font-semibold mb-1.5"
          style={{ color: 'var(--text-secondary)' }}>
          {isMobile ? <Smartphone size={13} /> : <Monitor size={13} />}
          {isMobile ? 'Mobil Görsel (opsiyonel)' : 'Banner Görseli *'}
        </label>
        <div className="flex gap-1 mb-2">
          {(['url', 'upload'] as const).map(m => (
            <button key={m} type="button" onClick={() => setMode(m)}
              className="flex-1 text-[11px] py-1.5 rounded-lg font-medium transition-colors"
              style={mode === m
                ? { background: 'rgba(244,130,31,0.1)', color: '#DC2626', border: '1px solid rgba(244,130,31,0.2)' }
                : { color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
              {m === 'url' ? <><LinkIcon size={11} className="inline mr-1" />URL</> : <><Upload size={11} className="inline mr-1" />Yükle</>}
            </button>
          ))}
        </div>
        {mode === 'url' ? (
          <input value={value}
            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-lg text-[13px]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
        ) : (
          <div onClick={() => !uploading && ref.current?.click()}
            className="w-full py-4 rounded-lg flex items-center justify-center cursor-pointer text-[12px]"
            style={{ border: '1px dashed var(--border)', color: 'var(--text-muted)' }}>
            {uploading
              ? <><Loader2 size={14} className="animate-spin mr-1.5" />Yükleniyor...</>
              : <><Upload size={14} className="mr-1.5" />Dosya seç (maks. 10 MB)</>}
            <input ref={ref} type="file" accept="image/*" hidden onChange={e => handleFileSelect(e, variant)} />
          </div>
        )}
        {value && (
          <div className="mt-2 rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <img src={value} alt="" className="w-full h-24 object-cover" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <AdminNavbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Megaphone size={20} style={{ color: '#DC2626' }} />
            <h1 className="text-[20px] font-bold" style={{ color: 'var(--text-primary)' }}>Kampanyalar</h1>
            <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>({items.length})</span>
          </div>
          <button onClick={openCreate}
            className="flex items-center gap-1.5 text-[13px] font-semibold px-3.5 py-2 rounded-lg text-white"
            style={{ background: '#DC2626' }}>
            <Plus size={15} /> Yeni Kampanya
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin" style={{ color: '#DC2626' }} />
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20 rounded-2xl"
            style={{ border: '1px dashed var(--border)', color: 'var(--text-muted)' }}>
            <Megaphone size={36} className="mx-auto mb-3 opacity-40" />
            <p className="text-[14px]">Henüz kampanya yok. İlk kampanyanı oluştur.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((c, i) => (
              <div key={c.id}
                className="flex items-center gap-4 p-3 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', opacity: c.active ? 1 : 0.55 }}>
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => handleReorder(c, 'up')} disabled={i === 0}
                    className="p-1 rounded disabled:opacity-25" style={{ color: 'var(--text-muted)' }}>
                    <ArrowUp size={14} />
                  </button>
                  <button onClick={() => handleReorder(c, 'down')} disabled={i === sorted.length - 1}
                    className="p-1 rounded disabled:opacity-25" style={{ color: 'var(--text-muted)' }}>
                    <ArrowDown size={14} />
                  </button>
                </div>

                <div className="relative w-28 h-16 rounded-lg overflow-hidden shrink-0"
                  style={{ background: c.backgroundColor || 'var(--surface)' }}>
                  {c.imageUrl && <img src={c.imageUrl} alt="" className="w-full h-full object-cover" />}
                  {c.badgeText && (
                    <span className="absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                      style={{ background: c.badgeColor || '#DC2626' }}>
                      {c.badgeText}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {c.label && (
                    <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#DC2626' }}>
                      {c.label}
                    </p>
                  )}
                  <p className="text-[14px] font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                    {c.title}
                  </p>
                  {/* Landing page linki */}
                  {c.slug ? (
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-[10px] px-2 py-0.5 rounded font-mono"
                        style={{ background: 'rgba(244,130,31,0.1)', color: '#DC2626' }}>
                        /lp/{c.slug}
                      </code>
                      <button onClick={() => copyLpUrl(c.slug!)}
                        title="Linki kopyala"
                        className="p-0.5 hover:text-[#DC2626] transition-colors"
                        style={{ color: 'var(--text-muted)' }}>
                        <Copy size={11} />
                      </button>
                      <a href={`/lp/${c.slug}`} target="_blank" rel="noopener noreferrer"
                        title="Önizle"
                        className="p-0.5 hover:text-[#DC2626] transition-colors"
                        style={{ color: 'var(--text-muted)' }}>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  ) : (
                    <p className="text-[10px] mt-1 italic" style={{ color: 'var(--text-muted)' }}>
                      Landing page için slug ekle
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={() => handleToggle(c)} title={c.active ? 'Pasifleştir' : 'Aktifleştir'}
                    className="p-2 rounded-lg" style={{ color: c.active ? '#16a34a' : 'var(--text-muted)' }}>
                    {c.active ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  <button onClick={() => openProductModal(c)} className="p-2 rounded-lg" title="Ürünleri Yönet" style={{ color: 'var(--text-muted)' }}>
                    <ShoppingCart size={15} />
                  </button>
                  <button onClick={() => openEdit(c)} className="p-2 rounded-lg" style={{ color: 'var(--text-muted)' }}>
                    <Edit2 size={15} />
                  </button>
                  <button onClick={() => handleDelete(c)}
                    className="p-2 rounded-lg hover:text-red-500" style={{ color: 'var(--text-muted)' }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── MODAL ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setModalOpen(false)}>
          <div onClick={e => e.stopPropagation()}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>

            <div className="sticky top-0 flex items-center justify-between px-5 py-3.5 z-10"
              style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
              <h2 className="text-[15px] font-bold" style={{ color: 'var(--text-primary)' }}>
                {editId ? 'Kampanyayı Düzenle' : 'Yeni Kampanya'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">

              <Field label="Üst Etiket (opsiyonel)">
                <Input value={form.label} onChange={v => setForm(f => ({ ...f, label: v }))}
                  placeholder="örn. FIRSAT" />
              </Field>

              <Field label="Başlık *">
                <Input value={form.title}
                  onChange={v => {
                    setForm(f => ({
                      ...f,
                      title: v,
                      // Slug otomatik doldur (sadece yeni kampanyada ve slug boşsa)
                      slug: f.slug === '' ? toSlug(v) : f.slug,
                    }))
                  }}
                  placeholder="örn. 3 Yelken Bayrak Alana Kartvizit 1 TL" />
              </Field>

              {/* SLUG ALANI */}
              <div>
                <label className="block text-[12px] font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Landing Page Slug
                  <span className="ml-1 text-[10px] font-normal" style={{ color: 'var(--text-muted)' }}>
                    (Instagram reklamı için URL)
                  </span>
                </label>
                <div className="flex items-center rounded-lg overflow-hidden"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
                  <span className="px-3 py-2 text-[12px] flex-shrink-0"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', borderRight: '1px solid var(--border)' }}>
                    /lp/
                  </span>
                  <input
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: toSlug(e.target.value) }))}
                    placeholder="3-yelken-bayrak-kartvizit-1tl"
                    className="flex-1 px-3 py-2 text-[13px] outline-none font-mono"
                    style={{ background: 'transparent', color: 'var(--text-primary)' }}
                  />
                </div>
                {form.slug && (
                  <p className="text-[11px] mt-1" style={{ color: '#DC2626' }}>
                    🔗 smartdiafon.com.tr/lp/{form.slug}
                  </p>
                )}
              </div>

              <Field label="Açıklama (opsiyonel)">
                <textarea value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={2} placeholder="Teklif detayı..."
                  className="w-full px-3 py-2 rounded-lg text-[13px] resize-none"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Rozet Metni">
                  <Input value={form.badgeText} onChange={v => setForm(f => ({ ...f, badgeText: v }))}
                    placeholder="örn. 1 TL" />
                </Field>
                <Field label="Rozet Rengi">
                  <ColorPicker value={form.badgeColor} onChange={v => setForm(f => ({ ...f, badgeColor: v }))} />
                </Field>
              </div>

              {renderImageUploader('desktop')}
              {renderImageUploader('mobile')}

              <Field label="Arka Plan Rengi">
                <ColorPicker value={form.backgroundColor} onChange={v => setForm(f => ({ ...f, backgroundColor: v }))} />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Buton Metni">
                  <Input value={form.ctaText} onChange={v => setForm(f => ({ ...f, ctaText: v }))}
                    placeholder="örn. Hemen Sipariş Ver" />
                </Field>
                <Field label="Buton Linki">
                  <Input value={form.ctaLink} onChange={v => setForm(f => ({ ...f, ctaLink: v }))}
                    placeholder="/katalog/yelken-bayrak" />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Başlangıç (opsiyonel)">
                  <input type="datetime-local" value={form.startsAt}
                    onChange={e => setForm(f => ({ ...f, startsAt: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-[13px]"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                </Field>
                <Field label="Bitiş (opsiyonel)">
                  <input type="datetime-local" value={form.endsAt}
                    onChange={e => setForm(f => ({ ...f, endsAt: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-[13px]"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                </Field>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active}
                  onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
                <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Aktif</span>
              </label>
            </div>

            <div className="sticky bottom-0 flex gap-2 px-5 py-3.5"
              style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
              <button onClick={() => setModalOpen(false)}
                className="flex-1 text-[13px] font-medium py-2.5 rounded-lg"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                İptal
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-semibold py-2.5 rounded-lg text-white disabled:opacity-60"
                style={{ background: '#DC2626' }}>
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ÜRÜN YÖNETİMİ MODAL */}
      {productModalOpen && productModalCampaign && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setProductModalOpen(false)}>
          <div onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-hidden flex flex-col"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', margin: '0 16px' }}>
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>Kampanya Ürünleri</h3>
                <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{productModalCampaign.title}</p>
              </div>
              <button onClick={() => setProductModalOpen(false)} style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {/* Kampanyaya ekli ürünler */}
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[1px] mb-2" style={{ color: 'var(--text-muted)' }}>
                  Kampanyada ({campaignProducts.length} ürün)
                </p>
                {campaignProducts.length === 0 ? (
                  <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Henüz ürün eklenmedi</p>
                ) : (
                  <div className="space-y-2">
                    {campaignProducts.map((cp: any) => (
                      <div key={cp.productId} className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                        <span className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{cp.productName}</span>
                        <button onClick={() => removeProduct(cp.productId)}
                          className="text-[12px] px-2 py-1 rounded-lg"
                          style={{ color: '#DC2626', background: 'rgba(220,38,38,0.1)' }}>
                          Kaldır
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ürün arama ve ekleme */}
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[1px] mb-2" style={{ color: 'var(--text-muted)' }}>
                  Ürün Ekle
                </p>
                <div className="relative mb-3">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                  <input value={productSearch} onChange={e => setProductSearch(e.target.value)}
                    placeholder="Ürün ara..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px]"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {allProducts
                    .filter(p => !campaignProducts.find((cp: any) => cp.productId === p.id))
                    .filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()))
                    .slice(0, 20)
                    .map((p: any) => (
                      <div key={p.id} className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                        <div className="flex items-center gap-2 min-w-0">
                          {p.mainImageUrl && (
                            <img src={p.mainImageUrl} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                          )}
                          <span className="text-[13px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                        </div>
                        <button onClick={() => addProduct(p.id)} disabled={addingProduct}
                          className="text-[12px] px-3 py-1 rounded-lg text-white flex-shrink-0 ml-2"
                          style={{ background: '#DC2626' }}>
                          Ekle
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Kampanya URL */}
              {productModalCampaign.slug && (
                <div className="p-3 rounded-xl" style={{ background: 'rgba(244,130,31,0.06)', border: '1px solid rgba(244,130,31,0.2)' }}>
                  <p className="text-[11px] font-bold mb-1" style={{ color: '#DC2626' }}>Kampanya URL</p>
                  <p className="text-[12px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                    smartdiafon.com.tr/urun-kampanya?kampanya={productModalCampaign.slug}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg text-[13px]"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
  )
}

function ColorPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={value} onChange={e => onChange(e.target.value)}
        className="w-9 h-9 rounded-lg cursor-pointer shrink-0"
        style={{ border: '1px solid var(--border)', background: 'transparent' }} />
      <div className="flex flex-wrap gap-1">
        {PRESET_COLORS.map(col => (
          <button key={col} type="button" onClick={() => onChange(col)}
            className="w-5 h-5 rounded"
            style={{ background: col, border: value === col ? '2px solid var(--text-primary)' : '1px solid var(--border)' }} />
        ))}
      </div>
    </div>
  )
}

export default function KampanyalarAdmin() {
  return (
    <AdminGuard>
      <KampanyalarInner />
    </AdminGuard>
  )
}