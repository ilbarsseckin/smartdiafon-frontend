'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useCartStore } from '@/lib/store/cart'
import api, { addressApi } from '@/lib/api'
import toast from 'react-hot-toast'
import Link from 'next/link'
import {
  MapPin, Phone, Mail, User, Building2, Receipt, FileText,
  Check, ChevronRight, Loader2, Wrench, Star, ChevronDown, ArrowLeft,
  ShieldCheck, Package, CreditCard
} from 'lucide-react'

const ILLER = [
  'Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin',
  'Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale',
  'Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan','Erzurum',
  'Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkari','Hatay','Isparta','Mersin',
  'İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli',
  'Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş',
  'Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas',
  'Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak',
  'Aksaray','Bayburt','Karaman','Kırıkkale','Batman','Şırnak','Bartın','Ardahan',
  'Iğdır','Yalova','Karabük','Kilis','Osmaniye','Düzce'
]

const EMPTY_FORM = {
  customerName: '', customerPhone: '', customerEmail: '',
  customerAddress: '', city: '', district: '', notes: '',
}
const EMPTY_BILLING = {
  companyName: '', taxNumber: '', taxOffice: '',
  billingAddress: '', billingCity: '', billingDistrict: '',
}

interface Address {
  id: string; title: string; fullName: string
  addressLine: string; district: string; city: string; isDefault: boolean
}
interface AuthUser {
  id: string; email: string; name: string; phone?: string; role: string
}
interface Installer {
  id: string; name: string; city: string; rating: number; jobCount: number; expertise?: string
}

function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('baski-auth')
    if (!raw) return null
    const { state } = JSON.parse(raw)
    return state?.user || null
  } catch { return null }
}

