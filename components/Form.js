import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import FormikAutoSave from './FormikAutosave'
import * as Yup from 'yup'
import FixFields from './FixFields'
import RangeForm from './RangeForm'
import BasicForm from './BasicForm'
import ElectricCarForm from './ElectricCarForm'
import CommonCarForm from './CommonCarForm'

const Form = props => {
  const { versionConfig } = props
  return (
    <Formik
      initialValues={{
        compareCarbonFootprint: true,
        company: false,
        //carId: null,
        carId: ['model_3', 't3_range_plus'],
        consumption: 7,
        distanceToWork: 50,
        workingDays: 5,
        vat: true,
        additionalRange: 30,
        distance: 35000,
        distanceType: 'static',
        serviceElectricCustom: [],
        serviceCommonCustom: [],
        co2Emission: 120,
        co2EmissionFuelTransport: '19',
        ...versionConfig.defaultValues,
        ...props.defaultValues
      }}
      validationSchema={Yup.object({
        workingDays: Yup.number()
          .min(0, '')
          .max(7, 'Maximální počet dnů v týdnu je 7')
          .required('Required'),
        chargingItems: Yup.array().test(
          'sum-is-100',
          'Celkový podíl musí být 100%',
          value => value.length === 1 || value.reduce((sum, i) => sum + i.part, 0) === 100
        )
      })}
      onSubmit={values => {
        props.onSubmit(values)
        return true
      }}
      validateOnChange>
      {({ values, handleSubmit, handleChange, handleBlur, setFieldValue, errors }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <BasicForm
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              renderRegionInfo={props.renderRegionInfo}
            />
            <RangeForm values={values} />
            <ElectricCarForm
              values={values}
              setFieldValue={setFieldValue}
              errors={errors}
              versionConfig={versionConfig}
            />
            <CommonCarForm versionConfig={versionConfig} values={values} errors={errors} />
          </Grid>
          <FormikAutoSave debounceMs={400} />
          <FixFields values={values} setFieldValue={setFieldValue} vat={versionConfig.vat} />
        </form>
      )}
    </Formik>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  versionConfig: PropTypes.object.isRequired,
  defaultValues: PropTypes.object.isRequired
}

export default Form
