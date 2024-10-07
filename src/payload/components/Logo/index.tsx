/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @next/next/no-img-element */

import React from 'react'

const AdminLogo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      <img
        src="/custom_logo/lq-192x192.png"
        alt="Custom Admin Logo"
        style={{ width: '192px', height: '192px' }}
      />
    </div>
  )
}

export default AdminLogo
