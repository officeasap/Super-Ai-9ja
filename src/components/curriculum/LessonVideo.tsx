import { useState } from 'react'

type LessonVideoProps = {
  url: string
  title?: string
  onComplete?: () => void
  onError?: () => void
}

function getEmbed(url: string): { src: string; provider: string } | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id
        ? { src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`, provider: 'YouTube' }
        : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      let id = parsed.searchParams.get('v')
      if (!id) {
        const parts = parsed.pathname.split('/').filter(Boolean)
        if (['embed', 'shorts', 'live'].includes(parts[0] ?? '')) id = parts[1] ?? null
      }
      return id
        ? { src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`, provider: 'YouTube' }
        : null
    }

    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const parts = parsed.pathname.split('/').filter(Boolean)
      const id = host === 'player.vimeo.com'
        ? parts[1]
        : parts.find((part) => /^\d+$/.test(part))
      return id
        ? { src: `https://player.vimeo.com/video/${encodeURIComponent(id)}`, provider: 'Vimeo' }
        : null
    }

    if (host === 'bilibili.com' || host.endsWith('.bilibili.com')) {
      const bvid = parsed.pathname.match(/\/video\/(BV[0-9A-Za-z]+)/)?.[1]
      const aid = parsed.pathname.match(/\/video\/av(\d+)/i)?.[1]
      const id = bvid ? `bvid=${encodeURIComponent(bvid)}` : aid ? `aid=${encodeURIComponent(aid)}` : ''
      return id
        ? { src: `https://player.bilibili.com/player.html?${id}&high_quality=1`, provider: 'Bilibili' }
        : null
    }

    return null
  } catch {
    return null
  }
}

export default function LessonVideo({
  url,
  title = 'Lesson video',
  onComplete,
  onError,
}: LessonVideoProps) {
  const [embedFailed, setEmbedFailed] = useState(false)

  let parsed: URL | null = null
  try {
    parsed = new URL(url)
  } catch {
    parsed = null
  }

  if (!parsed || !['https:', 'http:'].includes(parsed.protocol)) {
    return <p role="alert">This video link is invalid or unsupported.</p>
  }

  const embed = getEmbed(url)
  const isDirectVideo = /\.(mp4|webm|ogg)(?:$|[?#])/i.test(parsed.href)

  if (embed && !embedFailed) {
    return (
      <section className="lesson-video" aria-label={title}>
        <div className="lesson-video-frame">
          <iframe
            src={embed.src}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onError={() => {
              setEmbedFailed(true)
              onError?.()
            }}
          />
        </div>
        <p className="lesson-video-caption">Video hosted by {embed.provider}.</p>
      </section>
    )
  }

  if (isDirectVideo) {
    return (
      <section className="lesson-video" aria-label={title}>
        <video
          controls
          playsInline
          preload="metadata"
          onEnded={onComplete}
          onError={() => onError?.()}
        >
          <source src={parsed.href} />
          Your browser cannot play this video.
        </video>
      </section>
    )
  }

  return (
    <section className="lesson-video" aria-label={title}>
      {embedFailed && (
        <p role="status">The embedded player could not be loaded. Try opening the video directly.</p>
      )}
      <a href={parsed.href} target="_blank" rel="noopener noreferrer">
        Open lesson video in a new tab
      </a>
    </section>
  )
}
