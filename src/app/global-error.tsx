'use client'

import { Button } from '@mui/material'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>Cause: {error.cause?.toString()}</p>
        <p>Message: {error.message}</p>
        <Button variant="contained" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  )
}
