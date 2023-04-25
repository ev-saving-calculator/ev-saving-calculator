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
import LoanForm from './LoanForm'


const Form = props => {
  const { versionConfig } = props
  return (
    <Formik
      initialValues={props.defaultValues}
      validationSchema={Yup.object({
        workingDays: Yup.number()
          .min(0, '')
          .max(7, 'Maximální počet dnů v týdnu je 7')
          .required('Required'),
        chargingItems: Yup.array().test(
          'sum-is-100',
          'Celkový podíl musí být 100%',
          value => value.length === 1 || value.reduce((sum, i) => sum + i.part, 0) === 100
        ),
        loan: Yup.object({
          electricCar: Yup.object().test({
            name: 'sum-is-1ll00',
            message: 'Celkový pll musí být 100%',
            exclusive: false,
            test: function (value) {
              console.log(value, this.parent)
            }
          })
        })
      })}
      onSubmit={values => {
        console.log('HELLO')
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
            <LoanForm versionConfig={versionConfig} values={values} errors={errors} />

          </Grid>
          <FormikAutoSave
            values={values}
            onSave={values => {
              props.onSubmit(values)
            }}
            debounceMs={400}
          />
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

export default React.memo(Form)
