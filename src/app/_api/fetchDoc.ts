/* eslint-disable @typescript-eslint/no-implicit-any-catch */
/* eslint-disable no-console */
/* eslint-disable simple-import-sort/imports */

import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import type { Config } from '../../payload/payload-types'
import { PAGE } from '../_graphql/pages'
import { GRAPHQL_API_URL } from './shared'
import { payloadToken } from './token'

const queryMap = {
  pages: {
    query: PAGE,
    key: 'Pages',
  },
}

export const fetchDoc = async <T>(args: {
  collection: keyof Config['collections']
  slug?: string
  id?: string
  draft?: boolean
}): Promise<T> => {
  const { collection, slug, draft } = args || {}

  if (!queryMap[collection]) {
    throw new Error(`Collection ${collection} not found`)
  }

  let token: RequestCookie | undefined

  // Get the cookie token if draft is true
  if (draft) {
    const { cookies } = await import('next/headers')
    token = cookies().get(payloadToken)
  }

  try {
    const response = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token?.value && draft ? { Authorization: `JWT ${token.value}` } : {}),
      },
      cache: 'no-store',
      next: { tags: [`${collection}_${slug}`] },
      body: JSON.stringify({
        query: queryMap[collection].query,
        variables: {
          slug,
          draft,
        },
      }),
    })

    const res = await response.json()

    // Log the complete response for debugging
    // console.log('GraphQL Response:', res)

    // Check for GraphQL errors
    if (res.errors) {
      console.error('GraphQL Errors:', res.errors)
      throw new Error(res.errors[0]?.message ?? 'Error fetching doc')
    }

    // Return the fetched document
    const doc = res.data?.[queryMap[collection].key]?.docs?.[0]

    if (!doc) {
      console.warn(`No document found for slug: ${slug}`)
    }

    // console.log('Fetched Document:', doc)
    return doc
  } catch (error) {
    console.error('Fetch Document Error:', error)
    throw error // Rethrow the error after logging
  }
}
