import Link from 'next/link'

import React from 'react'

export default function HomePage(){
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
      <h1>MERN App</h1>
      <Link href="/login">
        <button style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', borderRadius: '5px' }}>Go to Login</button>
      </Link>
    </div>
  )
}