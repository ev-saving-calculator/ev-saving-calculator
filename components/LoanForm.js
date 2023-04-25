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
import LoanFormItem from './LoanFormItem'
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

const CommonCarForm = props => {
  const classes = useStyles()
  const { values, versionConfig } = props
  const { pragueParking } = versionConfig
  return (
    <>
      <Grid item xs={12}>
        <Title>Úvěr</Title>

        <FormControlLabel
          control={<Field disabled={false} name="loan.active" color="primary" component={Checkbox} />}
          label="Počítat s úvěrem"
        />
        <FormControlLabel
          control={<Field disabled={false} name="loan.enterPayment" color="primary" component={Checkbox} />}
          label="Zadat měsíšní platbu"
        />
      </Grid>
      <LoanFormItem id="electricCar" label="Elektrický vůz" carPrice={1059900} values={values} versionConfig={versionConfig}/>
      <LoanFormItem id="commonCar" label="Spalovací vůz" carPrice={700000} values={values} versionConfig={versionConfig}/>

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
