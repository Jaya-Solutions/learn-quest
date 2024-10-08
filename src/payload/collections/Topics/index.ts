/* eslint-disable @typescript-eslint/consistent-type-imports */
import { CollectionConfig } from 'payload/types'

const Topics: CollectionConfig = {
  slug: 'topics',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'programmingLanguage', 'updatedAt'],
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Topic Name',
      required: true,
    },
    {
      name: 'description',
      type: 'richText', // Using richText for detailed explanations of the topic
      label: 'Topic Description',
      required: true,
    },
    {
      name: 'programmingLanguage',
      type: 'select',
      label: 'Programming Language',
      options: [
        {
          label: 'JavaScript',
          value: 'javascript',
        },
        {
          label: 'Python',
          value: 'python',
        },
        {
          label: 'Java',
          value: 'java',
        },
        {
          label: 'C++',
          value: 'cpp',
        },
        // Add more languages as needed
      ],
      required: true,
    },
    {
      name: 'quizzes',
      type: 'relationship',
      label: 'Related Quizzes',
      relationTo: 'quiz',
      hasMany: true, // A topic can have many quizzes associated with it
    },
  ],
}

export default Topics
