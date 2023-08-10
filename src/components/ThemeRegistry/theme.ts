import { Inter } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { gray, purple } from 'tailwindcss/colors'

const inter = Inter({ subsets: ['latin'] })

const defaultDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[500],
    },
    background: {
      default: gray[950],
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
})

const defaultLightTheme = createTheme(defaultDarkTheme, {
  palette: {
    mode: 'light',
  },
})

export { defaultDarkTheme, defaultLightTheme }
