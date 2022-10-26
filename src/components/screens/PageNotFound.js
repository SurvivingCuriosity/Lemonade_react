import React from 'react'
import { FixedTopNav } from '../molecules/navs/FixedTopNav'

export const PageNotFound = () => {
  return (
    <>
      <FixedTopNav />
      <div className='container_centro'>
        <h1>404: Page Not Found</h1>
        <p>La página que has solicitado no existe...</p>
      </div>
    </>
  )
}
