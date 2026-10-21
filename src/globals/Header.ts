import type { GlobalConfig } from 'payload'
import { link } from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      fields: [
        link({}),
      ],
    },
  ],
}
