import type { CollectionConfig } from 'payload'
import { link } from '../fields/link'
import {
  heroBlock, contentBlock, mediaBlock, ctaBlock, archiveBlock,
  boardGridBlock, eventSpotlightBlock, pastEventsBlock, partnerListBlock,
  programBlock, sponsorsBlock, statsBannerBlock, whyJoinBlock, introSplitBlock,
} from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt', '_status'],
    livePreview: { url: (data: any) => `/${data.slug}` },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'generateSlug',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Auto-generate slug from title',
      },
    },
    // The hero field (top of page, separate from layout blocks)
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Default (title + text + image)', value: 'default' },
            { label: 'Title only', value: 'titleOnly' },
            { label: 'None', value: 'none' },
          ],
          defaultValue: 'default',
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'richText',
          type: 'richText',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'links',
          type: 'array',
          fields: [link({ appearances: false, disableLabel: true })],
        },
      ],
    },
    // The layout builder — the heart of the template
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        heroBlock, contentBlock, mediaBlock, ctaBlock, archiveBlock,
        boardGridBlock, eventSpotlightBlock, pastEventsBlock, partnerListBlock,
        programBlock, sponsorsBlock, statsBannerBlock, whyJoinBlock, introSplitBlock,
      ],
    },
    // SEO / meta
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    { name: '_status', type: 'text', admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
  ],
}
