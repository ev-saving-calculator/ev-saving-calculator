import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Alert from '@material-ui/lab/Alert'
import SubTitle from './SubTitle'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  priceInput: {
    width: 240
  },
  serviceInput: {
    width: 170
  },
  pragueParkingPrice: {
    marginRight: theme.spacing(1)
  }
}))

const CommonCarForm = props => {
  const classes = useStyles()
  const { values, versionConfig, label, id, carPrice } = props
  const allowLoan = carPrice - values.loan[id].cash > 0
  return (
    <>
      <Grid item xs={12}>
        <SubTitle>{label}</SubTitle>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <Field
              size="small"
              disabled={false}
              className={classes.serviceInput}
              name={`loan.${id}.cash`}
              label="Splátka předem"
              type="number"
              variant={'outlined'}
              component={TextField}
              InputProps={{
                endAdornment: <InputAdornment position="start">{versionConfig.priceUnit}</InputAdornment>
              }}
            />
          </Grid>
          <Grid item>
            <Field
              size="small"
              disabled={!allowLoan}
              className={classes.serviceInput}
              name={`loan.${id}.months`}
              label="Počet splátek"
              type="number"
              variant={'outlined'}
              component={TextField}
              select>
              {[12, 24, 36, 48, 60].map(i => (
                <MenuItem key={i} value={i}>
                  {i} měsíců
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item>
            <Field
              size="small"
              disabled={!allowLoan}
              className={classes.serviceInput}
              name={`loan.${id}.payment`}
              label="Výše měsíční splátky"
              type="number"
              variant={'outlined'}
              component={TextField}
              InputProps={{
                endAdornment: <InputAdornment position="start">{versionConfig.priceUnit}</InputAdornment>
              }}
            />
          </Grid>
          
        </Grid>
      </Grid>
      {values.loan[id].cash > carPrice && <Grid item xs={12}>
       <Alert severity="warning">
          Splátka předem nemůže být vyšší než celková hodnota automobilu
        </Alert>
      </Grid>}
      <Grid item xs={12}>
        <Typography>
          Celkove cena automobilu <b>{carPrice.toLocaleString()} {versionConfig.priceUnit}.</b>
          {' '}
          Výše úvěru <b>{(carPrice - values.loan[id].cash).toLocaleString()}</b> {versionConfig.priceUnit}.
        </Typography>
      </Grid>
    </>
  )
}

CommonCarForm.propTypes = {
  values: PropTypes.object.isRequired,
  toll: PropTypes.bool,
  roadTax: PropTypes.bool,
  versionConfig: PropTypes.object.isRequired
}

export default CommonCarForm
