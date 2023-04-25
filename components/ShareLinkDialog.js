import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import CopyIcon from '@material-ui/icons/FileCopy'
import copy from 'copy-to-clipboard'
import Snackbar from '@material-ui/core/Snackbar'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

const useStyles = makeStyles(theme => ({
  input: {
    width: 440,
    [theme.breakpoints.down(600)]: {
      width: '100%'
    }
  }
}))

const ShareLinkDialog = props => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const handleClose = (event, reason) => {
    setOpen(false)
  }

  const handleFocus = event => {
    const { target } = event
    if (target.setSelectionRange) {
      event.preventDefault()
      const extensionStarts = target.value.length
      target.focus()
      target.setSelectionRange(0, extensionStarts)
    }
  }

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Sdílení konfigurace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormControl>
              <InputLabel htmlFor="share_url">Odkaz</InputLabel>
              <Input
                id="share_url"
                autoFocus
                className={classes.input}
                value={props.url}
                size="small"
                onClick={handleFocus}
                onMouseUp={handleFocus}
                onMouseDown={handleFocus}
                onFocus={handleFocus}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        copy(props.url)
                        setOpen(true)
                      }}>
                      <CopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </DialogContentText>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} message="Zkopírováno do schránky" />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Zavřít
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

ShareLinkDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
}

export default ShareLinkDialog
