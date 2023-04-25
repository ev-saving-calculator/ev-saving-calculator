import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const AboutDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography variant="h6" gutterBottom>
            Electro Dad
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Button
              variant="outlined"
              size="small"
              target="_blank"
              href="https://www.youtube.com/channel/UC9hXv4OZ8L6r732X8_iKmIQ">
              YouTube
            </Button>{' '}
            <Button variant="outlined" target="_blank" size="small" href="https://www.electrodad.cz/">
              Web
            </Button>
            <ul>
              <li>Recenze na elektromobily a hybridy</li>
              <li>Fotovoltaika</li>
              <li>Ekologie</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            fDrive.cz
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Button
              variant="outlined"
              target="_blank"
              size="small"
              href="https://www.youtube.com/channel/UC8rLy4Yjck2_ELlI7MUwEbw">
              YouTube
            </Button>{' '}
            <Button variant="outlined" target="_blank" size="small" href="https://fdrive.cz/">
              Web
            </Button>
            <ul>
              <li>Recenze na elektromobily a hybridy</li>
              <li>Šetrná doprava</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            Tesláček Ajťáček
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Button
              variant="outlined"
              target="_blank"
              size="small"
              href="https://www.youtube.com/channel/UCjraiApUPRYnuEnYgZ31zQA">
              YouTube
            </Button>
            <ul>
              <li>Život s Teslou</li>
              <li>Novinky o Tesle</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            hybrid.cz
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Button
              variant="outlined"
              target="_blank"
              size="small"
              href="http://www.hybrid.cz/">
              Web
            </Button>
            <ul>
              <li>Recenze na elektromobily a hybridy</li>
              <li>Šetrná doprava</li>
            </ul>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Zavřít
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AboutDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default AboutDialog
