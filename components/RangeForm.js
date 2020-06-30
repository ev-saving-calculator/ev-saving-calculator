import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Field } from 'formik'
import { RadioGroup, TextField } from 'formik-material-ui'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import InputAdornment from '@material-ui/core/InputAdornment'
import { getYearRange } from '../src/utils'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  title: {
    borderBottom: '1px solid'
  },
  distanceInput: {
    width: 157
  },
  serviceInput: {
    width: 240
  }
}))

const RangeForm = ({ values }) => {
  const classes = useStyles()
  return (
    <>
      <Grid item>
        <Typography
          className={classes.labelOffset}
          display={'block'}
          gutterBottom
          variant="h6"
          component="h2"
          classes={{ root: classes.title }}>
          Nájezd
        </Typography>
        <Field name="distanceType" component={RadioGroup}>
          <Grid container spacing={2}>
            <Grid item>
              <FormControlLabel value="static" control={<Radio color="primary" />} label="Zadat roční nájezd" />
            </Grid>
            <Grid item>
              <FormControlLabel
                value="calc"
                control={<Radio color="primary" />}
                label="Vypočítat z týdenního nájezdu"
              />
            </Grid>
          </Grid>
        </Field>
      </Grid>
      {values.distanceType === 'static' ? (
        <Grid item>
          <Field
            size="small"
            disabled={false}
            className={classes.serviceInput}
            name="distance"
            label="Roční nájezd"
            type="number"
            variant={'outlined'}
            component={TextField}
            InputProps={{
              endAdornment: <InputAdornment position="start">km</InputAdornment>
            }}
          />
        </Grid>
      ) : (
        <>
          <Grid container item spacing={1}>
            <Grid item>
              <Field
                size="small"
                disabled={false}
                className={classes.distanceInput}
                name="distanceToWork"
                label="Vzdálenost do práce"
                type="number"
                variant={'outlined'}
                component={TextField}
                InputProps={{
                  endAdornment: <InputAdornment position="start">km</InputAdornment>
                }}
              />
            </Grid>
            <Grid item>
              <Field
                size="small"
                disabled={false}
                className={classes.distanceInput}
                name="workingDays"
                label="Počet jízd do práce"
                type="number"
                min={0}
                max={7}
                variant={'outlined'}
                inputProps={{ min: 0, max: 7 }}
                component={TextField}
              />
            </Grid>
            <Grid item>
              <Field
                size="small"
                disabled={false}
                className={classes.distanceInput}
                name="additionalRange"
                label="Nájezd mimo práci"
                type="number"
                variant={'outlined'}
                component={TextField}
                InputProps={{
                  endAdornment: <InputAdornment position="start">km</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography display={'block'} gutterBottom variant="subtitle1" component="h2">
              Roční nájezd <b>{getYearRange(values).toLocaleString()} Km</b>
            </Typography>
          </Grid>
        </>
      )}
    </>
  )
}

RangeForm.propTypes = {
  values: PropTypes.object.isRequired
}

export default RangeForm
