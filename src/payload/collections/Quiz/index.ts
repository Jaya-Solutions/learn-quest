/* eslint-disable simple-import-sort/imports */
import type { CollectionConfig } from 'payload/types'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidatePage } from './hooks/revalidatePage'

const Quiz: CollectionConfig = {
  slug: 'quiz',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'categories', 'publishedAt'],
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true, // Set access control as per your requirements
    update: ({ req }) => !!req.user, // Example of limiting edit access to logged-in users
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      label: 'Page Slug',
      required: true,
      unique: true,
    },
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
    },
    {
      name: 'options',
      type: 'array',
      required: true,
      label: 'Options',
      fields: [
        {
          name: 'optionText',
          type: 'text',
          required: true,
          label: 'Option Text',
        },
        {
          name: 'correctAnswer',
          type: 'checkbox',
          required: true,
          label: 'Is Correct?',
        },
      ],
    },

    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories', // Ensure this points to the Categories collection
      required: true,
      label: 'Select Category', // Optional label for the field
      admin: {
        // This will define how the categories are displayed in the admin panel
        description: 'Select one or more categories for this page.',
      },
    },
    {
      name: 'points',
      type: 'number',
      required: true,
      label: 'Points for Correct Answer',
    },
    // {
    //   name: 'draft',
    //   type: 'checkbox',
    //   label: 'Draft Mode',
    //   admin: {
    //     position: 'sidebar',
    //   },
    // },
    // {
    //   name: 'publishedAt',
    //   type: 'date',
    //   label: 'Publish Date',
    //   admin: {
    //     position: 'sidebar',
    //   },
    // },
  ],
}
export default Quiz
