import type { Field } from 'payload'

export const link = ({
  appearances = true,
  disableLabel = false,
  overrides = {},
}: {
  appearances?: boolean
  disableLabel?: boolean
  overrides?: Record<string, unknown>
} = {}): Field => {
  return {
    type: 'group',
    label: 'Link',
    fields: [
      {
        name: 'type',
        type: 'select',
        options: [
          { label: 'Custom', value: 'custom' },
          { label: 'Page (reference)', value: 'reference' },
        ],
        defaultValue: 'custom',
        
      },
      {
        name: 'label',
        type: 'text',
        
        admin: {
          condition: (_, { type }) => type === 'custom' && !disableLabel,
        },
      },
      {
        name: 'url',
        type: 'text',
        
        admin: {
          condition: (_, { type }) => type === 'custom',
        },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        
        admin: {
          condition: (_, { type }) => type === 'custom',
        },
      },
      {
        name: 'reference',
        type: 'relationship',
        relationTo: ['pages', 'posts', 'events'],
        
        admin: {
          condition: (_, { type }) => type === 'reference',
        },
      },
    ],
    ...overrides,
  }
}
