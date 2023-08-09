'use client'

import { Button } from '@mui/material'
import { useSession } from 'next-auth/react'
import { signOut, signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Loader } from './Loader'

export function Header() {
  const { status, data: session } = useSession()

  const isAuthenticated = status === 'authenticated' && session && session.user

  return (
    <header className="sticky top-0 flex w-full flex-row items-center gap-4 bg-slate-900 py-2">
      <Link href="/" className="ml-4 flex items-center justify-center gap-3">
        <Image
          className="fill-primary-500"
          src="/logo.svg"
          alt="Logo"
          width={24}
          height={24}
        ></Image>
        <span>Home</span>
      </Link>
      <div className="ml-auto mr-5">
        {status === 'loading' ? (
          <Loader size={24} />
        ) : status === 'authenticated' && isAuthenticated ? (
          <Button variant="outlined" onClick={() => signOut()}>
            <Image
              alt={session?.user?.name ?? ''}
              src={session?.user?.image ?? ''}
              width={24}
              height={24}
              className="mr-2 rounded-full"
            />
            Sign Out
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => signIn('google')}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
