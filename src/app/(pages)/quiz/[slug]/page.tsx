/* eslint-disable no-console */
/* eslint-disable simple-import-sort/imports */
import React from 'react'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Quiz } from '../../../../payload/payload-types'
import { draftMode } from 'next/headers'
import { generateMeta } from '../../../_utilities/generateMeta'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const page = async ({ params: { slug } }) => {
  const { isEnabled: isDraftMode } = draftMode()

  let quiz: Quiz | null = null

  try {
    quiz = await fetchDoc<Quiz>({
      collection: 'quiz',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!quiz) {
    notFound()
  }

  const { question } = quiz

  console.log('quiz: ', question)

  return <div>{question}</div>
}

export default page

export async function generateStaticParams() {
  try {
    const quiz = await fetchDocs<Quiz>('quiz')
    return quiz?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let quiz: Quiz | null = null

  try {
    quiz = await fetchDoc<Quiz>({
      collection: 'quiz',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: quiz })
}
