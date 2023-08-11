'use client'

import { ArrowForward } from '@mui/icons-material'
import { Button } from '@mui/material'

export default function Home() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="flex flex-col gap-5 text-center">
        <p className="text-primary-gradient text-6xl font-semibold">
          Short Url
        </p>
        <p className="text-lg font-bold uppercase">Generate Tiny URLs</p>
        <Button
          variant="contained"
          size="medium"
          className="!mt-3"
          endIcon={<ArrowForward />}
          href="/dashboard"
        >
          Dive In
        </Button>
      </div>
    </div>
  )
}
