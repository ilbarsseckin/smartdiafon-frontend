'use client'
import { useState, useEffect } from 'react'
import AdminGuard from '@/components/layout/AdminGuard'
import AdminNavbar from '@/components/layout/AdminNavbar'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { Wrench, Star, Check, X, Trash2, MapPin, Phone, ChevronDown, ChevronUp } from 'lucide-react'

interface Installer {
  id: string
  name: string
  phone: string
  email?: string
  city: string
  district?: string
  company?: string
  experience?: string
  expertise?: string
  rating: number
  jobCount: number
  active: boolean
  notes?: string
  createdAt: string
}

export default function AdminKurulumcularPage() {
  return <AdminGuard><Inner /></AdminGuard>
}

function Inner() {
  const [list, setList] = useState<Installer[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [ratingInputs, setRatingInputs] = useState<Record<string, { rating: string; jobCount: string; notes: string }>>({})

  useEffect(() => {
    api.get('/api/admin/installers')
      .then(r => setList(r.data.data || []))
      .catch(() => toast.error('Yüklenemedi'))
      .finally(() => setLoading(false))
  }, [])

  const toggle = async (id: string) => {
    try {
      const r = await api.patch(`/api/admin/installers/${id}/toggle`)
      setList(l => l.map(i => i.id === id ? { ...i, active: r.data.data.active } : i))
      toast.success('Güncellendi')
    } catch { toast.error('Hata') }
  }

  const del = async (id: string) => {
    if (!confirm('Silinsin mi?')) return
    try {
      await api.delete(`/api/admin/installers/${id}`)
      setList(l => l.filter(i => i.id !== id))
      toast.success('Silindi')
    } catch { toast.error('Hata') }
  }

  const saveRating = async (id: string) => {
    const inp = ratingInputs[id] || { rating: '0', jobCount: '0', notes: '' }
    try {
      const r = await api.patch(`/api/admin/installers/${id}/rate`, {
        rating: parseFloat(inp.rating) || 0,
        jobCount: parseInt(inp.jobCount) || 0,
        notes: inp.notes || null,
      })
      setList(l => l.map(i => i.id === id ? { ...i, rating: r.data.data.rating, jobCount: r.data.data.jobCount, notes: r.data.data.notes } : i))
      toast.success('Puan güncellendi')
    } catch { toast.error('Hata') }
  }

  const pending = list.filter(i => !i.active)
  const active = list.filter(i => i.active)

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen p-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Wrench size={22} style={{ color: '#E63946' }} />
            <h1 className="text-[22px] font-black" style={{ color: 'var(--text-primary)' }}>Kurulum Ekibi</h1>
            <span className="ml-auto text-[13px] px-3 py-1 rounded-full font-bold"
              style={{ background: 'rgba(230,57,70,0.1)', color: '#E63946' }}>
              {active.length} aktif · {pending.length} bekleyen
            </span>
          </div>

          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Yükleniyor...</p>
          ) : (
            <>
              {pending.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-[13px] font-bold uppercase tracking-[1px] mb-3" style={{ color: 'var(--text-muted)' }}>
                    Bekleyen Başvurular ({pending.length})
                  </h2>
                  <div className="space-y-3">
                    {pending.map(inst => (
                      <InstallerCard key={inst.id} inst={inst} expanded={expanded} setExpanded={setExpanded}
                        ratingInputs={ratingInputs} setRatingInputs={setRatingInputs}
                        onToggle={toggle} onDelete={del} onSaveRating={saveRating} />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-[1px] mb-3" style={{ color: 'var(--text-muted)' }}>
                  Aktif Kurulumcular ({active.length})
                </h2>
                {active.length === 0 ? (
                  <div className="rounded-2xl p-8 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--text-muted)' }}>Henüz aktif kurulumcu yok</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {active.map(inst => (
                      <InstallerCard key={inst.id} inst={inst} expanded={expanded} setExpanded={setExpanded}
                        ratingInputs={ratingInputs} setRatingInputs={setRatingInputs}
                        onToggle={toggle} onDelete={del} onSaveRating={saveRating} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}

function InstallerCard({ inst, expanded, setExpanded, ratingInputs, setRatingInputs, onToggle, onDelete, onSaveRating }: any) {
  const isExp = expanded === inst.id
  const inp = ratingInputs[inst.id] || { rating: String(inst.rating || 0), jobCount: String(inst.jobCount || 0), notes: inst.notes || '' }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[15px] text-white flex-shrink-0"
          style={{ background: inst.active ? '#E63946' : '#9CA3AF' }}>
          {inst.name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>{inst.name}</p>
          <div className="flex items-center gap-3 flex-wrap mt-0.5">
            <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-muted)' }}>
              <MapPin size={10} />{inst.city}{inst.district ? ` / ${inst.district}` : ''}
            </span>
            <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-muted)' }}>
              <Phone size={10} />{inst.phone}
            </span>
            {Number(inst.rating) > 0 && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                <Star size={10} className="fill-amber-500" />{Number(inst.rating).toFixed(1)} · {inst.jobCount} iş
              </span>
            )}
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${inst.active ? 'text-green-700 bg-green-100' : 'text-amber-700 bg-amber-100'}`}>
              {inst.active ? 'Aktif' : 'Bekliyor'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onToggle(inst.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: inst.active ? 'rgba(220,38,38,0.1)' : 'rgba(22,163,74,0.1)' }}>
            {inst.active ? <X size={14} style={{ color: '#DC2626' }} /> : <Check size={14} style={{ color: '#16A34A' }} />}
          </button>
          <button onClick={() => setExpanded(isExp ? null : inst.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--bg-secondary)' }}>
            {isExp ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button onClick={() => onDelete(inst.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(220,38,38,0.1)' }}>
            <Trash2 size={14} style={{ color: '#DC2626' }} />
          </button>
        </div>
      </div>

      {isExp && (
        <div className="px-5 pb-5 pt-2 space-y-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            {inst.email && <div><span style={{ color: 'var(--text-muted)' }}>E-posta: </span>{inst.email}</div>}
            {inst.company && <div><span style={{ color: 'var(--text-muted)' }}>Firma: </span>{inst.company}</div>}
            {inst.experience && <div><span style={{ color: 'var(--text-muted)' }}>Deneyim: </span>{inst.experience}</div>}
            {inst.expertise && <div className="col-span-2"><span style={{ color: 'var(--text-muted)' }}>Uzmanlık: </span>{inst.expertise}</div>}
          </div>
          <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <p className="text-[12px] font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>Puan & İş Güncelle</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] mb-1 block" style={{ color: 'var(--text-muted)' }}>Yıldız (1-5)</label>
                <input type="number" min="0" max="5" step="0.1" value={inp.rating}
                  onChange={e => setRatingInputs((p: any) => ({ ...p, [inst.id]: { ...inp, rating: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-lg text-[13px]"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="text-[11px] mb-1 block" style={{ color: 'var(--text-muted)' }}>İş sayısı</label>
                <input type="number" min="0" value={inp.jobCount}
                  onChange={e => setRatingInputs((p: any) => ({ ...p, [inst.id]: { ...inp, jobCount: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-lg text-[13px]"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div className="flex items-end">
                <button onClick={() => onSaveRating(inst.id)}
                  className="w-full py-2 rounded-lg text-[13px] font-bold text-white"
                  style={{ background: '#E63946' }}>
                  Kaydet
                </button>
              </div>
            </div>
            <div className="mt-2">
              <label className="text-[11px] mb-1 block" style={{ color: 'var(--text-muted)' }}>Admin notu</label>
              <textarea value={inp.notes} rows={2}
                onChange={e => setRatingInputs((p: any) => ({ ...p, [inst.id]: { ...inp, notes: e.target.value } }))}
                className="w-full px-3 py-2 rounded-lg text-[13px] resize-none"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
