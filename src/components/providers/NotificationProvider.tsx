'use client'

import { styled } from '@mui/material'
import { MaterialDesignContent, SnackbarProvider } from 'notistack'
import { blue, green, orange, red, slate } from 'tailwindcss/colors'

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: green[600],
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: red[600],
  },
  '&.notistack-MuiContent-default': {
    backgroundColor: slate[600],
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: blue[500],
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: orange[600],
  },
}))

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={1500}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        default: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
      }}
    >
      {children}
    </SnackbarProvider>
  )
}
