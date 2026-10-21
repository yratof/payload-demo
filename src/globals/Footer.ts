import type { GlobalConfig } from 'payload'
import { link } from '../fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      fields: [
        link({}),
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'X / Twitter', value: 'x' },
            { label: 'YouTube', value: 'youtube' },
          ],
          required: true,
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
    },
  ],
}
