'use client'

interface LogoProps {
  className?: string
  /** Tek renk versiyonu (footer / watermark) */
  mono?: boolean
}

/**
 * smartdiafon.com.tr — kurumsal logo
 * - "Smart" lacivert, "diafon" kırmızı, ".com.tr" lacivert
 * - mono: tek renk (currentColor) — footer / koyu zemin için
 *   <Logo className="h-8" />            renkli
 *   <Logo className="h-8" mono />       tek renk (currentColor)
 */
export default function Logo({ className = '', mono = false }: LogoProps) {
  if (mono) {
    return (
      <svg
        viewBox="0 0 500 75.1"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        preserveAspectRatio="xMinYMid meet"
        role="img"
        aria-label="smartdiafon.com.tr"
      >
        <text
          x="5"
          y="56"
          fontFamily="'Arial Black','Arial',sans-serif"
          fontSize="46"
          fontWeight="900"
          letterSpacing="-1.5"
          fill="currentColor"
        >
          Smartdiafon<tspan fontSize="30">.com.tr</tspan>
        </text>
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 500 75.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMinYMid meet"
      role="img"
      aria-label="smartdiafon.com.tr"
    >
      <text
        x="5"
        y="56"
        fontFamily="'Arial Black','Arial',sans-serif"
        fontSize="46"
        fontWeight="900"
        letterSpacing="-1.5"
      >
        <tspan fill="#15233B">Smart</tspan>
        <tspan fill="#E63946">diafon</tspan>
        <tspan fill="#15233B" fontSize="30">
          .com.tr
        </tspan>
      </text>
    </svg>
  )
}