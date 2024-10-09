{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react'
import Link from 'next/link'

import type { Header } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import { Gutter } from '../Gutter'
import { HeaderNav } from './Nav'

import classes from './index.module.scss'

export async function Header() {
  let header: Header | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    // When deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // So swallow the error here and simply render the header without nav items if one occurs
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <>
      <header className={classes.header}>
        <Link href="https://payloadcms.com" target="_blank" rel="noopener noreferrer">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="/custom_logo/lq-192x192.png" />
            <img className={classes.logo} alt="Payload Logo" src="/custom_logo/lq-192x192.png" />
          </picture>
        </Link>
        <div
          style={{
            width: '200px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            gap: 5,
          }}
        >
          <h4>topics</h4>
          <h4>login</h4>
        </div>
      </header>
    </>
  )
}
