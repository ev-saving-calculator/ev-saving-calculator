import { createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import grey from '@material-ui/core/colors/grey'

const fDriveOrange = '#f15635'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    // type: 'dark'
    primary: {
      main: fDriveOrange
    },
    error: {
      main: blue[600]
    },
    background: {
      default: grey[200]
    }
  },
  typography: {
    h6: {
      fontWeight: 400,
      color: fDriveOrange
    }
  }
})

export default theme
