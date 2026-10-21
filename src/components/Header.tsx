import React from 'react'

export default async function Header() {
  const { default: config } = await import('../payload.config')
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })

  const res: any = await payload.findGlobal({ slug: 'header' })
  const items: any[] = res?.navItems || []

  return (
    <header style={{
      borderBottom: '1px solid #e5e5e5',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap',
    }}>
      <a href="/" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a', textDecoration: 'none' }}>
        Demo Association
      </a>
      <nav style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {items.map((item, i) => {
          const url = item?.type === 'custom' ? item.url : `/${item?.reference?.slug ?? item?.reference?.value ?? ''}`
          return (
            <a
              key={i}
              href={url || '#'}
              style={{ color: '#444', textDecoration: 'none', fontSize: '0.95rem' }}
            >
              {item.label || 'Link'}
            </a>
          )
        })}
      </nav>
      <nav style={{ marginLeft: 'auto' }}>
        <a href="/admin" style={{
          color: '#fff',
          background: '#6b1f3a',
          padding: '6px 14px',
          borderRadius: 6,
          textDecoration: 'none',
          fontSize: '0.9rem',
        }}>
          Admin
        </a>
      </nav>
    </header>
  )
}
