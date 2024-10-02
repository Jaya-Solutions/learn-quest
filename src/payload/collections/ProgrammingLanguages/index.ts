import type { CollectionConfig } from 'payload/types'

export const ProgrammingLanguages: CollectionConfig = {
  slug: 'programming-languages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'name',
      label: 'Language Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
  ],
}
