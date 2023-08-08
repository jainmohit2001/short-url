import { Box } from '@mui/material'
import theme from './ThemeRegistry/theme'

export function ModalContent({ children }: { children: React.ReactNode }) {
  const style = {
    maxWidth: {
      sm: 500,
    },
    margin: '1.75rem auto',
    background: theme.palette.grey[200],
    position: 'relative',
    display: 'flex',
    '-webkit-box-orient': 'vertical',
    '-webkit-box-direction': 'normal',
    '-ms-flex-direction': 'column',
    'flex-direction': 'column',
    width: '100%',
    'background-clip': 'padding-box',
    border: '1px solid rgba(0,0,0,.2)',
    'border-radius': '0.3rem',
    outline: 0,
    gap: '8px',
    padding: '8px',
  }

  return <Box sx={style}>{children}</Box>
}
