'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import api from '@/lib/api'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_QUESTIONS = [
  { label: '📦 DiafonBox nedir?', text: 'DiafonBox nedir, ne işe yarar?' },
  { label: '🔄 Görüntüsüz → Görüntülü', text: 'Görüntüsüz diyafonumu görüntülüye çevirmek istiyorum, ne yapmalıyım?' },
  { label: '🔍 Uyumluluk kontrolü', text: 'Diyafonum DiafonBox ile uyumlu mu bilmiyorum, nasıl kontrol edebilirim?' },
  { label: '💰 Fiyat teklifi al', text: 'Fiyat teklifi almak istiyorum.' },
]

function formatMessage(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\/[a-z\-]+|\bhttps?:\/\/\S+)/g)
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
    return <span key={i}>{part}</span>
  })
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
      const res = await api.post('/api/chat', { messages: newMessages })
      const reply = res.data.reply || 'Bir hata oluştu.'
      setMessages([...newMessages, { role: 'assistant', content: reply }])
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
      {/* Chat butonu */}
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

      {/* Chat penceresi */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            height: '480px',
          }}>

          {/* Header */}
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

          {/* Mesajlar */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {/* Karşılama */}
            {messages.length === 0 && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: '#F4821F' }}>S</div>
                <div className="rounded-2xl rounded-tl-none px-3 py-2 text-[13px] max-w-[80%]"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  Merhaba! 👋 Size nasıl yardımcı olabilirim?
                </div>
              </div>
            )}

            {/* Hızlı sorular */}
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

            {/* Mesaj listesi */}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
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
            ))}

            {/* Loading */}
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

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
            style={{ borderTop: '1px solid var(--border)' }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Mesajınızı yazın..."
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
