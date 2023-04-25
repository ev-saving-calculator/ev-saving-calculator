import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Title from './Title'
import CarInfo from './CarInfo'
import {
  getCar2,
  getCarByIds2,
  getGrantPrice,
  getPricePerKmElectric,
  grantOverflow,
  grantTooSmall,
  maxGrantCarPrice,
  minGrantPrice
} from '../src/utils'
import SelectElectricCarDialog from './SelectElectricCarDialog'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Field } from 'formik'
import { Checkbox, TextField } from 'formik-material-ui'
import Link from '@material-ui/core/Link'
import MenuItem from '@material-ui/core/MenuItem'
import Alert from '@material-ui/lab/Alert'
import SubTitle from './SubTitle'
import ServiceItemsForm from './ServiceItemsForm'
import { serviceInputsElectric } from '../data/serviceItems'
import ChargingForm from './ChargingForm'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import CustomCarForm from './CustomCarForm'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  title: {
    borderBottom: '1px solid'
  },
  title2: {
    fontSize: '1.2rem'
  },
  priceInput: {
    width: 240
  },
  serviceInput: {
    width: 240
  },
  serviceInputPrice: {
    width: 170
  },
  smallInput: {
    width: 170
  },
  labelOffset: {
    marginTop: theme.spacing(2)
  },
  chargingSlider: {
    width: 200
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
  submit: {
    marginTop: theme.spacing(2)
  },
  grantPrice: {
    opacity: 0.5,
    marginLeft: theme.spacing(2),
    textAlign: 'right',
    flex: 1
  },
  chargingCO2Input: {
    width: 130
  },
  distanceInput: {
    width: 157
  },
  regionInfo: {
    marginTop: -theme.spacing(1)
  }
}))

const grantItems = [
  { id: 30, label: '30% malý podnik' },
  { id: 25, label: '25% střední podnik' },
  { id: 20, label: '20% velký podnik' }
]

const ElectricCarForm = props => {
  const { values, versionConfig, errors, setFieldValue } = props

  const [showCustomCar, setShowCustomCar] = useState(false)
  const [showSelectCar, setShowSelectCar] = useState(false)

  const handleClickSelectCar = () => setShowSelectCar(true)
  const handleCloseSelectCar = () => setShowSelectCar(false)
  const handleSelectCar = (data, setFieldValue) => {
    if (Array.isArray(data)) {
      setFieldValue('carId', data)
    } else if (data === 'custom') {
      setShowCustomCar(true)
      setFieldValue('carId', 'custom')
    }
    setShowSelectCar(false)
  }

  const classes = useStyles()
  return (
    <>
      <Grid item>
        <Title>Elektrický vůz</Title>
      </Grid>
      <Grid item>
        <CarInfo
          custom={values.carId === 'custom'}
          vat={values.vat}
          versionConfig={versionConfig}
          data={getCar2(values, versionConfig)}
          onClickEdit={() => {
            setShowCustomCar(true)
            if (values.carId !== 'custom') {
              const car = getCarByIds2(values.carId)
              setFieldValue('customCar', {
                price: car.price[versionConfig.priceId],
                battery: car.battery,
                withVat: true,
                efficiency: car.efficiency
              })
            }
            setFieldValue('carId', 'custom')
          }}
          onClickSelectCar={handleClickSelectCar}
        />
        <SelectElectricCarDialog
          versionConfig={versionConfig}
          vat={values.vat}
          open={showSelectCar}
          onClose={handleCloseSelectCar}
          onSelect={data => handleSelectCar(data, setFieldValue)}
        />
      </Grid>
      {values.company && versionConfig.grant && (
        <>
          <Grid item>
            <FormControlLabel
              control={<Field name="enableGrant" disabled={false} color="primary" component={Checkbox} />}
              label={
                <span>
                  Využiji dotaci na nákup (bylo možné do 31. 7. 2020). Více informací na{' '}
                  <Link
                    target="_blank"
                    href="https://www.mpo.cz/cz/podnikani/dotace-a-podpora-podnikani/oppik-2014-2020/vyzvy-op-pik-2019/nizkouhlikove-technologie---elektromobilita---v--vyzva--251085/">
                    www.mpo.cz
                  </Link>. V současné době žádná výzva není.
                </span>
              }
            />
          </Grid>
          {values.enableGrant && (
            <Grid item>
              <Field
                disabled={false}
                select
                label="Výše dotace"
                variant="outlined"
                name={'grant'}
                size="small"
                component={TextField}>
                {grantItems.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                    <span className={classes.grantPrice}>
                      {getGrantPrice(versionConfig, values, option.id).toLocaleString()} {versionConfig.priceUnit}
                    </span>
                  </MenuItem>
                ))}
              </Field>
            </Grid>
          )}
          {grantOverflow(versionConfig, values) && (
            <Grid item xs={12}>
              <Alert severity="warning">
                Nelze využít dotaci. Cena automobilu pro využítí dotace nesmí přesáhnout{' '}
                {maxGrantCarPrice.toLocaleString()} Kč bez daně.
              </Alert>
            </Grid>
          )}
          {grantTooSmall(versionConfig, values) && (
            <Grid item xs={12}>
              <Alert severity="error">
                Nelze využít dotaci. Minimální výše dotace je {minGrantPrice.toLocaleString()} {versionConfig.priceUnit}
                .
              </Alert>
            </Grid>
          )}
        </>
      )}
      <Grid item container spacing={2}>
        <Grid item>
          <SubTitle>Servis</SubTitle>
        </Grid>
        <ServiceItemsForm
          values={values}
          priceUnit={versionConfig.priceUnit}
          id="serviceElectric"
        />
      </Grid>
      <ChargingForm
        {...props}
        values={values}
        priceUnit={versionConfig.priceUnit}
        errors={errors}
        versionConfig={versionConfig}
      />
      {values.carId && (
        <Grid item>
          <Typography display={'block'} variant="subtitle1" component="h2">
            Cena za ujetý km včetně nabíjení{' '}
            <b>
              {getPricePerKmElectric(values, versionConfig).toLocaleString()} {versionConfig.priceUnit}
            </b>
          </Typography>
        </Grid>
      )}
      <Dialog open={showCustomCar} onClose={() => setShowCustomCar(false)}>
        <DialogTitle>Vlastní parametry</DialogTitle>
        <DialogContent>
          <CustomCarForm />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setShowCustomCar(false)}>
            Zavřít
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

ElectricCarForm.propTypes = {
  values: PropTypes.object.isRequired,
  versionConfig: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  grant: PropTypes.bool
}

export default ElectricCarForm
