import Link from 'next/link'
import React from 'react'
import ModeToggle from '~/components/mode-toggle'

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link href='/register'>Đăng ký</Link>
        </li>
        <li>
          <Link href='/login'>Đăng nhập</Link>
        </li>
      </ul>
      <ModeToggle />
    </div>
  )
}