export default function SiparisOlusturPage() {
  const router = useRouter()
  const { catalogItems, clearCatalog } = useCartStore()
  const catalogTotalTl = catalogItems.reduce((s, i) => s + i.priceTl * (i.qty || 1), 0)

  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const isLoggedIn = !!authUser

  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedSavedAddrId, setSelectedSavedAddrId] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [saveAddressToProfile, setSaveAddressToProfile] = useState(true)
  const [newAddressTitle, setNewAddressTitle] = useState('')

  const [orderForm, setOrderForm] = useState(EMPTY_FORM)
  const [orderSubmitting, setOrderSubmitting] = useState(false)

  const [sameBillingAddress, setSameBillingAddress] = useState(true)
  const [corporateInvoice, setCorporateInvoice] = useState(false)
  const [billingForm, setBillingForm] = useState(EMPTY_BILLING)

  const [termsAccepted, setTermsAccepted] = useState(false)
  const [mesafeliAccepted, setMesafeliAccepted] = useState(false)

  // Kurulum
  const [kurulumIstiyorum, setKurulumIstiyorum] = useState(false)
  const [kurulumSehir, setKurulumSehir] = useState('')
  const [installers, setInstallers] = useState<Installer[]>([])
  const [selectedInstallerId, setSelectedInstallerId] = useState('')
  const [installerLoading, setInstallerLoading] = useState(false)

  useEffect(() => {
    setAuthUser(getAuthUser())
  }, [])

  useEffect(() => {
    if (!isLoggedIn) return
    addressApi.list().then(r => {
      const addrs = r.data.data || []
      setAddresses(addrs)
      const def = addrs.find((a: Address) => a.isDefault) || addrs[0]
      if (def) applySavedAddress(def)
    }).catch(() => {})
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn && authUser) {
      setOrderForm(f => ({
        ...f,
        customerName: f.customerName || authUser.name || '',
        customerEmail: authUser.email,
        customerPhone: f.customerPhone || authUser.phone || '',
      }))
    }
  }, [isLoggedIn, authUser])

  // Kurulum şehri değişince kurulumcuları getir
  useEffect(() => {
    if (!kurulumSehir || !kurulumIstiyorum) return
    setInstallerLoading(true)
    setInstallers([])
    setSelectedInstallerId('')
    api.get(`/api/catalog/installers/by-city?city=${encodeURIComponent(kurulumSehir)}`)
      .then(r => setInstallers(r.data.data || []))
      .catch(() => setInstallers([]))
      .finally(() => setInstallerLoading(false))
  }, [kurulumSehir, kurulumIstiyorum])

  const applySavedAddress = (addr: Address) => {
    setSelectedSavedAddrId(addr.id)
    setEditMode(false)
    setOrderForm(f => ({
      ...f,
      customerName: addr.fullName || authUser?.name || f.customerName,
      customerAddress: addr.addressLine,
      city: addr.city,
      district: addr.district,
    }))
    if (!kurulumSehir) setKurulumSehir(addr.city)
  }

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())

  const handleSubmit = async () => {
    if (!orderForm.customerName.trim()) { toast.error('Ad soyad zorunlu'); return }
    if (!orderForm.customerPhone.trim()) { toast.error('Telefon zorunlu'); return }
    if (!orderForm.customerAddress.trim()) { toast.error('Adres zorunlu'); return }
    if (!isLoggedIn) {
      if (!orderForm.customerEmail.trim()) { toast.error('Email zorunlu'); return }
      if (!isValidEmail(orderForm.customerEmail)) { toast.error('Geçerli email girin'); return }
    }
    if (!sameBillingAddress && !billingForm.billingAddress.trim()) {
      toast.error('Fatura adresi zorunlu'); return
    }
    if (corporateInvoice) {
      if (!billingForm.companyName.trim()) { toast.error('Firma adı zorunlu'); return }
      if (!billingForm.taxNumber.trim()) { toast.error('Vergi numarası zorunlu'); return }
      if (!billingForm.taxOffice.trim()) { toast.error('Vergi dairesi zorunlu'); return }
    }
    if (!termsAccepted || !mesafeliAccepted) {
      toast.error('Lütfen tüm sözleşme ve koşulları kabul edin'); return
    }
    if (catalogItems.length === 0) { toast.error('Sepet boş'); return }

    const installer = installers.find(i => i.id === selectedInstallerId)
    const installerNote = installer
      ? `\n[KURULUM] Seçilen kurulumcu: ${installer.name} (${installer.city}) - ID: ${installer.id}`
      : kurulumIstiyorum
        ? `\n[KURULUM] Kurulum talep edildi - Şehir: ${kurulumSehir || 'Belirtilmedi'}`
        : ''
    const finalNotes = (orderForm.notes || '') + installerNote

    setOrderSubmitting(true)
    try {
      const orderItems = catalogItems.map(it => ({
        productId: it.productId, tierId: it.tierId,
        priceTl: it.priceTl, priceUsd: it.priceUsd, kurAtAdd: it.kurAtAdd,
        attributes: it.attributes.map(a => ({ attributeId: a.attributeId, optionId: a.optionId })),
        designFileIds: it.designFileIds || [],
        designSupport: it.designSupport,
      }))

      const res = await api.post('/api/catalog/orders', {
        ...orderForm,
        notes: finalNotes,
        items: orderItems,
        sameBillingAddress,
        corporateInvoice,
        ...(corporateInvoice ? {
          invoiceCompanyName: billingForm.companyName,
          invoiceTaxNumber: billingForm.taxNumber,
          invoiceTaxOffice: billingForm.taxOffice,
        } : {}),
        ...(!sameBillingAddress ? {
          billingAddress: billingForm.billingAddress,
          billingCity: billingForm.billingCity,
          billingDistrict: billingForm.billingDistrict,
        } : {}),
      })
      const data = res.data.data

      if (isLoggedIn && editMode && saveAddressToProfile && orderForm.customerAddress.trim()) {
        try {
          await addressApi.add({
            title: newAddressTitle.trim() || `Adres ${addresses.length + 1}`,
            fullName: orderForm.customerName, phone: orderForm.customerPhone,
            addressLine: orderForm.customerAddress,
            city: orderForm.city || '', district: orderForm.district || '',
            isDefault: addresses.length === 0,
          })
        } catch (e) { console.warn('Adres kaydedilemedi:', e) }
      }

      if (data.guestAccountCreated) {
        toast.success(`Hesabınız oluşturuldu! ${orderForm.customerEmail} adresine giriş bilgileri gönderildi`, { duration: 5000 })
      } else {
        toast.success(`Siparişiniz alındı: ${data.orderNumber}`)
      }

      clearCatalog()
      router.push(`/odeme-katalog?siparisNo=${data.orderNumber}`)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Sipariş oluşturulamadı')
    } finally {
      setOrderSubmitting(false)
    }
  }

  if (catalogItems.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
          <div className="text-center">
            <Package size={48} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--text-muted)' }} />
            <p className="text-[16px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Sepetiniz boş</p>
            <Link href="/katalog" className="px-6 py-3 rounded-xl text-[14px] font-bold text-white"
              style={{ background: '#F4821F' }}>Ürünlere Göz At</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const hasSavedAddresses = isLoggedIn && addresses.length > 0
  const showFullAddressForm = !hasSavedAddresses || editMode

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto px-4">

          {/* Başlık */}
          <div className="flex items-center gap-3 mb-6">
            <Link href="/sepet" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <ArrowLeft size={16} style={{ color: 'var(--text-secondary)' }} />
            </Link>
            <div>
              <h1 className="text-[22px] font-black" style={{ color: 'var(--text-primary)' }}>Sipariş Bilgileri</h1>
              <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{catalogItems.length} ürün · ₺{catalogTotalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} KDV dahil</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Sol — form */}
            <div className="lg:col-span-2 space-y-4">

              {/* Giriş banner */}
              {isLoggedIn ? (
                <div className="rounded-2xl p-4 flex items-center gap-3"
                  style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-black"
                    style={{ background: '#F4821F' }}>
                    {authUser?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>{authUser?.name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{authUser?.email}</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl p-4" style={{ background: 'rgba(244,130,31,0.05)', border: '1px solid rgba(244,130,31,0.2)' }}>
                  <p className="text-[13px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Hesabınız var mı?</p>
                  <p className="text-[12px] mb-3" style={{ color: 'var(--text-muted)' }}>Giriş yaparak adreslerinizi kullanın, siparişlerinizi takip edin.</p>
                  <Link href="/giris" className="text-[12px] font-bold px-4 py-2 rounded-lg"
                    style={{ background: '#F4821F', color: 'white' }}>Giriş Yap</Link>
                </div>
              )}

              {/* Teslimat adresi */}
              <Section title="Teslimat Adresi" icon={MapPin}>
                {hasSavedAddresses && !editMode && (
                  <div className="space-y-2 mb-3">
                    {addresses.map(addr => (
                      <label key={addr.id} onClick={() => applySavedAddress(addr)}
                        className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all"
                        style={{
                          background: selectedSavedAddrId === addr.id ? 'rgba(244,130,31,0.06)' : 'var(--bg-secondary)',
                          border: selectedSavedAddrId === addr.id ? '1.5px solid #F4821F' : '1px solid var(--border)',
                        }}>
                        <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                          style={{
                            background: selectedSavedAddrId === addr.id ? '#F4821F' : 'transparent',
                            border: selectedSavedAddrId === addr.id ? '2px solid #F4821F' : '2px solid var(--border)',
                          }}>
                          {selectedSavedAddrId === addr.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>{addr.title}</p>
                            {addr.isDefault && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-bold"
                                style={{ background: 'rgba(244,130,31,0.1)', color: '#F4821F' }}>Varsayılan</span>
                            )}
                          </div>
                          <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                            {addr.addressLine}, {addr.district}/{addr.city}
                          </p>
                        </div>
                      </label>
                    ))}
                    <button onClick={() => { setEditMode(true); setSelectedSavedAddrId('') }}
                      className="w-full py-2.5 text-[13px] font-medium rounded-xl transition-all"
                      style={{ border: '1.5px dashed var(--border)', color: 'var(--text-muted)' }}>
                      + Yeni adres ekle
                    </button>
                  </div>
                )}

                {showFullAddressForm && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field icon={User} label="Ad Soyad *" value={orderForm.customerName}
                        onChange={v => setOrderForm(f => ({ ...f, customerName: v }))} placeholder="Adınız Soyadınız" />
                      <Field icon={Phone} label="Telefon *" value={orderForm.customerPhone}
                        onChange={v => setOrderForm(f => ({ ...f, customerPhone: v }))} placeholder="05xx xxx xx xx" type="tel" />
                      {!isLoggedIn && (
                        <Field icon={Mail} label="E-posta *" value={orderForm.customerEmail}
                          onChange={v => setOrderForm(f => ({ ...f, customerEmail: v }))} placeholder="ornek@mail.com" type="email" />
                      )}
                    </div>
                    <div>
                      <label className="text-[12px] font-bold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                        Şehir / İlçe
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <select value={orderForm.city}
                            onChange={e => {
                              setOrderForm(f => ({ ...f, city: e.target.value }))
                              if (!kurulumSehir) setKurulumSehir(e.target.value)
                            }}
                            className="w-full px-3 py-3 rounded-xl text-[14px] appearance-none"
                            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                            <option value="">Şehir seçin</option>
                            {ILLER.map(il => <option key={il} value={il}>{il}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                        </div>
                        <input value={orderForm.district}
                          onChange={e => setOrderForm(f => ({ ...f, district: e.target.value }))}
                          placeholder="İlçe" className="px-3 py-3 rounded-xl text-[14px]"
                          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[12px] font-bold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Adres *</label>
                      <textarea value={orderForm.customerAddress} rows={3}
                        onChange={e => setOrderForm(f => ({ ...f, customerAddress: e.target.value }))}
                        placeholder="Mahalle, sokak, bina no, daire no..."
                        className="w-full px-3 py-3 rounded-xl text-[14px] resize-none"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                    </div>
                    {isLoggedIn && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div onClick={() => setSaveAddressToProfile(o => !o)}
                          className="w-4 h-4 rounded flex items-center justify-center"
                          style={{ background: saveAddressToProfile ? '#F4821F' : 'var(--bg-secondary)', border: saveAddressToProfile ? '2px solid #F4821F' : '2px solid var(--border)' }}>
                          {saveAddressToProfile && <Check size={10} className="text-white" />}
                        </div>
                        <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>Bu adresi profilime kaydet</p>
                      </label>
                    )}
                  </div>
                )}

                {/* Telefon (kayıtlı adres seçiliyken) */}
                {hasSavedAddresses && !editMode && (
                  <div className="mt-3">
                    <Field icon={Phone} label="Telefon *" value={orderForm.customerPhone}
                      onChange={v => setOrderForm(f => ({ ...f, customerPhone: v }))} placeholder="05xx xxx xx xx" type="tel" />
                  </div>
                )}
              </Section>

              {/* Kurulum hizmeti */}
              <Section title="Kurulum Hizmeti" icon={Wrench}>
                <label className="flex items-start gap-3 cursor-pointer" onClick={() => {
                  const next = !kurulumIstiyorum
                  setKurulumIstiyorum(next)
                  if (!next) { setSelectedInstallerId(''); setInstallers([]) }
                  if (next && !kurulumSehir && orderForm.city) setKurulumSehir(orderForm.city)
                }}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                    style={{
                      background: kurulumIstiyorum ? '#F4821F' : 'var(--bg-secondary)',
                      border: kurulumIstiyorum ? '2px solid #F4821F' : '2px solid var(--border)',
                    }}>
                    {kurulumIstiyorum && <Check size={11} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>Kurulum hizmeti istiyorum</p>
                    <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Kurulum ücreti ürün fiyatına <strong>dahil değildir</strong>. Bina tipi ve altyapı modeline göre değişiklik gösterir.
                    </p>
                  </div>
                </label>

                {kurulumIstiyorum && (
                  <div className="mt-4 space-y-4">
                    {/* Şehir seçimi */}
                    <div>
                      <label className="text-[12px] font-bold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                        Kurulum yapılacak şehir
                      </label>
                      <div className="relative">
                        <select value={kurulumSehir} onChange={e => setKurulumSehir(e.target.value)}
                          className="w-full px-3 py-3 rounded-xl text-[14px] appearance-none"
                          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                          <option value="">Şehir seçin</option>
                          {ILLER.map(il => <option key={il} value={il}>{il}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </div>

                    {/* Kurulumcu listesi */}
                    {kurulumSehir && (
                      installerLoading ? (
                        <div className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                          <Loader2 size={15} className="animate-spin" /> Kurulumcular yükleniyor...
                        </div>
                      ) : installers.length === 0 ? (
                        <div className="rounded-xl p-4" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)' }}>
                          <p className="text-[13px] font-bold mb-1" style={{ color: '#92400E' }}>⚠️ {kurulumSehir} için kayıtlı kurulumcu yok</p>
                          <p className="text-[12px]" style={{ color: '#A16207' }}>Siparişiniz alınacak, kurulum ekibimiz sizinle iletişime geçecektir.</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-[12px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                            {kurulumSehir} bölgesindeki kurulumcular ({installers.length} kişi):
                          </p>
                          {installers.map(inst => (
                            <label key={inst.id} onClick={() => setSelectedInstallerId(inst.id === selectedInstallerId ? '' : inst.id)}
                              className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
                              style={{
                                background: selectedInstallerId === inst.id ? 'rgba(244,130,31,0.06)' : 'var(--bg-secondary)',
                                border: selectedInstallerId === inst.id ? '1.5px solid #F4821F' : '1px solid var(--border)',
                              }}>
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-[15px] flex-shrink-0"
                                style={{ background: selectedInstallerId === inst.id ? '#F4821F' : '#9CA3AF' }}>
                                {inst.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <p className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>{inst.name}</p>
                                <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                                  {Number(inst.rating) > 0 && (
                                    <span className="flex items-center gap-1 text-[12px] font-bold text-amber-500">
                                      <Star size={11} className="fill-amber-500" />
                                      {Number(inst.rating).toFixed(1)}
                                    </span>
                                  )}
                                  {inst.jobCount > 0 && (
                                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{inst.jobCount} iş</span>
                                  )}
                                  {inst.expertise && (
                                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                      {inst.expertise.split(',').slice(0, 2).join(', ')}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {selectedInstallerId === inst.id && (
                                <Check size={16} style={{ color: '#F4821F' }} />
                              )}
                            </label>
                          ))}
                          {!selectedInstallerId && (
                            <p className="text-[11px] px-1" style={{ color: 'var(--text-muted)' }}>
                              İsteğe bağlı — seçmeden devam edebilirsiniz.
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </Section>

              {/* Not */}
              <Section title="Sipariş Notu" icon={FileText}>
                <textarea value={orderForm.notes} rows={3}
                  onChange={e => setOrderForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Kurulum için özel notlarınız, bina bilgisi, kat vb..."
                  className="w-full px-3 py-3 rounded-xl text-[14px] resize-none"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
              </Section>

              {/* Fatura */}
              <Section title="Fatura Bilgileri" icon={Receipt}>
                <label className="flex items-center gap-3 cursor-pointer mb-3"
                  onClick={() => setSameBillingAddress(o => !o)}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center"
                    style={{ background: sameBillingAddress ? '#F4821F' : 'var(--bg-secondary)', border: sameBillingAddress ? '2px solid #F4821F' : '2px solid var(--border)' }}>
                    {sameBillingAddress && <Check size={11} className="text-white" />}
                  </div>
                  <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Teslimat adresi fatura adresi olarak kullanılsın</p>
                </label>

                {!sameBillingAddress && (
                  <div className="space-y-3 mb-3">
                    <input value={billingForm.billingAddress}
                      onChange={e => setBillingForm(f => ({ ...f, billingAddress: e.target.value }))}
                      placeholder="Fatura adresi" className="w-full px-3 py-3 rounded-xl text-[14px]"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <select value={billingForm.billingCity}
                          onChange={e => setBillingForm(f => ({ ...f, billingCity: e.target.value }))}
                          className="w-full px-3 py-3 rounded-xl text-[14px] appearance-none"
                          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                          <option value="">Şehir</option>
                          {ILLER.map(il => <option key={il} value={il}>{il}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <input value={billingForm.billingDistrict}
                        onChange={e => setBillingForm(f => ({ ...f, billingDistrict: e.target.value }))}
                        placeholder="İlçe" className="px-3 py-3 rounded-xl text-[14px]"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                )}

                <label className="flex items-center gap-3 cursor-pointer" onClick={() => setCorporateInvoice(o => !o)}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center"
                    style={{ background: corporateInvoice ? '#F4821F' : 'var(--bg-secondary)', border: corporateInvoice ? '2px solid #F4821F' : '2px solid var(--border)' }}>
                    {corporateInvoice && <Check size={11} className="text-white" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={14} style={{ color: 'var(--text-muted)' }} />
                    <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Kurumsal fatura istiyorum (e-fatura)</p>
                  </div>
                </label>

                {corporateInvoice && (
                  <div className="mt-3 space-y-3">
                    <input value={billingForm.companyName}
                      onChange={e => setBillingForm(f => ({ ...f, companyName: e.target.value }))}
                      placeholder="Firma adı *" className="w-full px-3 py-3 rounded-xl text-[14px]"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                    <div className="grid grid-cols-2 gap-3">
                      <input value={billingForm.taxNumber}
                        onChange={e => setBillingForm(f => ({ ...f, taxNumber: e.target.value }))}
                        placeholder="Vergi numarası *" className="w-full px-3 py-3 rounded-xl text-[14px]"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                      <input value={billingForm.taxOffice}
                        onChange={e => setBillingForm(f => ({ ...f, taxOffice: e.target.value }))}
                        placeholder="Vergi dairesi *" className="w-full px-3 py-3 rounded-xl text-[14px]"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                )}
              </Section>

              {/* Sözleşmeler */}
              <Section title="Onaylar" icon={ShieldCheck}>
                <div className="space-y-3">
                  <TermsCheck
                    accepted={termsAccepted}
                    onToggle={() => setTermsAccepted(o => !o)}
                    href="/iade-kosullari"
                    linkText="İptal ve iade koşullarını"
                    rest="okudum, kabul ediyorum. Kişiye özel üretilen ürünlerde cayma hakkımın bulunmadığını onaylıyorum."
                  />
                  <TermsCheck
                    accepted={mesafeliAccepted}
                    onToggle={() => setMesafeliAccepted(o => !o)}
                    href="/mesafeli-satis"
                    linkText="Mesafeli Satış Sözleşmesi'ni"
                    rest="okudum, anladım ve kabul ediyorum."
                  />
                  {(!termsAccepted || !mesafeliAccepted) && (
                    <p className="text-[11px] px-1" style={{ color: '#F59E0B' }}>
                      ⚠️ Devam etmek için her iki onayı da vermeniz gerekiyor
                    </p>
                  )}
                </div>
              </Section>

            </div>

            {/* Sağ — özet */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <p className="text-[13px] font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>Sipariş Özeti</p>
                  <div className="space-y-3 mb-4">
                    {catalogItems.map(item => (
                      <div key={item.id} className="flex gap-3">
                        {item.mainImageUrl && (
                          <img src={item.mainImageUrl} alt={item.productName}
                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                            style={{ border: '1px solid var(--border)' }} />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold truncate" style={{ color: 'var(--text-primary)' }}>{item.productName}</p>
                          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{item.tierQty} adet</p>
                          <p className="text-[13px] font-black" style={{ color: '#F4821F' }}>
                            ₺{item.priceTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 space-y-1" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex justify-between text-[12px]" style={{ color: 'var(--text-muted)' }}>
                      <span>Ara toplam</span>
                      <span>₺{catalogTotalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                    </div>
                    {kurulumIstiyorum && (
                      <div className="flex justify-between text-[12px]" style={{ color: '#F59E0B' }}>
                        <span>Kurulum ücreti</span>
                        <span>Ayrıca hesaplanır</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[15px] font-black pt-1" style={{ color: 'var(--text-primary)' }}>
                      <span>Toplam</span>
                      <span style={{ color: '#F4821F' }}>₺{catalogTotalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>KDV dahil</p>
                  </div>
                </div>

                <button onClick={handleSubmit}
                  disabled={orderSubmitting || !termsAccepted || !mesafeliAccepted}
                  className="w-full flex items-center justify-center gap-2 py-4 text-[15px] font-black text-white rounded-2xl transition-all disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #F4821F, #e07010)', boxShadow: '0 6px 20px rgba(244,130,31,0.35)' }}>
                  {orderSubmitting
                    ? <><Loader2 size={16} className="animate-spin" /> İşleniyor...</>
                    : <><CreditCard size={16} /> Siparişi Onayla & Öde</>}
                </button>

                <p className="text-[11px] text-center" style={{ color: 'var(--text-muted)' }}>
                  🔒 256-bit SSL ile güvenli ödeme
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div className="flex items-center gap-2 mb-4" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Icon size={16} style={{ color: '#F4821F' }} />
        <h2 className="text-[14px] font-black" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = 'text' }: {
  icon: any; label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string
}) {
  return (
    <div>
      <label className="text-[12px] font-bold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{label}</label>
      <div className="relative">
        <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full pl-9 pr-3 py-3 rounded-xl text-[14px]"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
      </div>
    </div>
  )
}

function TermsCheck({ accepted, onToggle, href, linkText, rest }: {
  accepted: boolean; onToggle: () => void; href: string; linkText: string; rest: string
}) {
  return (
    <div className="rounded-xl p-3"
      style={{ background: 'rgba(244,130,31,0.04)', border: `1px solid ${accepted ? 'rgba(244,130,31,0.35)' : 'rgba(244,130,31,0.12)'}` }}>
      <label className="flex items-start gap-2.5 cursor-pointer">
        <div onClick={onToggle}
          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
          style={{ background: accepted ? '#F4821F' : 'var(--bg-secondary)', border: accepted ? '2px solid #F4821F' : '2px solid var(--border)' }}>
          {accepted && <Check size={11} className="text-white" />}
        </div>
        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <a href={href} target="_blank" className="font-bold underline hover:text-[#F4821F]"
            style={{ color: 'var(--text-primary)' }}>{linkText}</a>
          {' '}{rest}
        </p>
      </label>
    </div>
  )
}