import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventType', 'startDate', 'location', 'publishedAt'],
    livePreview: { url: (data: any) => `/${data.slug}` },
  },
  versions: {
    drafts: { autosave: { interval: 100 } },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Conference', value: 'konferanse' },
        { label: 'Networking', value: 'nettverkstreff' },
        { label: 'Member Meeting', value: 'medlemstreff' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'other',
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    { name: 'location', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'description', type: 'richText' },
    { name: '_status', type: 'text', admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
  ],
}
