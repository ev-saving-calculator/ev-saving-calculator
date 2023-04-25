import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Mailto from 'reactv16-mailto'
import makeStyles from '@material-ui/core/styles/makeStyles'
import EmailIcon from '@material-ui/icons/Email'

const useStyles = makeStyles(theme => ({
  links: {
    marginTop: theme.spacing(1),
    '& a': {
      textDecoration: 'none'
    },
    '& a+a': {
      marginLeft: theme.spacing(1)
    }
  },
  linkedinIcon: {
    width: 16
  }
}))

const AboutDialog = props => {
  const classes = useStyles()
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography variant="h6" gutterBottom>
            Aplikace
          </Typography>
          <Typography variant="body1" gutterBottom>
            Autor aplikace neručí za správnost aplikace a nepřebírá žádnou zodpovědnost za její užítí. V aplikaci mohou
            být chyby a neaktuální informace. Pokud v aplikaci naleznete chyby či budete mít jen přípomínky, prosím
            kontaktujte autora.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Autor
          </Typography>
          <Typography variant="body1">
            Autorem je Petr Pololáník - milovník elektromobility a moderních technologií. Aplikaci vytvořil ve svém
            volném čase a bez záměru výdělku. Elektromobil zatím sám nemá, ale plánuje si ho v blízké době pořídit.
            Přeje si, aby aplikace pomohla v rozhodování, zda si pořídit elektromobil a nebo nikoliv.
          </Typography>
          <div className={classes.links}>
            <Button
              startIcon={<img alt="linkeding" src="linkedin.svg" className={classes.linkedinIcon} />}
              target="_blank"
              variant="outlined"
              href="https://www.linkedin.com/in/petr-polol%C3%A1n%C3%ADk-90a506a2/">
              LinkedIn
            </Button>
            <Mailto email="pololanikp@gmail.com" obfuscate={true}>
              <Button startIcon={<EmailIcon />} variant="outlined">
                Email
              </Button>
            </Mailto>
          </div>
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
