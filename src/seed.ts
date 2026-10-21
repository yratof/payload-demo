import { getPayload } from 'payload'
import config from './payload.config'

// Simple Lexical rich-text helpers
const text = (content: string) => ({
  root: {
    type: 'root', format: '', indent: 0, version: 1,
    children: [{
      tag: 'p', type: 'paragraph', format: '', indent: 0, version: 1,
      children: [{ mode: 'normal', text: content, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
      direction: 'ltr',
    }],
    direction: 'ltr',
  },
})

const heading = (tag: string, content: string) => ({
  root: {
    type: 'root', format: '', indent: 0, version: 1,
    children: [{
      tag, type: 'heading', format: '', indent: 0, version: 1,
      children: [{ mode: 'normal', text: content, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
      direction: 'ltr',
    }],
    direction: 'ltr',
  },
})

async function createSampleData(payload: any) {
  await payload.create({ collection: 'categories', data: { title: 'News', slug: 'news' } })
  await payload.create({ collection: 'categories', data: { title: 'Events', slug: 'events' } })

  const home = await payload.create({
    collection: 'pages',
    data: {
      title: 'Home', slug: 'home', generateSlug: false, _status: 'published',
      publishedAt: new Date().toISOString(),
      hero: { type: 'default', richText: heading('h1', 'Welcome to the Demo Association'), media: null, links: [] },
      layout: [
        { blockType: 'statsBanner', appearance: 'burgundy', stats: [
          { value: '3,000+', label: 'Members' },
          { value: '40+', label: 'Events / year' },
          { value: '12', label: 'Partner companies' },
        ] },
        { blockType: 'content', appearance: 'default', columns: [
          { size: 'full', richText: text('This is a demo site built with Payload v3 + Next.js, mirroring the structure of a professional association website. Edit the content in the /admin panel and it updates here instantly.') },
        ] },
        { blockType: 'whyJoin', appearance: 'default', heading: 'Why Join Us', subheading: 'The benefits of membership', displayStyle: 'grid', benefits: [
          { title: 'Networking', description: 'Meet peers in the industry at regular events.' },
          { title: 'Mentorship', description: 'Get guidance from experienced professionals.' },
          { title: 'Knowledge', description: 'Access to talks, workshops, and resources.' },
        ] },
        { blockType: 'cta', appearance: 'burgundy', richText: heading('h2', 'Ready to join?'), links: [
          { label: 'Become a member', url: '/bli-medlem' },
        ] },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'About Us', slug: 'om-uin', generateSlug: false, _status: 'published',
      publishedAt: new Date().toISOString(),
      hero: { type: 'titleOnly', richText: heading('h1', 'About the Association'), media: null, links: [] },
      layout: [
        { blockType: 'hero', align: 'center', eyebrow: 'Since 2020', heading: heading('h1', 'Our Mission'), appearance: 'burgundy', links: [] },
        { blockType: 'content', appearance: 'default', columns: [
          { size: 'full', richText: text('We are a network for young professionals in the industry. We organize conferences, networking events, and mentorship programs.') },
        ] },
        { blockType: 'boardGrid', heading: 'The Board', appearance: 'default', members: [
          { name: 'Jane Doe', role: 'Chair', photo: null, bio: '10 years in the industry.' },
          { name: 'John Smith', role: 'Vice Chair', photo: null, bio: 'Specialist in commercial property.' },
          { name: 'Astrid Nord', role: 'Secretary', photo: null, bio: 'Handles communications and events.' },
        ] },
        { blockType: 'partnerList', heading: 'Our Partners', appearance: 'default', partners: [
          { name: 'Partner A', logo: null, url: 'https://example.com' },
          { name: 'Partner B', logo: null, url: 'https://example.com' },
        ] },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Events', slug: 'arrangementer', generateSlug: false, _status: 'published',
      publishedAt: new Date().toISOString(),
      hero: { type: 'titleOnly', richText: heading('h1', 'Events & Conferences'), media: null, links: [] },
      layout: [
        { blockType: 'eventSpotlight', source: 'auto', appearance: 'default' },
        { blockType: 'pastEvents', heading: 'Past Events', source: 'all', limit: 4, appearance: 'default' },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Become a Member', slug: 'bli-medlem', generateSlug: false, _status: 'published',
      publishedAt: new Date().toISOString(),
      hero: { type: 'titleOnly', richText: heading('h1', 'Become a Member'), media: null, links: [] },
      layout: [
        { blockType: 'whyJoin', heading: 'Why Join', subheading: 'Membership benefits', displayStyle: 'grid', appearance: 'default', benefits: [
          { title: 'Access', description: 'Full access to all member events.' },
          { title: 'Community', description: 'Be part of a supportive network.' },
        ] },
        { blockType: 'cta', appearance: 'burgundy', richText: heading('h2', 'Sign up today'), links: [
          { label: 'Join now', url: '/join' },
        ] },
      ],
    },
  })

  await payload.create({
    collection: 'events',
    data: {
      title: 'Annual Conference 2026', eventType: 'konferanse', eyebrow: 'Flagship',
      startDate: new Date('2026-10-09T14:00:00Z').toISOString(),
      location: 'Ambassaden', address: 'Oslo, Norway', image: null,
      description: text('Our annual flagship conference bringing together the industry.'),
      _status: 'published', publishedAt: new Date().toISOString(),
    },
  })

  await payload.create({
    collection: 'events',
    data: {
      title: 'Autumn Networking', eventType: 'nettverkstreff',
      startDate: new Date('2026-11-15T18:00:00Z').toISOString(),
      location: 'Oslo', address: 'TBA', image: null,
      description: text('Informal networking evening for members.'),
      _status: 'published', publishedAt: new Date().toISOString(),
    },
  })

  await payload.create({
    collection: 'posts',
    data: {
      title: 'Welcome to the new website', slug: 'welcome', generateSlug: false,
      heroImage: null, content: text('This is the first post on the new Payload-powered site.'),
      _status: 'published', publishedAt: new Date().toISOString(),
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { type: 'custom', label: 'About', url: '/om-uin', newTab: false },
        { type: 'custom', label: 'Events', url: '/arrangementer', newTab: false },
        { type: 'custom', label: 'Become a Member', url: '/bli-medlem', newTab: true },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: [
        { type: 'custom', label: 'About', url: '/om-uin', newTab: false },
        { type: 'custom', label: 'Events', url: '/arrangementer', newTab: false },
      ],
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/company/demo' },
        { platform: 'instagram', url: 'https://instagram.com/demo' },
      ],
      copyright: '© 2026 Demo Association',
    },
  })

  console.log('Seed complete. Home page id:', home.id)
}

async function runSeed() {
  const payload = await getPayload({ config })
  await payload.db.connect()
  await createSampleData(payload)
  await payload.db.destroy()
  process.exit(0)
}

runSeed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
