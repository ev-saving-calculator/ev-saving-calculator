import { createMuiTheme } from '@material-ui/core/styles'
import { blue, red } from '@material-ui/core/colors'
import grey from '@material-ui/core/colors/grey'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    // type: 'dark'
    primary: {
      main: blue[600]
    },
    error: {
      main: red.A400
    },
    background: {
      default: grey[200]
    }
  },
  typography: {
    h6: {
      fontWeight: 400,
      color: blue[600]
    }
  }
})

export default theme
