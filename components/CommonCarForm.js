import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Title from './Title'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Field } from 'formik'
import { Checkbox, TextField } from 'formik-material-ui'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import SubTitle from './SubTitle'
import ServiceItemsForm from './ServiceItemsForm'
import { serviceInputsCommon } from '../data/serviceItems'
import { getPricePerKmCommon } from '../src/utils'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  priceInput: {
    width: 240
  },
  serviceInput: {
    width: 240
  },
  pragueParkingPrice: {
    marginRight: theme.spacing(1)
  }
}))

// road tax
const engineCapacity = [
  { id: '800', label: 'Do 800 cm3' },
  { id: '1250', label: '801–1 250 cm3' },
  { id: '1500', label: '1 251–1 500 cm3' },
  { id: '2000', label: '1 501–2 000 cm3' },
  { id: '3000', label: '2 001–3 000 cm3' },
  { id: 'max', label: 'Nad 3 000 cm3' }
]

// emission fuel transport
const emissionFuelTransport = [
  { id: '0', label: 'Nezahrnout' },
  { id: '21', label: 'Nafta 21%' },
  { id: '19', label: 'Benzín 19%' },
  { id: '12', label: 'LPG 12%' }
]

const CommonCarForm = props => {
  const classes = useStyles()
  const { values, versionConfig } = props
  const { pragueParking } = versionConfig
  return (
    <>
      <Grid item xs={12}>
        <Title>Spalovací vůz k porovnání</Title>
        {versionConfig.toll && (
          <FormControlLabel
            control={<Field disabled={false} name="toll" color="primary" component={Checkbox} />}
            label="Dálniční známka"
          />
        )}
        {values.company && versionConfig.roadTax && (
          <FormControlLabel
            control={<Field disabled={false} name="roadTax" color="primary" component={Checkbox} />}
            label="Silniční daň"
          />
        )}
      </Grid>
      {pragueParking && (
        <Grid item xs={12}>
          <Field
            size="small"
            disabled={false}
            select
            label="Parkování v praze (roční)"
            variant="outlined"
            name={'pragueParking'}
            fullWidth
            component={TextField}>
            <MenuItem value={0}>Žádné</MenuItem>
            {pragueParking.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
                <b className={classes.pragueParkingPrice}>
                  {option.price.toLocaleString()} {versionConfig.priceUnit}
                </b>
                {option.label}
              </MenuItem>
            ))}
          </Field>
        </Grid>
      )}
      <Grid container item spacing={1}>
        <Grid item>
          <Field
            size="small"
            disabled={false}
            className={classes.priceInput}
            name="purchasePrice"
            label="Pořizovací cena"
            type="number"
            variant={'outlined'}
            component={TextField}
            InputProps={{
              endAdornment: <InputAdornment position="start">{versionConfig.priceUnit}</InputAdornment>
            }}
          />
        </Grid>
        {values.company && values.roadTax && (
          <Grid item>
            <Field
              size="small"
              disabled={false}
              select
              className={classes.serviceInput}
              label="Objem motoru (silniční daň)"
              variant="outlined"
              name={'engineCapacity'}
              component={TextField}>
              {engineCapacity.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
          </Grid>
        )}
      </Grid>
      <Grid container item spacing={1}>
        <Grid item>
          <Field
            size="small"
            disabled={false}
            className={classes.serviceInput}
            name="consumption"
            label="Spotřeba"
            type="number"
            variant={'outlined'}
            component={TextField}
            InputProps={{
              endAdornment: <InputAdornment position="start">l/100km</InputAdornment>
            }}
          />
        </Grid>
        <Grid item>
          <Field
            size="small"
            disabled={false}
            className={classes.serviceInput}
            name="fuelPrice"
            label="Cena paliva"
            type="number"
            variant={'outlined'}
            component={TextField}
            InputProps={{
              endAdornment: <InputAdornment position="start">{versionConfig.priceUnit}</InputAdornment>
            }}
          />
        </Grid>
      </Grid>
      {values.compareCarbonFootprint && (
        <Grid container item spacing={1}>
          <Grid item>
            <Field
              size="small"
              disabled={false}
              className={classes.serviceInput}
              name="co2Emission"
              label={
                <span>
                  Emise CO<sub>2</sub>
                </span>
              }
              type="number"
              variant={'outlined'}
              component={TextField}
              InputProps={{
                endAdornment: <InputAdornment position="start">g/km</InputAdornment>
              }}
            />
          </Grid>
          <Grid item>
            <Field
              size="small"
              select
              disabled={false}
              className={classes.serviceInput}
              name="co2EmissionFuelTransport"
              label={
                <span>
                  CO<sub>2</sub> při přepravě pohonné hmoty
                </span>
              }
              variant={'outlined'}
              component={TextField}>
              {emissionFuelTransport.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
          </Grid>
        </Grid>
      )}
      <Grid item>
        <SubTitle>Servis</SubTitle>
      </Grid>
      <ServiceItemsForm
        values={values}
        priceUnit={versionConfig.priceUnit}
        items={serviceInputsCommon}
        id="serviceCommon"
        customId="serviceCommonCustom"
      />
      <Grid item xs={12}>
        <Typography display={'block'} gutterBottom variant="subtitle1" component="h2">
          Cena za ujetý km včetně paliva{' '}
          <b>
            {getPricePerKmCommon(values).toLocaleString()} {versionConfig.priceUnit}
          </b>
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
