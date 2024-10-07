/* eslint-disable prettier/prettier */
import type { Block } from 'payload/types'

export const QuizBlock: Block = {
  slug: 'quiz-block',

  labels: {
    singular: 'Quiz Block',
    plural: 'Quiz Blocks',
  },
  fields: [
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
      name: 'categories',
      type: 'array',
      required: false,
      label: 'Category',
      fields: [
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
      ],
    },
  ],
}
