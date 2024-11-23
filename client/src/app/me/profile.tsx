'use client'
import { cookies } from 'next/headers'
import React, { useEffect } from 'react'
import { useAppContext } from '~/app/AppProvider'
import envConfig from '~/config'

export default function Profile() {
  const { sessionToken } = useAppContext()

  useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(`${envConfig.NEXT_PUBLIC_API_PORT}/account/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`
        }
      }).then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          throw data
        }
        return data
      })
    }
    fetchRequest()
  }, [sessionToken])
  return (
    <>
      <p>Profile</p>
    </>
  )
}
