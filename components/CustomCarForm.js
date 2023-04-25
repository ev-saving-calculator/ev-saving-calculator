import React from 'react'
import { Field } from 'formik'
import { Switch, TextField } from 'formik-material-ui'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  efficiency: {
    width: 200
  },
  root: {
    maxWidth: 350
  }
}))

const CustomCarForm = props => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <Field
            size="small"
            disabled={false}
            name="customCar.price"
            label="Cena auta s DPH"
            type="number"
            variant={'outlined'}
            component={TextField}
            className={classes.efficiency}
            inputProps={{
              min: 1
            }}
            InputProps={{
              endAdornment: <InputAdornment position="start">Kč</InputAdornment>
            }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel control={<Field component={Switch} name="customCar.withVat" />} label="Cena s DPH" />
        </Grid>
        <Grid item xs={12}>
          <Field
            size="small"
            disabled={false}
            name="customCar.efficiency"
            label="Průměrná spotřeba"
            type="number"
            variant={'outlined'}
            component={TextField}
            className={classes.efficiency}
            inputProps={{
              min: 1
            }}
            InputProps={{
              endAdornment: <InputAdornment position="start">kWh/100km</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            size="small"
            disabled={false}
            name="customCar.battery"
            label="Velikost baterie"
            type="number"
            variant={'outlined'}
            component={TextField}
            className={classes.efficiency}
            inputProps={{
              min: 1
            }}
            InputProps={{
              endAdornment: <InputAdornment position="start">kWh</InputAdornment>
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

CustomCarForm.propTypes = {}

export default CustomCarForm
