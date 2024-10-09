export const Quizzes = `
  query Quizzes {
    Pages(limit: 300)  {
      docs {
        slug
      }
    }
  }
`
