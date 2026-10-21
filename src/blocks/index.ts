import type { BlocksField } from 'payload'

/** Shared appearance select used by most blocks */
const appearance = {
  name: 'appearance',
  type: 'select' as const,
  options: [
    { label: 'Default', value: 'default' },
    { label: 'Burgundy', value: 'burgundy' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ],
  defaultValue: 'default',
  admin: { position: 'sidebar' as const },
}

/** Shared blockName field (the human label shown in the admin list) */
const blockName = {
  name: 'blockName',
  type: 'text' as const,
  admin: { position: 'sidebar' as const, description: 'Label shown in the admin block list' },
}

export const blockField: any = {
  name: 'blockField',
  type: 'blocks' as const,
  blocks: [],
}

// ---------- STOCK blocks (from the official Payload website template) ----------

export const heroBlock: any = {
  slug: 'hero',
  fields: [
    { name: 'align', type: 'select' as const, options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ], defaultValue: 'center' },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'richText' as const, required: true },
    { name: 'backgroundImage', type: 'upload' as const, relationTo: 'media' },
    appearance,
    { name: 'links', type: 'array' as const, fields: [
      { name: 'label', type: 'text' },
      { name: 'url', type: 'text' },
    ] },
    blockName,
  ],
}

export const contentBlock: any = {
  slug: 'content',
  fields: [
    appearance,
    {
      name: 'columns',
      type: 'array' as const,
      fields: [
        { name: 'size', type: 'select' as const, options: [
          { label: '1/3', value: '1/3' },
          { label: '2/3', value: '2/3' },
          { label: 'Full', value: 'full' },
        ], defaultValue: 'full' },
        { name: 'richText', type: 'richText' },
      ],
    },
    blockName,
  ],
}

export const mediaBlock: any = {
  slug: 'mediaBlock',
  fields: [
    { name: 'media', type: 'upload' as const, relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    blockName,
  ],
}

export const ctaBlock: any = {
  slug: 'cta',
  fields: [
    { name: 'richText', type: 'richText' as const, required: true },
    appearance,
    { name: 'links', type: 'array' as const, fields: [
      { name: 'label', type: 'text' },
      { name: 'url', type: 'text' },
    ] },
    blockName,
  ],
}

export const archiveBlock: any = {
  slug: 'archive',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    appearance,
    {
      name: 'source',
      type: 'select' as const,
      options: [
        { label: 'Posts', value: 'posts' },
        { label: 'Events', value: 'events' },
      ],
      defaultValue: 'posts',
    },
    { name: 'limit', type: 'number' as const, defaultValue: 6 },
    {
      name: 'category',
      type: 'relationship' as const,
      relationTo: 'categories',
    },
    blockName,
  ],
}

// ---------- CUSTOM blocks (association / membership themed) ----------

export const boardGridBlock: any = {
  slug: 'boardGrid',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    appearance,
    {
      name: 'members',
      type: 'array' as const,
      fields: [
        { name: 'name', type: 'text' as const, required: true },
        { name: 'role', type: 'text' },
        { name: 'photo', type: 'upload' as const, relationTo: 'media' },
        { name: 'bio', type: 'textarea' },
      ],
    },
    blockName,
  ],
}

export const eventSpotlightBlock: any = {
  slug: 'eventSpotlight',
  fields: [
    appearance,
    {
      name: 'source',
      type: 'select' as const,
      options: [
        { label: 'Auto (next upcoming)', value: 'auto' },
        { label: 'Manually selected', value: 'manual' },
      ],
      defaultValue: 'auto',
    },
    {
      name: 'selectedEvent',
      type: 'relationship' as const,
      relationTo: 'events',
      admin: { condition: (_, { source }) => source === 'manual' },
    },
    blockName,
  ],
}

export const pastEventsBlock: any = {
  slug: 'pastEvents',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    appearance,
    {
      name: 'source',
      type: 'select' as const,
      options: [
        { label: 'All past', value: 'all' },
        { label: 'By type', value: 'filterType' },
      ],
      defaultValue: 'all',
    },
    {
      name: 'filterType',
      type: 'select' as const,
      options: [
        { label: 'Conference', value: 'konferanse' },
        { label: 'Networking', value: 'nettverkstreff' },
        { label: 'Member Meeting', value: 'medlemstreff' },
      ],
      admin: { condition: (_, { source }) => source === 'filterType' },
    },
    { name: 'limit', type: 'number' as const, defaultValue: 4 },
    {
      name: 'selectedEvents',
      type: 'relationship' as const,
      relationTo: 'events',
      hasMany: true,
    },
    blockName,
  ],
}

export const partnerListBlock: any = {
  slug: 'partnerList',
  fields: [
    { name: 'heading', type: 'text' },
    appearance,
    {
      name: 'partners',
      type: 'array' as const,
      fields: [
        { name: 'name', type: 'text' as const, required: true },
        { name: 'logo', type: 'upload' as const, relationTo: 'media' },
        { name: 'url', type: 'text' },
      ],
    },
    blockName,
  ],
}

export const programBlock: any = {
  slug: 'program',
  fields: [
    { name: 'heading', type: 'text' },
    appearance,
    {
      name: 'sessions',
      type: 'array' as const,
      fields: [
        { name: 'time', type: 'text' },
        { name: 'title', type: 'text' as const, required: true },
        { name: 'speaker', type: 'text' },
        { name: 'room', type: 'text' },
        { name: 'type', type: 'select' as const, options: [
          { label: 'Talk', value: 'talk' },
          { label: 'Panel', value: 'panel' },
          { label: 'Break', value: 'break' },
          { label: 'Networking', value: 'networking' },
        ], defaultValue: 'talk' },
      ],
    },
    blockName,
  ],
}

export const sponsorsBlock: any = {
  slug: 'sponsors',
  fields: [
    { name: 'heading', type: 'text' },
    appearance,
    {
      name: 'tiers',
      type: 'array' as const,
      fields: [
        { name: 'tier', type: 'text' as const, required: true },
        { name: 'logos', type: 'array' as const, fields: [
          { name: 'logo', type: 'upload' as const, relationTo: 'media' },
          { name: 'url', type: 'text' },
        ] },
      ],
    },
    blockName,
  ],
}

export const statsBannerBlock: any = {
  slug: 'statsBanner',
  fields: [
    appearance,
    {
      name: 'stats',
      type: 'array' as const,
      fields: [
        { name: 'value', type: 'text' as const, required: true },
        { name: 'label', type: 'text' as const, required: true },
      ],
    },
    blockName,
  ],
}

export const whyJoinBlock: any = {
  slug: 'whyJoin',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    appearance,
    {
      name: 'displayStyle',
      type: 'select' as const,
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'benefits',
      type: 'array' as const,
      fields: [
        { name: 'title', type: 'text' as const, required: true },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'text' },
      ],
    },
    blockName,
  ],
}

export const introSplitBlock: any = {
  slug: 'introSplit',
  fields: [
    appearance,
    { name: 'image', type: 'upload' as const, relationTo: 'media' },
    { name: 'grayscale', type: 'checkbox' as const, defaultValue: false },
    { name: 'body', type: 'richText' as const, required: true },
    blockName,
  ],
}
