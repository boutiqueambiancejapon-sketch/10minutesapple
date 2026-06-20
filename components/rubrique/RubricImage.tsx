import Image from 'next/image'
import type { CSSProperties } from 'react'

interface RubricImageProps {
  src: string
  alt: string
  /** Etiquette mono affichee en overlay (ex. "iphone 17 pro"). */
  tag?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  rounded?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Visuel "Studio Spectre" : wrapper next/image avec etiquette mono optionnelle.
 * La puce de tag reprend `--route-color` de la rubrique courante.
 */
export function RubricImage({
  src,
  alt,
  tag,
  width = 1200,
  height = 800,
  fill = false,
  sizes,
  priority = false,
  rounded = true,
  className,
  style,
}: RubricImageProps) {
  return (
    <figure
      className={className}
      style={{
        position: 'relative',
        margin: 0,
        overflow: 'hidden',
        borderRadius: rounded ? 'var(--radius-lg)' : undefined,
        ...style,
      }}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      )}
      {tag ? (
        <figcaption
          style={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            fontFamily: 'var(--next-font-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.04em',
            color: '#fff',
            background: 'color-mix(in oklab, var(--route-color) 78%, #000 22%)',
            padding: '5px 10px',
            borderRadius: 6,
            backdropFilter: 'blur(4px)',
          }}
        >
          [ {tag} ]
        </figcaption>
      ) : null}
    </figure>
  )
}

export default RubricImage
