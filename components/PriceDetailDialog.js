import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import grey from '@material-ui/core/colors/grey'
import PriceTable from './PriceTable'
import Title from './Title'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles(theme => ({
  sliderWrap: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  tableContainer: {
    backgroundColor: grey[100]
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: 0,
    fontSize: '1rem'
  },
  tables: {
    [theme.breakpoints.up('md')]: {
      width: 720
    }
  }
}))

const PriceDetailDialog = props => {
  const classes = useStyles()
  const [year, setYear] = useState(6)
  const handleChangeYear = (e, newValue) => setYear(newValue)
  const showYears = useMediaQuery('(min-width:600px)')

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="lg">
      <DialogContent>
        <DialogContentText>
          <Typography variant="h6" gutterBottom>
            Detailní popis ceny
          </Typography>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <div className={classes.sliderWrap}>
                <Slider
                  value={year}
                  onChange={handleChangeYear}
                  step={null}
                  min={1}
                  valueLabelDisplay="auto"
                  marks={Array(10)
                    .fill(null)
                    .map((_, i) => ({ value: i + 1, label: i + 1 + (showYears ? '. rok' : '') }))}
                  max={10}
                />
              </div>
            </Grid>
          </Grid>
          <div className={classes.tables}>
            <Grid container spacing={1}>
              <Grid item md={6}>
                <Title className={classes.title}>Elektrický vůz</Title>
                <PriceTable items={props.data[year].allItemsElectric} priceUnit={props.priceUnit} />
              </Grid>
              <Grid item md={6}>
                <Title className={classes.title}>Spalovací vůz</Title>
                <PriceTable items={props.data[year].allItemsCommon} priceUnit={props.priceUnit} />
              </Grid>
            </Grid>
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

PriceDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  priceUnit: PropTypes.string.isRequired
}

export default PriceDetailDialog
