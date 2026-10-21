export default async function Footer() {
  const { default: config } = await import('../payload.config')
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })
  const footer: any = await payload.findGlobal({ slug: 'footer' })
  const navItems: any[] = footer?.navItems || []
  const socials: any[] = footer?.socialLinks || []
  const copyright: string = footer?.copyright || ''

  return (
    <footer style={{
      borderTop: '1px solid #e5e5e5',
      padding: '32px 24px',
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap',
      alignItems: 'center',
      background: '#fafafa',
      marginTop: 'auto',
    }}>
      <nav style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {navItems.map((item, i) => {
          const url = item?.type === 'custom' ? item.url : `/${item?.reference?.slug ?? item?.reference?.value ?? ''}`
          return (
            <a key={i} href={url || '#'} style={{ color: '#555', textDecoration: 'none', fontSize: '0.9rem' }}>
              {item?.label || 'Link'}
            </a>
          )
        })}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
        {socials.map((s, i) => (
          <a key={i} href={s.url || '#'} style={{ color: '#555', textDecoration: 'none', fontSize: '0.85rem' }}>
            {s.platform}
          </a>
        ))}
      </div>
      <div style={{ width: '100%', marginTop: 8, fontSize: '0.8rem', color: '#888' }}>
        {copyright}
      </div>
    </footer>
  )
}
