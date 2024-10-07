/* eslint-disable simple-import-sort/imports */
import type { CollectionConfig } from 'payload/types'

const Category: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name', // Ensure this is set to the field you want to use as the title
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },

  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Category Name',
      required: true,
    },

    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Description',
    },
  ],
}

export default Category
