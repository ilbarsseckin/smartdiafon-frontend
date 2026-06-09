'use client'

interface LogoProps {
  className?: string
  mono?: boolean
}

export default function Logo({ className = '', mono = false }: LogoProps) {
  if (mono) {
    return (
      <span className={`inline-flex items-center font-black tracking-tight ${className}`}
        style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: 'inherit' }}
        role="img" aria-label="smartdiafon.com.tr">
        Smartdiafon
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center font-black tracking-tight ${className}`}
      style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: 'inherit' }}
      role="img" aria-label="smartdiafon.com.tr">
      <span style={{ color: '#E35455' }}>Smart</span>
      <span style={{ color: '#1B2A6B' }}>diafon</span>
    </span>
  )
}