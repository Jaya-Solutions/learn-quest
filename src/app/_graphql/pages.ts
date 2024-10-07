export const PAGES = `
  query Pages {
    Pages(limit: 300)  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        slug
        hero {
          title
          subtitle
        }
        draft
        layout {
          ... on QuizBlock {
            id
            question
            options {
              optionText
              correctAnswer
              id
            }
            categories {
              category {
                id
              }
              id
            }
            blockName
            blockType
          }
        }
        publishedAt
        meta {
          title
          description
        }
        updatedAt
        createdAt
        _status
      }
    }
  }
`
