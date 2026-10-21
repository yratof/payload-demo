import React from 'react'

// ---------- Lexical rich-text renderer ----------
function LexicalText({ node, as = 'p' }: { node: any; as?: string }) {
  const parts: React.ReactNode[] = []
  for (const child of node.children || []) {
    if (child.type === 'link' && child.children) {
      for (const sub of child.children) {
        if (sub.text) {
          parts.push(
            <a key={parts.length} href={child.link ?? '#'} style={{ color: '#6b1f3a' }}>
              {sub.text}
            </a>
          )
        }
      }
    } else if (child.text) {
      parts.push(child.text)
    }
  }
  const Tag = (as as any) || 'p'
  return <Tag>{parts}</Tag>
}

function renderRichText(richText: any, styles: Record<string, string>) {
  if (!richText?.root?.children) return null
  return (
    <div>
      {richText.root.children.map((block: any, i: number) => {
        if (block.type === 'heading') {
          const level = (block.tag || 'h1').replace('h', '')
          const cls = styles[`h${level}`] || styles.h2
          return <div key={i} className={cls}><LexicalText node={block} /></div>
        }
        return <LexicalText key={i} node={block} as={block.type === 'list-item' ? 'li' : 'p'} />
      })}
    </div>
  )
}

// ---------- appearance helpers ----------
const appearances: Record<string, { bg: string; color: string }> = {
  default: { bg: '#fff', color: '#1a1a1a' },
  burgundy: { bg: '#6b1f3a', color: '#fff' },
  light: { bg: '#f5f5f5', color: '#1a1a1a' },
  dark: { bg: '#1a1a1a', color: '#fff' },
}

function sectionStyle(appearance?: string) {
  const a = appearances[appearance || 'default']
  return {
    background: a.bg,
    color: a.color,
    padding: '40px 32px',
    borderRadius: 12,
  }
}

// ---------- shared payload ----------
function usePayload() {
  return (async () => {
    const { default: config } = await import('../payload.config')
    const { getPayload } = await import('payload')
    return getPayload({ config })
  })()
}

