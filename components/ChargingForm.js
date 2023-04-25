import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Field, FieldArray } from 'formik'
import { TextField } from 'formik-material-ui'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SelectCharging from './SelectCharging'
import { getCarbonFootprintElectric } from '../src/utils'
import makeStyles from '@material-ui/core/styles/makeStyles'
import SubTitle from './SubTitle'

const useStyles = makeStyles(theme => ({
  smallInput: {
    width: 170
  },
  chargingPart: {
    width: 90
  },
  chargingType: {
    width: 175
  },
  chargingError: {
    marginTop: -theme.spacing(1),
    marginBottom: -theme.spacing(1)
  },
  chargingCO2Input: {
    width: 130
  }
}))

const chargingTypeItems = priceUnit => [
  { id: 'kwh', label: 'kwh', priceLabel: 'Cena energie', priceUnit: `${priceUnit}/kWh` },
  { id: 'flat', label: 'paušál', priceLabel: 'Měsíční poplatek', priceUnit: `${priceUnit}/měsíc` },
  { id: 'free', label: 'zdarma' },
  { id: 'powerStation', label: 'vlastní elektrárna', priceLabel: 'Pořizovací cena', priceUnit: priceUnit }
]

const defaultChargingItem = (type, powerStation, kwh, co2default, flat) => ({
  type,
  value: { kwh, flat, free: 0, powerStation }[type],
  part: 50,
  co2emission: co2default
})

const ChargingForm = props => {
  const { values, errors, priceUnit } = props
  const classes = useStyles()
  return (
    <>
      <Grid item>
        <SubTitle>Nabíjení</SubTitle>
      </Grid>
      <FieldArray
        name="chargingItems"
        render={arrayHelpers => (

          <Grid container item spacing={2}>
            {values.chargingItems.map((i, index) => (
              <Grid container item spacing={1} key={index} alignItems="center">
                {values.chargingItems.length > 1 && (
                  <Grid item>
                    <Field
                      size="small"
                      disabled={false}
                      className={classes.chargingPart}
                      name={`chargingItems.${index}.part`}
                      label="Podíl"
                      type="number"
                      component={TextField}
                      variant={'outlined'}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">%</InputAdornment>
                      }}
                    />
                  </Grid>
                )}
                <Grid item>
                  <Field
                    disabled={false}
                    select
                    size="small"
                    fullWidth
                    label="Typ"
                    variant="outlined"
                    className={classes.chargingType}
                    name={`chargingItems.${index}.type`}
                    component={TextField}>
                    {chargingTypeItems(props.priceUnit).map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                {i.type !== 'free' && (
                  <Grid item>
                    <Field
                      size="small"
                      disabled={false}
                      className={classes.smallInput}
                      name={`chargingItems.${index}.value`}
                      label={chargingTypeItems(priceUnit).find(k => k.id === i.type).priceLabel}
                      type="number"
                      component={TextField}
                      variant={'outlined'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            {chargingTypeItems(priceUnit).find(k => k.id === i.type).priceUnit}
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                )}
                {values.compareCarbonFootprint && (
                  <Grid item>
                    <Field
                      size="small"
                      disabled={false}
                      className={classes.chargingCO2Input}
                      name={`chargingItems.${index}.co2emission`}
                      label={
                        <span>
                          Produkce CO<sub>2</sub>
                        </span>
                      }
                      type="number"
                      component={TextField}
                      variant={'outlined'}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">g/kWh</InputAdornment>
                      }}
                    />
                  </Grid>
                )}
                {values.chargingItems.length > 1 && (
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        arrayHelpers.remove(index)
                      }}
                      aria-label="delete"
                      className={classes.margin}
                      size="small">
                      <ClearIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            ))}
            {errors.chargingItems && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error" className={classes.chargingError}>
                  {errors.chargingItems}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <SelectCharging
                priceUnit={priceUnit}
                onSelect={type =>
                  arrayHelpers.push(
                    defaultChargingItem(
                      type,
                      props.versionConfig.charging.powerStationPrice,
                      props.versionConfig.charging.energyPrice,
                      props.versionConfig.charging.co2emission,
                      props.versionConfig.charging.flatPrice
                    )
                  )
                }
              />
            </Grid>
          </Grid>

        )}
      />
      {values.carId && values.compareCarbonFootprint && (
        <Grid item>
          <Typography display={'block'} variant="subtitle1" component="h2">
            Elektromobil za 1 km vyprodukuje{' '}
            <b>{Math.round(getCarbonFootprintElectric(props.versionConfig, values, 1) * 1000)} g </b> CO
            <sub>2</sub>.
          </Typography>
        </Grid>
      )}
    </>
  )
}

ChargingForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  priceUnit: PropTypes.string.isRequired,
  versionConfig: PropTypes.object.isRequired
}

export default ChargingForm
