import { Inter } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { gray, purple, white } from 'tailwindcss/colors'

const inter = Inter({ subsets: ['latin'] })

const muiTheme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
    allVariants: {
      color: white,
    },
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: purple,
    secondary: {
      main: white,
    },
    background: {
      default: gray[950],
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: white,
        },
      },
    },
  },
})

export default muiTheme
