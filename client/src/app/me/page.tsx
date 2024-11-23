import React from 'react'
import { cookies } from 'next/headers'
import envConfig from '~/config'
import Profile from '~/app/me/profile'

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_PORT}/account/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken?.value}`
    }
  }).then(async (res) => {
    const data = await res.json()

    if (!res.ok) {
      throw data
    }
    return data
  })
  return (
    <div>
      <p>Xin chào {res.data?.name}</p>
      <Profile />
    </div>
  )
}
