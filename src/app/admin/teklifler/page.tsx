'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import {
  FileText, Phone, Mail, MapPin, Building2, Package, Wrench,
  Trash2, Loader2, ChevronDown, Check, Clock, X
} from 'lucide-react'

interface Quote {
  id: string
  name: string
  phone: string
  email: string | null
  city: string | null
  systemType: string | null
  infrastructure: string | null
  apartmentCount: number | null
  doorCount: number | null
  packageName: string | null
  withDiafonBox: boolean
  wantInstallation: boolean
  productsJson: string | null
  totalTl: number | null
  adminNote: string | null
  status: string
  createdAt: string
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NEW: { label: 'Yeni', color: '#DC2626' },
  CONTACTED: { label: 'İletişime Geçildi', color: '#F59E0B' },
  QUOTED: { label: 'Teklif Verildi', color: '#2563EB' },
  WON: { label: 'Kazanıldı', color: '#10B981' },
  LOST: { label: 'Kaybedildi', color: '#6B7280' },
}

export default function AdminTekliflerPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('ALL')

  const load = async () => {
    setLoading(true)
    try {
      const r = await api.get('/api/admin/quote-requests')
      setQuotes(r.data.data || [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/api/admin/quote-requests/${id}`, { status })
      setQuotes(qs => qs.map(q => q.id === id ? { ...q, status } : q))
    } catch {}
  }

  const remove = async (id: string) => {
    if (!confirm('Bu teklif talebini silmek istediğinize emin misiniz?')) return
    try {
      await api.delete(`/api/admin/quote-requests/${id}`)
      setQuotes(qs => qs.filter(q => q.id !== id))
    } catch {}
  }

  const filtered = filter === 'ALL' ? quotes : quotes.filter(q => q.status === filter)
  const newCount = quotes.filter(q => q.status === 'NEW').length

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
        <Loader2 className="animate-spin" size={32} style={{ color: '#DC2626' }} />
      </div>
    )
  }

  return (
    <div style={{ padding: '24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <FileText size={24} style={{ color: '#DC2626' }} />
        <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>Teklif Talepleri</h1>
        {newCount > 0 && (
          <span style={{ background: '#DC2626', color: 'white', fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 99 }}>
            {newCount} yeni
          </span>
        )}
      </div>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
        Teklif sihirbazından gelen müşteri talepleri
      </p>

      {/* Filtreler */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={() => setFilter('ALL')}
          style={{ padding: '6px 14px', borderRadius: 99, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: filter === 'ALL' ? '#DC2626' : 'var(--bg-secondary)', color: filter === 'ALL' ? 'white' : 'var(--text-secondary)' }}>
          Tümü ({quotes.length})
        </button>
        {Object.entries(STATUS_LABELS).map(([key, { label, color }]) => {
          const count = quotes.filter(q => q.status === key).length
          return (
            <button key={key} onClick={() => setFilter(key)}
              style={{ padding: '6px 14px', borderRadius: 99, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: filter === key ? color : 'var(--bg-secondary)', color: filter === key ? 'white' : 'var(--text-secondary)' }}>
              {label} ({count})
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          <FileText size={40} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
          <p>Henüz teklif talebi yok</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(q => {
            const st = STATUS_LABELS[q.status] || STATUS_LABELS.NEW
            const isOpen = expanded === q.id
            let products: { name: string; qty: number }[] = []
            try { products = q.productsJson ? JSON.parse(q.productsJson) : [] } catch {}

            return (
              <div key={q.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                {/* Başlık satırı */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, cursor: 'pointer' }}
                  onClick={() => setExpanded(isOpen ? null : q.id)}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${st.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: st.color, flexShrink: 0 }}>
                    {q.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{q.name}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      {q.phone} {q.city ? `· ${q.city}` : ''} {q.packageName ? `· ${q.packageName}` : ''}
                    </p>
                  </div>
                  <span style={{ background: `${st.color}15`, color: st.color, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 99, flexShrink: 0 }}>
                    {st.label}
                  </span>
                  {q.totalTl ? (
                    <span style={{ fontSize: 15, fontWeight: 900, color: 'var(--text-primary)', flexShrink: 0 }}>
                      ₺{Math.round(q.totalTl).toLocaleString('tr-TR')}
                    </span>
                  ) : null}
                  <ChevronDown size={18} style={{ color: 'var(--text-muted)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                </div>

                {/* Detay */}
                {isOpen && (
                  <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 16 }}>
                      <DetailRow icon={Phone} label="Telefon" value={q.phone} />
                      {q.email && <DetailRow icon={Mail} label="E-posta" value={q.email} />}
                      {q.city && <DetailRow icon={MapPin} label="Şehir" value={q.city} />}
                      <DetailRow icon={Building2} label="Sistem" value={`${q.systemType === 'ip' ? 'IP' : 'Multibus'} (${q.infrastructure === 'cat' ? 'Cat5/6' : 'DT8'})`} />
                      <DetailRow icon={Package} label="Daire / Kapı" value={`${q.apartmentCount || '-'} daire / ${q.doorCount || '-'} kapı`} />
                      <DetailRow icon={FileText} label="Paket" value={q.packageName || '-'} />
                      <DetailRow icon={Package} label="DiafonBox" value={q.withDiafonBox ? 'Evet' : 'Hayır'} />
                      <DetailRow icon={Wrench} label="Kurulum" value={q.wantInstallation ? 'İsteniyor' : 'Hayır'} />
                    </div>

                    {products.length > 0 && (
                      <div style={{ marginTop: 16 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>SEÇİLEN ÜRÜNLER</p>
                        {products.map((p, i) => (
                          <p key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '3px 0' }}>
                            {p.qty}× {p.name}
                          </p>
                        ))}
                      </div>
                    )}

                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
                      <Clock size={12} style={{ display: 'inline', verticalAlign: -1, marginRight: 4 }} />
                      {new Date(q.createdAt).toLocaleString('tr-TR')}
                    </p>

                    {/* Aksiyonlar */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Durum:</span>
                      {Object.entries(STATUS_LABELS).map(([key, { label, color }]) => (
                        <button key={key} onClick={() => updateStatus(q.id, key)}
                          style={{ padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                            border: q.status === key ? `2px solid ${color}` : '1px solid var(--border)',
                            background: q.status === key ? `${color}15` : 'transparent',
                            color: q.status === key ? color : 'var(--text-secondary)' }}>
                          {label}
                        </button>
                      ))}
                      <a href={`tel:${q.phone}`}
                        style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: '#10B981', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                        <Phone size={14} /> Ara
                      </a>
                      <a href={`https://wa.me/9${q.phone.replace(/\D/g, '')}`} target="_blank"
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: '#25D366', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                        WhatsApp
                      </a>
                      <button onClick={() => remove(q.id)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: '#DC2626', cursor: 'pointer' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Icon size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
      <div>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{value}</p>
      </div>
    </div>
  )
}