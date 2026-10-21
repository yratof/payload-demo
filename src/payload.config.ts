import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Events } from './collections/Events'
import { Categories } from './collections/Categories'
import { Forms } from './collections/Forms'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor({}),
  db: sqliteAdapter({
    client: {
      url: 'file:' + path.join(dirname, '../data/demo.db'),
    },
  }),
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'demo-secret-change-me',

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
    meta: {
      title: 'Demo Admin',
    },
  },
  collections: [Users, Media, Pages, Posts, Events, Categories, Forms],
  globals: [Header, Footer],
  typescript: {
    outputFile: path.join(dirname, 'payload-types.ts'),
  },
})
