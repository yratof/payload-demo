import { notFound } from 'next/navigation'
import React from 'react'
import { renderBlocks } from '../components/blocks'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './globals.css'

export const revalidate = 0

// Resolve a link (from the link() field) to a URL string
function resolveLink(link: any): string | null {
  if (!link) return null
  if (link.type === 'reference' && link.reference) {
    const ref = link.reference
    if (ref.slug) return `/${ref.slug}`
    if (ref.relationTo) {
      const base =
        ref.relationTo === 'pages' ? '' : ref.relationTo
      return `/${base}/${ref.value ?? ref.id ?? ref.doc?.id}`
    }
    return `/${ref.value ?? ref.id}`
  }
  return link.url || null
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { default: config } = await import('../payload.config')
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })

  // The home page is served at "/"
  const lookupSlug = slug === '' ? 'home' : slug

  const res = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: lookupSlug },
      _status: { exists: true },
    },
    depth: 2,
  })

  const page = res.docs?.[0]
  if (!page) {
    notFound()
  }

  return (
    <div className={styles.site}>
      <Header />
      <main className={styles.main}>
        <PageHero hero={page.hero} />
        <div className={styles.layout}>{await renderBlocks(page.layout)}</div>
      </main>
      <Footer />
    </div>
  )
}

function PageHero({ hero }: { hero: any }) {
  if (!hero || hero.type === 'none') return null

  const headings: React.ReactNode[] = []
  extractLexicalText(hero.richText, headings)

  return (
    <section className={styles.hero}>
      {hero.type === 'titleOnly' ? (
        <div className={styles.heroTitleOnly}>
          {headings.map((h, i) => (
            <h1 key={i} className={styles.heroH1}>
              {h}
            </h1>
          ))}
        </div>
      ) : (
        <div className={styles.heroSplit}>
          <div className={styles.heroText}>
            {headings.map((h, i) => (
              <h1 key={i} className={styles.heroH1}>
                {h}
              </h1>
            ))}
          </div>
          {hero.media && (
            <div className={styles.heroMedia}>
              {typeof hero.media.url === 'string' ? (
                <img src={hero.media.url} alt={hero.media.alt || ''} />
              ) : null}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

// Pull text out of a Lexical rich-text document
function extractLexicalText(richText: any, out: React.ReactNode[]) {
  if (!richText?.root?.children) return
  for (const block of richText.root.children) {
    const parts: string[] = []
    for (const child of block.children || []) {
      if (child.text) parts.push(child.text)
    }
    if (parts.length) {
      out.push(parts.join(''))
    }
  }
}
