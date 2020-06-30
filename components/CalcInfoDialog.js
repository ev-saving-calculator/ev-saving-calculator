import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const CalcInfoDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose} size="medium">
      <DialogTitle>Výpočet</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography variant="body1" gutterBottom>
            Výpočty se ve skutečnosti mohou lišit. Pří výpočtu se vychází z toho, že u elektromobilu není potřeba měnit baterii. Data o spotřebě elektromobilu byla čerpána z
            webu{' '}
            <Link
              style={{ whiteSpace: 'nowrap' }}
              rel="noopener noreferrer"
              target="_blank"
              href="https://ev-database.org">
              https://ev-database.org/
            </Link>
            .{' '}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Emise při přepravě pohonné hmoty jsou čerpány ze studie <Link target="_blank" rel="noopener noreferrer" href="https://ec.europa.eu/jrc/sites/jrcsh/files/wtw_app_1_v4a_march_2014_final.pdf">WELL-TO-WHEELS Appendix 1 - Version 4.a</Link>.
          </Typography>
          {props.values.compareCarbonFootprint && (
            <>
              <Typography variant="body1">
                Pro výpočet uhlíkové stopy při výrobě baterie je počítáno se 100 Kg CO<sub>2</sub> na 1 KWh baterie (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.forbes.com/sites/rrapier/2020/02/16/estimating-the-carbon-footprint-of-utility-scale-battery-storage/#658455117adb">
                  zdroj
                </Link>
                ).
                {props.renderCo2Info()}
              </Typography>
              <Typography>
                Pro výpočet se předpokládá, že výroba elektromobilu bez baterie vyprodukuje stejné množství CO
                <sub>2</sub> jako obdobně velký vůz se spalovacím motorem. Ve skutečnosti tomu může být jinak.
              </Typography>
            </>
          )}
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

CalcInfoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  renderCo2Info: PropTypes.any.isRequired
}

export default CalcInfoDialog