// ---------- individual block components ----------
function HeroBlock({ block }: { block: any }) {
  const s = sectionStyle(block.appearance)
  return (
    <section style={{ ...s, textAlign: block.align || 'center' }}>
      {block.eyebrow && <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: 8 }}>{block.eyebrow}</div>}
      {renderRichText(block.heading, {})}
      {block.links?.length > 0 && (
        <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: block.align === 'center' ? 'center' : 'flex-start' }}>
          {block.links.map((l: any, i: number) => (
            <a key={i} href={l.url || '#'} style={{
              display: 'inline-block', padding: '8px 18px', borderRadius: 6,
              border: '1px solid currentColor', textDecoration: 'none', color: 'inherit',
            }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

function ContentBlock({ block }: { block: any }) {
  const s = sectionStyle(block.appearance)
  return (
    <section style={s}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {block.columns?.map((col: any, i: number) => (
          <div key={i} style={{ gridColumn: col.size === 'full' ? 'span 3' : col.size === '2/3' ? 'span 2' : 'span 1' }}>
            {renderRichText(col.richText, {})}
          </div>
        ))}
      </div>
    </section>
  )
}

function MediaBlock({ block }: { block: any }) {
  return (
    <section style={{ textAlign: 'center' }}>
      {block.media?.url && (
        <img src={block.media.url} alt={block.media.alt || ''} style={{ maxWidth: '100%', borderRadius: 8 }} />
      )}
      {block.caption && <div style={{ marginTop: 8, color: '#666', fontSize: '0.9rem' }}>{block.caption}</div>}
    </section>
  )
}

function CtaBlock({ block }: { block: any }) {
  const s = sectionStyle(block.appearance)
  return (
    <section style={{ ...s, textAlign: 'center' }}>
      {renderRichText(block.richText, {})}
      {block.links?.length > 0 && (
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
          {block.links.map((l: any, i: number) => (
            <a key={i} href={l.url || '#'} style={{
              display: 'inline-block', padding: '10px 22px', borderRadius: 6,
              background: 'rgba(255,255,255,0.15)', border: '1px solid currentColor',
              textDecoration: 'none', color: 'inherit',
            }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

function ArchiveBlock({ block, payload }: { block: any; payload: any }) {
  return (
    <ArchiveInner payload={payload} block={block} />
  )
}

async function ArchiveInner({ payload, block }: { payload: any; block: any }) {
  const source = block.source || 'posts'
  const limit = block.limit || 6
  const res: any = await payload.find({
    collection: source,
    limit,
    depth: 1,
    where: { _status: { exists: true } },
    sort: '-publishedAt',
  })
  const items = res.docs || []
  return (
    <section style={sectionStyle(block.appearance)}>
      {block.heading && <h2 style={{ marginTop: 0 }}>{block.heading}</h2>}
      {block.intro && <p style={{ opacity: 0.8 }}>{block.intro}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
        {items.map((doc: any) => (
          <article key={doc.id} style={{
            border: '1px solid rgba(127,127,127,0.3)',
            borderRadius: 8,
            padding: 16,
          }}>
            <h3 style={{ marginTop: 0, fontSize: '1.05rem' }}>{doc.title}</h3>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
              {doc.publishedAt && new Date(doc.publishedAt).toLocaleDateString()}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function BoardGrid({ block }: { block: any }) {
  return (
    <section style={sectionStyle(block.appearance)}>
      {block.heading && <h2 style={{ marginTop: 0 }}>{block.heading}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
        {block.members?.map((m: any, i: number) => (
          <div key={i} style={{ textAlign: 'center' }}>
            {m.photo?.url ? (
              <img src={m.photo.url} alt={m.name} style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px' }} />
            ) : (
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(127,127,127,0.2)', margin: '0 auto 12px' }} />
            )}
            <div style={{ fontWeight: 600 }}>{m.name}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{m.role}</div>
            {m.bio && <div style={{ fontSize: '0.85rem', marginTop: 8, opacity: 0.7 }}>{m.bio}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

function EventSpotlight({ block, payload }: { block: any; payload: any }) {
  return <EventSpotlightInner payload={payload} block={block} />
}

async function EventSpotlightInner({ payload, block }: { payload: any; block: any }) {
  let event: any = null
  if (block.source === 'manual' && block.selectedEvent) {
    event = block.selectedEvent
  } else {
    const res: any = await payload.find({
      collection: 'events',
      limit: 1,
      where: {
        _status: { exists: true },
        startDate: { greater_than: new Date().toISOString() },
      },
      sort: 'startDate',
    })
    event = res.docs?.[0]
  }
  if (!event) {
    return <section style={sectionStyle(block.appearance)}><p>No upcoming events.</p></section>
  }
  return (
    <section style={{ ...sectionStyle(block.appearance), border: '2px solid rgba(127,127,127,0.3)' }}>
      {event.eyebrow && <div style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase' }}>{event.eyebrow}</div>}
      <h2 style={{ marginTop: 8 }}>{event.title}</h2>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: '0.9rem', opacity: 0.9, marginTop: 12 }}>
        <span>📅 {event.startDate && new Date(event.startDate).toLocaleDateString('no-NO', { dateStyle: 'long' })}</span>
        {event.location && <span>📍 {event.location}</span>}
      </div>
      {event.description && <div style={{ marginTop: 16 }}>{renderRichText(event.description, {})}</div>}
    </section>
  )
}

function PastEvents({ block, payload }: { block: any; payload: any }) {
  return <PastEventsInner payload={payload} block={block} />
}

async function PastEventsInner({ payload, block }: { payload: any; block: any }) {
  const limit = block.limit || 4
  const where: any = {
    _status: { exists: true },
    startDate: { less_than: new Date().toISOString() },
  }
  if (block.source === 'filterType' && block.filterType) {
    where.eventType = { equals: block.filterType }
  }
  const res: any = await payload.find({
    collection: 'events',
    limit,
    where,
    sort: '-startDate',
  })
  const items = res.docs || []
  return (
    <section style={sectionStyle(block.appearance)}>
      {block.heading && <h2 style={{ marginTop: 0 }}>{block.heading}</h2>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((e: any) => (
          <div key={e.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(127,127,127,0.2)' }}>
            <div style={{ fontSize: '0.85rem', opacity: 0.7, minWidth: 120 }}>
              {e.startDate && new Date(e.startDate).toLocaleDateString('no-NO')}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{e.title}</div>
              {e.location && <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{e.location}</div>}
            </div>
          </div>
        ))}
        {items.length === 0 && <p>No past events yet.</p>}
      </div>
    </section>
  )
}

function PartnerList({ block }: { block: any }) {
  return (
    <section style={sectionStyle(block.appearance)}>
      {block.heading && <h2 style={{ marginTop: 0 }}>{block.heading}</h2>}
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center', marginTop: 16 }}>
        {block.partners?.map((p: any, i: number) => (
          <a key={i} href={p.url || '#'} style={{ color: 'inherit', textDecoration: 'none', opacity: 0.85, display: 'flex', alignItems: 'center', gap: 8 }}>
            {p.logo?.url && <img src={p.logo.url} alt={p.name} style={{ height: 32 }} />}
            <span style={{ fontWeight: 500 }}>{p.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Program({ block }: { block: any }) {
  return (
    <section style={sectionStyle(block.appearance)}>
      {block.heading && <h2 style={{ marginTop: 0 }}>{block.heading}</h2>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        {block.sessions?.map((s: any, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(127,127,127,0.2)' }}>
            <div style={{ fontSize: '0.85rem', opacity: 0.7, minWidth: 80 }}>{s.time}</div>
            <div>
              <div style={{ fontWeight: 600 }}>{s.title}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                {s.speaker && <span>{s.speaker}</span>}
                {s.room && <span> · {s.room}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Sponsors({ block }: { block: any }) {
  return (
    <section style={sectionStyle(block.appearance)}>
      {block.heading && <h2 style={{ marginTop: 0 }}>{block.heading}</h2>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16 }}>
        {block.tiers?.map((t: any, i: number) => (
          <div key={i}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', opacity: 0.7, marginBottom: 12 }}>{t.tier}</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {t.logos?.map((l: any, j: number) => (
                <a key={j} href={l.url || '#'} style={{ opacity: 0.85 }}>
                  {l.logo?.url && <img src={l.logo.url} alt="sponsor" style={{ height: 40 }} />}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatsBanner({ block }: { block: any }) {
  const s = sectionStyle(block.appearance)
  return (
    <section style={s}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${block.stats?.length || 3}, 1fr)`, gap: 24, textAlign: 'center' }}>
        {block.stats?.map((st: any, i: number) => (
          <div key={i}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{st.value}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: 6 }}>{st.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function WhyJoin({ block }: { block: any }) {
  const s = sectionStyle(block.appearance)
  return (
    <section style={s}>
      {block.heading && <h2 style={{ marginTop: 0 }}>{block.heading}</h2>}
      {block.subheading && <p style={{ opacity: 0.8 }}>{block.subheading}</p>}
      <div style={{
        display: block.displayStyle === 'list' ? 'flex' : 'grid',
        flexDirection: block.displayStyle === 'list' ? 'column' : undefined,
        gridTemplateColumns: block.displayStyle === 'grid' ? 'repeat(auto-fill, minmax(220px, 1fr))' : undefined,
        gap: 20,
        marginTop: 20,
      }}>
        {block.benefits?.map((b: any, i: number) => (
          <div key={i} style={{ padding: '16px', borderRadius: 8, background: 'rgba(127,127,127,0.08)' }}>
            {b.icon && <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{b.icon}</div>}
            <div style={{ fontWeight: 600 }}>{b.title}</div>
            {b.description && <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: 6 }}>{b.description}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

function IntroSplit({ block }: { block: any }) {
  const s = sectionStyle(block.appearance)
  return (
    <section style={{ ...s, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
      <div>
        {renderRichText(block.body, {})}
      </div>
      {block.image?.url && (
        <img
          src={block.image.url}
          alt={block.image.alt || ''}
          style={{
            width: '100%',
            borderRadius: 8,
            filter: block.grayscale ? 'grayscale(1)' : 'none',
          }}
        />
      )}
    </section>
  )
}

// ---------- dispatcher ----------
const blockComponents: Record<string, (props: { block: any; payload: any }) => React.ReactNode> = {
  hero: ({ block }) => <HeroBlock block={block} />,
  content: ({ block }) => <ContentBlock block={block} />,
  mediaBlock: ({ block }) => <MediaBlock block={block} />,
  cta: ({ block }) => <CtaBlock block={block} />,
  archive: ({ block, payload }) => <ArchiveBlock block={block} payload={payload} />,
  boardGrid: ({ block }) => <BoardGrid block={block} />,
  eventSpotlight: ({ block, payload }) => <EventSpotlight block={block} payload={payload} />,
  pastEvents: ({ block, payload }) => <PastEvents block={block} payload={payload} />,
  partnerList: ({ block }) => <PartnerList block={block} />,
  program: ({ block }) => <Program block={block} />,
  sponsors: ({ block }) => <Sponsors block={block} />,
  statsBanner: ({ block }) => <StatsBanner block={block} />,
  whyJoin: ({ block }) => <WhyJoin block={block} />,
  introSplit: ({ block }) => <IntroSplit block={block} />,
}

export async function renderBlocks(layout: any[]) {
  const payload = await (async () => {
    const { default: config } = await import('../payload.config')
    const { getPayload } = await import('payload')
    return getPayload({ config })
  })()
  return layout?.map((block: any, i: number) => {
    const Comp = blockComponents[block.blockType]
    if (!Comp) {
      return (
        <div key={i} style={{ padding: 16, border: '1px dashed #ccc', borderRadius: 8 }}>
          Unknown block: {block.blockType}
        </div>
      )
    }
    return <Comp key={i} block={block} payload={payload} />
  })
}