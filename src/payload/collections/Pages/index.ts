/* eslint-disable simple-import-sort/imports */
import { adminsOrPublished } from './../../access/adminsOrPublished'
import { admins } from './../../access/admins'
/* eslint-disable simple-import-sort/imports */
import { QuizBlock } from '../../blocks/Quiz'
import type { CollectionConfig } from 'payload/types'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidatePage } from './hooks/revalidatePage'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePage],
    // afterRead: [populateArchiveBlock],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    // Page title
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      required: true,
    },
    // Slug for the page URL
    {
      name: 'slug',
      type: 'text',
      label: 'Page Slug',
      required: true,
      unique: true,
    },
    // Meta description for SEO

    // Hero Section (Optional, can be used to show a banner or introduction)
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Hero Title',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Hero Subtitle',
        },
      ],
    },
    {
      name: 'draft',
      type: 'checkbox',
      label: 'Draft Mode',
      admin: {
        position: 'sidebar',
      },
    },
    // Content Blocks to allow different types of blocks (quizzes, rich text, media, etc.)

    {
      type: 'tabs',
      tabs: [
        // {
        //   label: 'Hero',
        //   fields: [hero],
        // },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Page Layout',
              blocks: [QuizBlock],
            },
          ],
        },
      ],
    },

    // Published date (useful for version control or scheduling content)
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Pages
