'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import api from '@/lib/api'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  slug: string
  shortDesc: string
  price: number
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  products?: Product[]
}

const QUICK_QUESTIONS = [
  { label: '📦 DiafonBox nedir?', text: 'DiafonBox nedir, ne işe yarar?' },
  { label: '🔄 Görüntüsüz → Görüntülü', text: 'Görüntüsüz diyafonumu görüntülüye çevirmek istiyorum, ne yapmalıyım?' },
  { label: '🔍 Uyumluluk kontrolü', text: 'Diyafonum DiafonBox ile uyumlu mu bilmiyorum, nasıl kontrol edebilirim?' },
  { label: '💰 Fiyat teklifi al', text: 'Fiyat teklifi almak istiyorum.' },
]

function formatMessage(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\/[a-z\-]+|\bhttps?:\/\/\S+|0\d{3}[\s]?\d{3}[\s]?\d{2}[\s]?\d{2}|[\w.]+@[\w.]+\.[a-z]{2,})/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    if (part.match(/^\/[a-z\-]+$/)) {
      return <Link key={i} href={part} className="underline font-bold" style={{ color: '#F4821F' }}>{part}</Link>
    }
    if (part.match(/^https?:\/\//)) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#F4821F' }}>{part}</a>
    }
    if (part.match(/^0\d{3}/)) {
      const phone = part.replace(/\s/g, '')
      const wa = `https://wa.me/90${phone.slice(1)}`
      return <a key={i} href={wa} target="_blank" rel="noopener noreferrer" className="underline font-bold inline-flex items-center gap-1" style={{ color: '#25D366' }}>📱 {part}</a>
    }
    if (part.match(/^[\w.]+@[\w.]+\.[a-z]{2,}$/)) {
      return <a key={i} href={`mailto:${part}`} className="underline font-bold" style={{ color: '#F4821F' }}>✉️ {part}</a>
    }
    return <span key={i}>{part}</span>
  })
}

function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/urun/${p.slug}`}
      className="block rounded-xl p-2.5 transition-all hover:shadow-md"
      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
      <p className="text-[12px] font-bold leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>
        {p.name}
      </p>
      {p.shortDesc && (
        <p className="text-[10px] mb-1.5 line-clamp-1" style={{ color: 'var(--text-muted)' }}>
          {p.shortDesc}
        </p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-black" style={{ color: '#F4821F' }}>
          ₺{p.price.toLocaleString('tr-TR')}
        </span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#F4821F' }}>
          İncele →
        </span>
      </div>
    </Link>
  )
}

export default function ChatAsistan() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setShowQuick(false)
    const userMsg: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }))
      const res = await api.post('/api/chat', { messages: apiMessages })
      const reply = res.data.reply || 'Bir hata oluştu.'
      const products = res.data.products as Product[] | undefined
      setMessages([...newMessages, { role: 'assistant', content: reply, products }])
    } catch {
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'Şu an yanıt veremiyorum. Lütfen WhatsApp\'tan ulaşın: 0539 734 86 88'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
        style={{ background: '#F4821F' }}
        aria-label="Asistan ile konuş">
        {open
          ? <X size={24} color="white" />
          : <MessageCircle size={24} color="white" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            height: '520px',
          }}>

          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: '#F4821F' }}>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <MessageCircle size={16} color="#F4821F" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white">Smartdiafon Asistan</p>
              <p className="text-[10px] text-orange-100">Çevrimiçi · Hemen yanıt veriyor</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {messages.length === 0 && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: '#F4821F' }}>S</div>
                <div className="rounded-2xl rounded-tl-none px-3 py-2 text-[13px] max-w-[80%]"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  Merhaba! 👋 Ürün arayabilir veya merak ettiğinizi sorabilirsiniz.
                </div>
              </div>
            )}

            {showQuick && messages.length === 0 && (
              <div className="space-y-2 mt-2">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button key={i}
                    onClick={() => sendMessage(q.text)}
                    className="w-full text-left px-3 py-2 rounded-xl text-[12px] font-medium transition-all hover:opacity-80"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}>
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i}>
                <div className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: '#F4821F' }}>S</div>
                  )}
                  <div
                    className={`rounded-2xl px-3 py-2 text-[13px] max-w-[80%] leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-tr-none text-white'
                        : 'rounded-tl-none'
                    }`}
                    style={m.role === 'user'
                      ? { background: '#F4821F' }
                      : { background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                    {m.role === 'assistant' ? formatMessage(m.content) : m.content}
                  </div>
                </div>

                {m.products && m.products.length > 0 && (
                  <div className="mt-2 ml-8 space-y-2">
                    {m.products.map(p => <ProductCard key={p.id} p={p} />)}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: '#F4821F' }}>S</div>
                <div className="rounded-2xl rounded-tl-none px-3 py-2"
                  style={{ background: 'var(--bg-secondary)' }}>
                  <Loader2 size={14} className="animate-spin" style={{ color: '#F4821F' }} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
            style={{ borderTop: '1px solid var(--border)' }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ürün arayın veya soru sorun..."
              className="flex-1 px-3 py-2 text-[13px] rounded-xl outline-none"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }} />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-opacity"
              style={{ background: '#F4821F' }}>
              <Send size={15} color="white" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}